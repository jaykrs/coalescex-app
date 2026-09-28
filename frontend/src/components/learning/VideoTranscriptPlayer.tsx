"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Course, Lesson } from "@/types";
import { getTranscriptForLesson } from "@/lib/transcripts";
import { LiveTranscriptPanel } from "./LiveTranscriptPanel";
import { CourseOutlineDrawer } from "./CourseOutlineDrawer";
import { CodePracticeCompiler } from "./CodePracticeCompiler";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

// Extract YouTube ID from any YouTube URL format (watch, embed, short)
export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

// Reliable sample video for mechanical/engineering concepts demo if contentUrl is empty
const SAMPLE_DEMO_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

interface VideoTranscriptPlayerProps {
  course: Course;
  activeLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  completedLessonIds: Set<string>;
  onToggleComplete: (lessonId: string, completed: boolean) => Promise<void>;
  onExit?: () => void;
}

export function VideoTranscriptPlayer({
  course,
  activeLesson,
  onSelectLesson,
  completedLessonIds,
  onToggleComplete,
  onExit,
}: VideoTranscriptPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytPlayerRef = useRef<any>(null);

  // Player state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(activeLesson.durationSec || 75);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isTranscriptCollapsed, setIsTranscriptCollapsed] = useState(false);
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);
  const hasAutoCompletedRef = useRef<string | null>(null);

  // Auto mark complete when video completes
  async function handleVideoAutoCompleted() {
    if (hasAutoCompletedRef.current === activeLesson.id) return;
    hasAutoCompletedRef.current = activeLesson.id;

    if (!completedLessonIds.has(activeLesson.id)) {
      try {
        await onToggleComplete(activeLesson.id, false);
      } catch (err) {
        console.error("Auto mark complete on video end error:", err);
      }
    }
  }

  // Detect if current lesson URL is a YouTube video
  const youtubeId = useMemo(() => {
    return getYouTubeVideoId(activeLesson.contentUrl);
  }, [activeLesson.contentUrl]);

  // Flattened all lessons in order
  const allLessons = useMemo(() => {
    return (course.sections ?? []).flatMap((s) => s.lessons);
  }, [course.sections]);

  const currentIndex = useMemo(() => {
    return allLessons.findIndex((l) => l.id === activeLesson.id);
  }, [allLessons, activeLesson.id]);

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;
  const isCompleted = completedLessonIds.has(activeLesson.id);

  // Transcript data for current lesson
  const transcriptSegments = useMemo(() => {
    return getTranscriptForLesson(
      activeLesson.id,
      activeLesson.title,
      activeLesson.durationSec,
      activeLesson.contentUrl
    );
  }, [activeLesson.id, activeLesson.title, activeLesson.durationSec, activeLesson.contentUrl]);

  // Direct video source for HTML5 video
  const videoSource = useMemo(() => {
    if (activeLesson.contentUrl && !youtubeId && activeLesson.contentUrl.startsWith("http")) {
      return activeLesson.contentUrl;
    }
    return SAMPLE_DEMO_VIDEO;
  }, [activeLesson.contentUrl, youtubeId]);

  // Reset player when active lesson changes
  useEffect(() => {
    hasAutoCompletedRef.current = null;
    setCurrentTime(0);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [activeLesson.id]);

  // Track browser fullscreen changes
  useEffect(() => {
    function handleFsChange() {
      setIsBrowserFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Toggle browser fullscreen
  function toggleBrowserFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // =========================================================================
  // YouTube IFrame API Initialization & Live Polling
  // =========================================================================
  useEffect(() => {
    if (!youtubeId) {
      ytPlayerRef.current = null;
      return;
    }

    let intervalId: any = null;
    let playerInstance: any = null;

    function createPlayer() {
      if (!window.YT || !window.YT.Player) return;

      const existingContainer = document.getElementById("yt-player-container");
      if (existingContainer) {
        existingContainer.innerHTML = '<div id="yt-player-target"></div>';
      }

      playerInstance = new window.YT.Player("yt-player-target", {
        videoId: youtubeId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          fs: 1,
        },
        events: {
          onReady: (e: any) => {
            ytPlayerRef.current = e.target;
            const dur = e.target.getDuration();
            if (dur && dur > 0) setDuration(dur);
          },
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              if (intervalId) clearInterval(intervalId);
              intervalId = setInterval(() => {
                if (ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
                  const t = ytPlayerRef.current.getCurrentTime();
                  setCurrentTime(t);
                  const dur = ytPlayerRef.current.getDuration ? ytPlayerRef.current.getDuration() : duration;
                  if (dur > 0 && t >= dur - 0.8) {
                    handleVideoAutoCompleted();
                  }
                }
              }, 250);
            } else if (e.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              if (intervalId) clearInterval(intervalId);
              handleVideoAutoCompleted();
            } else {
              setIsPlaying(false);
              if (intervalId) clearInterval(intervalId);
            }
          },
        },
      });
      ytPlayerRef.current = playerInstance;
    }

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (playerInstance && playerInstance.destroy) {
        try {
          playerInstance.destroy();
        } catch (e) {}
      }
    };
  }, [youtubeId]);

  // Video event handlers
  function togglePlay() {
    if (youtubeId && ytPlayerRef.current) {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
      return;
    }

    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }

  function handleSeek(seconds: number) {
    if (youtubeId && ytPlayerRef.current && ytPlayerRef.current.seekTo) {
      ytPlayerRef.current.seekTo(seconds, true);
      ytPlayerRef.current.playVideo();
      setCurrentTime(seconds);
      return;
    }

    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    setCurrentTime(seconds);
    if (!isPlaying) {
      videoRef.current.play();
    }
  }

  function handleRateChange(rate: number) {
    setPlaybackRate(rate);
    if (youtubeId && ytPlayerRef.current && ytPlayerRef.current.setPlaybackRate) {
      ytPlayerRef.current.setPlaybackRate(rate);
      return;
    }
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  }

  function handleVolumeChange(val: number) {
    setVolume(val);
    setIsMuted(val === 0);
    if (youtubeId && ytPlayerRef.current && ytPlayerRef.current.setVolume) {
      ytPlayerRef.current.setVolume(val * 100);
      return;
    }
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  }

  function toggleMute() {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (youtubeId && ytPlayerRef.current) {
      if (nextMute) ytPlayerRef.current.mute();
      else ytPlayerRef.current.unMute();
      return;
    }
    if (videoRef.current) {
      videoRef.current.muted = nextMute;
    }
  }

  // Handle "Got It! / Next Lesson" click
  async function handleGotIt() {
    setIsMarking(true);
    try {
      if (!isCompleted) {
        await onToggleComplete(activeLesson.id, false);
      }
      if (nextLesson) {
        if (nextLesson.contentType === "ASSESSMENT") {
          router.push(`/assessments/${nextLesson.id}`);
        } else {
          onSelectLesson(nextLesson);
        }
      }
    } finally {
      setIsMarking(false);
    }
  }

  // Handle Next button click in header
  async function handleNextClick() {
    if (!nextLesson) return;
    setIsMarking(true);
    try {
      if (!isCompleted) {
        await onToggleComplete(activeLesson.id, false);
      }
      if (nextLesson.contentType === "ASSESSMENT") {
        router.push(`/assessments/${nextLesson.id}`);
      } else {
        onSelectLesson(nextLesson);
      }
    } finally {
      setIsMarking(false);
    }
  }

  // Handle lesson navigation from Course Outline drawer
  async function handleSelectLessonFromOutline(targetLesson: Lesson) {
    setIsOutlineOpen(false);
    if (targetLesson.id !== activeLesson.id) {
      if (!isCompleted) {
        try {
          await onToggleComplete(activeLesson.id, false);
        } catch (err) {
          console.error("Error marking complete from outline navigation:", err);
        }
      }
    }
    if (targetLesson.contentType === "ASSESSMENT") {
      router.push(`/assessments/${targetLesson.id}`);
    } else {
      onSelectLesson(targetLesson);
    }
  }

  function formatTime(sec: number) {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${s < 10 ? "0" : ""}${s}`;
  }

  const completedCount = completedLessonIds.size;
  const progressPercent = allLessons.length
    ? Math.round((completedCount / allLessons.length) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-paper overflow-hidden select-none">
      {/* ================================================================= */}
      {/* 1. IMMERSIVE TOP NAVIGATION BAR (Full width, distraction-free)    */}
      {/* ================================================================= */}
      <header className="h-14 flex-shrink-0 flex items-center justify-between gap-3 border-b border-line bg-surface px-4 sm:px-6 shadow-xs">
        {/* Left: Exit button & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          {onExit ? (
            <button
              type="button"
              onClick={onExit}
              title="Exit learning mode to course outline"
              className="flex items-center gap-1.5 rounded-lg border border-line bg-paper/60 px-3 py-1.5 text-xs font-bold text-ink hover:bg-slate-100 hover:text-brand-700 transition shadow-xs cursor-pointer"
            >
              <span>←</span>
              <span className="hidden sm:inline">Exit</span>
            </button>
          ) : (
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-lg border border-line bg-paper/60 px-3 py-1.5 text-xs font-bold text-ink hover:bg-slate-100 hover:text-brand-700 transition shadow-xs"
            >
              <span>←</span>
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          <div className="flex items-center gap-1.5 text-xs sm:text-sm min-w-0">
            <span className="font-bold text-ink truncate max-w-[130px] sm:max-w-xs">
              {course.title}
            </span>
            <span className="text-muted">/</span>
            <span className="text-brand-700 font-medium truncate max-w-[160px] sm:max-w-sm">
              {activeLesson.title}
            </span>
          </div>
        </div>

        {/* Center: Prev / Course Outline / Next */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={!prevLesson}
            onClick={() => prevLesson && onSelectLesson(prevLesson)}
            title={prevLesson ? `Previous: ${prevLesson.title}` : "First lesson"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper/50 text-ink hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => setIsOutlineOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-brand-500/30 bg-brand-50/80 px-3.5 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-100 transition shadow-xs cursor-pointer"
          >
            <span>≡</span>
            <span className="hidden sm:inline">Course Outline</span>
          </button>

          <button
            type="button"
            disabled={!nextLesson || isMarking}
            onClick={handleNextClick}
            title={nextLesson ? `Next: ${nextLesson.title}` : "Last lesson"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper/50 text-ink hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          >
            →
          </button>
        </div>

        {/* Right: Progress & Fullscreen & Close */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              Course Progress
            </span>
            <span className="text-xs font-mono font-bold text-brand-700">
              {completedCount}/{allLessons.length} ({progressPercent}%)
            </span>
          </div>

          <div className="h-7 w-7 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center text-xs font-bold text-brand-700">
            {progressPercent}%
          </div>

          {/* Browser Fullscreen toggle */}
          <button
            type="button"
            onClick={toggleBrowserFullscreen}
            title={isBrowserFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper/50 text-ink hover:bg-slate-100 transition cursor-pointer"
          >
            {isBrowserFullscreen ? "🗗" : "⛶"}
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. MAIN LEARNING CANVAS (COMPILER IF PRACTICE, VIDEO OTHERWISE)   */}
      {/* ================================================================= */}
      {activeLesson.contentType === "PRACTICE" ? (
        <main className="flex-1 min-h-0 flex flex-col justify-between gap-3 p-3 sm:p-4 overflow-hidden">
          <div className="flex-1 min-h-0 w-full overflow-hidden">
            <CodePracticeCompiler
              initialCode={activeLesson.contentUrl}
              lessonTitle={activeLesson.title}
            />
          </div>

          {/* Compact Bottom Action Bar */}
          <footer className="flex-shrink-0 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-xs">
            <div className="min-w-0 flex items-center gap-2.5">
              <span className="rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-[10px] font-bold uppercase text-purple-700 flex-shrink-0">
                💻 Code Practice Playground
              </span>
              {isCompleted && (
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 flex-shrink-0">
                  ✓ Completed
                </span>
              )}
              <h2 className="text-xs sm:text-sm font-bold text-ink truncate max-w-xs sm:max-w-md">
                {activeLesson.title}
              </h2>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => onToggleComplete(activeLesson.id, isCompleted)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition border cursor-pointer ${
                  isCompleted
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                    : "border-line bg-surface text-ink hover:bg-slate-50"
                }`}
              >
                {isCompleted ? "✓ Completed" : "Mark Complete"}
              </button>

              <button
                type="button"
                onClick={handleGotIt}
                disabled={isMarking}
                className="flex items-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 py-2 px-5 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-600/20 transition cursor-pointer disabled:opacity-50"
              >
                <span>{nextLesson ? "Got It! Next →" : "Finish Lesson ✓"}</span>
              </button>
            </div>
          </footer>
        </main>
      ) : (
        <main className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden">
        {/* LEFT COLUMN: Live Transcript Panel (Full height scroll) */}
        <div
          className={`h-full min-h-0 flex flex-col transition-all duration-300 ${
            isTranscriptCollapsed
              ? "lg:col-span-1 justify-start"
              : "lg:col-span-5 xl:col-span-4"
          }`}
        >
          <LiveTranscriptPanel
            segments={transcriptSegments}
            currentTime={currentTime}
            onSeek={handleSeek}
            isCollapsed={isTranscriptCollapsed}
            onToggleCollapse={() => setIsTranscriptCollapsed(!isTranscriptCollapsed)}
          />
        </div>

        {/* RIGHT COLUMN: Video Player & Compact Bottom Bar */}
        <div
          className={`h-full min-h-0 flex flex-col justify-between gap-3 transition-all duration-300 ${
            isTranscriptCollapsed ? "lg:col-span-11" : "lg:col-span-7 xl:col-span-8"
          }`}
        >
          {/* Video Container (Fills available space in full screen) */}
          <div
            id="video-container"
            className="relative flex-1 min-h-0 w-full overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-2xl flex items-center justify-center group"
          >
            {youtubeId ? (
              /* YouTube IFrame Player */
              <div id="yt-player-container" className="h-full w-full">
                <div id="yt-player-target" className="h-full w-full" />
              </div>
            ) : (
              /* HTML5 Video Element */
              <>
                <video
                  ref={videoRef}
                  src={videoSource}
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={handleVideoAutoCompleted}
                  onTimeUpdate={(e) => {
                    const cur = e.currentTarget.currentTime;
                    const dur = e.currentTarget.duration;
                    setCurrentTime(cur);
                    if (dur > 0 && cur >= dur - 0.5) {
                      handleVideoAutoCompleted();
                    }
                  }}
                  onLoadedMetadata={(e) => {
                    if (e.currentTarget.duration) {
                      setDuration(e.currentTarget.duration);
                    }
                  }}
                  className="h-full w-full object-contain cursor-pointer"
                  playsInline
                />

                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-600/90 text-white shadow-2xl hover:scale-110 hover:bg-brand-500 transition-transform cursor-pointer"
                  >
                    <svg className="h-8 w-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                )}

                {/* Custom Control Bar for HTML5 Video */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 space-y-2 text-white">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none bg-slate-600/80 accent-brand-400 cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="p-1 hover:text-brand-300 transition"
                      >
                        {isPlaying ? (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button type="button" onClick={toggleMute} className="hover:text-brand-300">
                          {isMuted || volume === 0 ? "🔇" : "🔊"}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(Number(e.target.value))}
                          className="w-14 h-1 accent-white cursor-pointer"
                        />
                      </div>

                      <span className="font-mono text-[11px] text-slate-300">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={playbackRate}
                        onChange={(e) => handleRateChange(Number(e.target.value))}
                        className="rounded bg-slate-800/80 border border-slate-700 px-1.5 py-0.5 text-[11px] font-mono text-white focus:outline-none cursor-pointer"
                      >
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1.0x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2.0x</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Compact Bottom Action Bar */}
          <footer className="flex-shrink-0 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-xs">
            <div className="min-w-0 flex items-center gap-2.5">
              <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold uppercase text-brand-700 flex-shrink-0">
                🎥 Video Lecture
              </span>
              {youtubeId && (
                <span className="rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-bold text-red-600 flex-shrink-0">
                  YouTube
                </span>
              )}
              {isCompleted && (
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 flex-shrink-0">
                  ✓ Completed
                </span>
              )}
              <h2 className="text-xs sm:text-sm font-bold text-ink truncate max-w-xs sm:max-w-md">
                {activeLesson.title}
              </h2>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => onToggleComplete(activeLesson.id, isCompleted)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition border cursor-pointer ${
                  isCompleted
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                    : "border-line bg-surface text-ink hover:bg-slate-50"
                }`}
              >
                {isCompleted ? "✓ Completed" : "Mark Complete"}
              </button>

              <button
                type="button"
                onClick={handleGotIt}
                disabled={isMarking}
                className="flex items-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 py-2 px-5 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-600/20 transition cursor-pointer disabled:opacity-50"
              >
                <span>{nextLesson ? "Got It! Next →" : "Finish Lesson ✓"}</span>
              </button>
            </div>
          </footer>
        </div>
      </main>
      )}

      {/* Course Outline Drawer Modal */}
      <CourseOutlineDrawer
        isOpen={isOutlineOpen}
        onClose={() => setIsOutlineOpen(false)}
        sections={course.sections ?? []}
        activeLessonId={activeLesson.id}
        onSelectLesson={handleSelectLessonFromOutline}
        completedLessonIds={completedLessonIds}
        courseTitle={course.title}
        nextLesson={nextLesson}
        onNextLesson={handleNextClick}
      />
    </div>
  );
}
