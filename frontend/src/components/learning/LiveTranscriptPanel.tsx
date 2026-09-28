"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import type { TranscriptSegment } from "@/lib/transcripts";

interface LiveTranscriptPanelProps {
  segments: TranscriptSegment[];
  currentTime: number;
  onSeek: (seconds: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function LiveTranscriptPanel({
  segments,
  currentTime,
  onSeek,
  isCollapsed,
  onToggleCollapse,
}: LiveTranscriptPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  // Format seconds to mm:ss
  function formatTime(sec: number) {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${s < 10 ? "0" : ""}${s}`;
  }

  // Find currently active segment
  const activeSegmentId = useMemo(() => {
    const found = segments.find(
      (s) => currentTime >= s.startSec && currentTime < s.endSec
    );
    return found ? found.id : null;
  }, [segments, currentTime]);

  // Auto-scroll to active segment
  useEffect(() => {
    if (!autoScrollEnabled || isCollapsed || !activeSegmentId) return;

    const el = segmentRefs.current[activeSegmentId];
    if (el && containerRef.current) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeSegmentId, autoScrollEnabled, isCollapsed]);

  // Filter segments based on search
  const filteredSegments = useMemo(() => {
    if (!searchQuery.trim()) return segments;
    const q = searchQuery.toLowerCase();
    return segments.filter(
      (s) => s.text.toLowerCase().includes(q) || s.title.toLowerCase().includes(q)
    );
  }, [segments, searchQuery]);

  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={onToggleCollapse}
        title="Show Transcript Panel"
        className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-brand-700 shadow-xs hover:bg-brand-50 transition"
      >
        <span>📑</span>
        <span>Show Transcript</span>
      </button>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-xs">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-line bg-paper/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-100 text-xs">
            📑
          </span>
          <h3 className="text-sm font-bold text-ink">Transcript</h3>
          <span className="rounded-full bg-brand-50 border border-brand-200/60 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
            Auto-Sync Live
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
            title={autoScrollEnabled ? "Auto-scroll is ON" : "Auto-scroll is OFF"}
            className={`rounded px-2 py-1 text-[11px] font-medium transition ${
              autoScrollEnabled
                ? "bg-brand-100/70 text-brand-700"
                : "text-muted hover:bg-slate-100"
            }`}
          >
            {autoScrollEnabled ? "Auto-scroll ON" : "Auto-scroll OFF"}
          </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            title="Hide Transcript Panel"
            className="rounded p-1 text-muted hover:bg-slate-200/60 hover:text-ink transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="border-b border-line/60 bg-surface px-3 py-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words in transcript..."
            className="w-full rounded-md border border-line/80 bg-paper/30 py-1.5 pl-8 pr-3 text-xs text-ink placeholder:text-muted focus:border-brand-400 focus:bg-surface focus:outline-none"
          />
          <svg
            className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1.5 text-xs text-muted hover:text-ink"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Transcript Segments List */}
      <div
        ref={containerRef}
        className="flex-1 space-y-3 overflow-y-auto p-3.5 scroll-smooth"
      >
        {filteredSegments.length === 0 ? (
          <p className="py-8 text-center text-xs text-muted">
            No matching phrases found for "{searchQuery}".
          </p>
        ) : (
          filteredSegments.map((segment) => {
            const isActive = segment.id === activeSegmentId;

            return (
              <div
                key={segment.id}
                ref={(el) => {
                  segmentRefs.current[segment.id] = el;
                }}
                className={`group relative rounded-xl border p-3.5 transition-all duration-200 ${
                  isActive
                    ? "border-brand-500 bg-brand-50/70 shadow-xs ring-1 ring-brand-400/30"
                    : "border-line/70 bg-surface hover:border-brand-300 hover:bg-slate-50/50"
                }`}
              >
                {/* Segment Header */}
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span
                    onClick={() => onSeek(segment.startSec)}
                    className={`text-xs font-bold truncate cursor-pointer transition ${
                      isActive ? "text-brand-700 font-semibold" : "text-ink group-hover:text-brand-700"
                    }`}
                  >
                    {segment.title}
                  </span>

                  <button
                    type="button"
                    onClick={() => onSeek(segment.startSec)}
                    title={`Jump to ${formatTime(segment.startSec)}`}
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-mono font-bold transition ${
                      isActive
                        ? "bg-brand-600 text-white"
                        : "bg-brand-100 text-brand-700 group-hover:bg-brand-200"
                    }`}
                  >
                    <span>▶</span>
                    <span>
                      {formatTime(segment.startSec)} - {formatTime(segment.endSec)}
                    </span>
                  </button>
                </div>

                {/* Words with Real-time Synchronized Highlight */}
                <p className="text-xs leading-relaxed sm:text-[13px]">
                  {segment.words.map((word, wIdx) => {
                    const isWordActive =
                      isActive &&
                      currentTime >= word.startSec &&
                      currentTime <= word.endSec;

                    return (
                      <span
                        key={wIdx}
                        onClick={() => onSeek(word.startSec)}
                        title={`Jump to ${word.startSec.toFixed(1)}s`}
                        className={`inline-block cursor-pointer rounded transition-colors duration-100 ${
                          isWordActive
                            ? "bg-amber-300 text-amber-950 font-bold px-1 scale-105 shadow-xs"
                            : isActive
                            ? "text-brand-900 hover:bg-brand-100/80 px-0.5"
                            : "text-muted hover:text-ink hover:bg-slate-100 px-0.5"
                        }`}
                      >
                        {word.text}{" "}
                      </span>
                    );
                  })}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Hide Toggle Button */}
      <div className="border-t border-line/60 bg-paper/40 p-2.5">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-line bg-surface py-1.5 text-xs font-medium text-muted hover:bg-slate-50 hover:text-ink transition"
        >
          <span>◨</span>
          <span>Hide Side Panel</span>
        </button>
      </div>
    </div>
  );
}
