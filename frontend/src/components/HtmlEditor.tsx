"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export function HtmlEditor({
  value,
  onChange,
  placeholder = "Write comprehensive course details, objectives, requirements, and outline...",
  minHeight = "360px",
  className = "",
}: HtmlEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  // Sync external value to visual editor when switching back or on initial mount
  useEffect(() => {
    if (editorRef.current && !isCodeView) {
      if (editorRef.current.innerHTML !== value) {
        // Only set if different to prevent cursor jumping
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, isCodeView]);

  const executeCommand = useCallback(
    (command: string, val: string | undefined = undefined) => {
      if (isCodeView) return;
      editorRef.current?.focus();
      document.execCommand(command, false, val);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    },
    [isCodeView, onChange]
  );

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      // If content is just empty breaks, normalize to empty string
      const cleanHtml = html === "<p><br></p>" || html === "<br>" ? "" : html;
      onChange(cleanHtml);
    }
  };

  const handleFormatBlock = (tag: string) => {
    executeCommand("formatBlock", `<${tag}>`);
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSavedSelection(sel.getRangeAt(0));
      setLinkText(sel.toString());
    } else {
      setSavedSelection(null);
      setLinkText("");
    }
  };

  const openLinkDialog = () => {
    saveSelection();
    setLinkUrl("");
    setShowLinkModal(true);
  };

  const applyLink = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLinkModal(false);
    if (!linkUrl.trim()) return;

    const normalizedUrl =
      linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
        ? linkUrl
        : `https://${linkUrl}`;

    editorRef.current?.focus();
    if (savedSelection) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelection);
      }
    }

    if (linkText && savedSelection && savedSelection.collapsed) {
      document.execCommand(
        "insertHTML",
        false,
        `<a href="${normalizedUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
      );
    } else {
      document.execCommand("createLink", false, normalizedUrl);
    }

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Word and character count calculation
  const getCounts = () => {
    const text = (value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const chars = text.length;
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    return { chars, words };
  };

  const { chars, words } = getCounts();

  return (
    <div
      className={`rounded-lg border border-line bg-surface shadow-xs transition-all focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600 ${className}`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-line bg-paper/80 px-3 py-2 text-ink">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Style Dropdown */}
          <select
            disabled={isCodeView}
            onChange={(e) => {
              if (e.target.value) handleFormatBlock(e.target.value);
            }}
            defaultValue="p"
            className="rounded border border-line bg-surface px-2 py-1 text-xs font-medium text-ink hover:border-brand-400 focus:outline-none disabled:opacity-40"
            title="Text style"
          >
            <option value="p">Normal text</option>
            <option value="h1">Heading 1 (Main title)</option>
            <option value="h2">Heading 2 (Section header)</option>
            <option value="h3">Heading 3 (Sub-section)</option>
          </select>

          <span className="mx-1 h-5 w-[1px] bg-line" />

          {/* Inline Format Buttons */}
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("bold")}
            className="flex h-7 w-7 items-center justify-center rounded font-serif font-bold text-ink hover:bg-line/60 disabled:opacity-40"
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("italic")}
            className="flex h-7 w-7 items-center justify-center rounded font-serif italic text-ink hover:bg-line/60 disabled:opacity-40"
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("underline")}
            className="flex h-7 w-7 items-center justify-center rounded underline text-ink hover:bg-line/60 disabled:opacity-40"
            title="Underline (Ctrl+U)"
          >
            U
          </button>
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("strikeThrough")}
            className="flex h-7 w-7 items-center justify-center rounded line-through text-ink hover:bg-line/60 disabled:opacity-40"
            title="Strikethrough"
          >
            S
          </button>

          <span className="mx-1 h-5 w-[1px] bg-line" />

          {/* List Buttons */}
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("insertUnorderedList")}
            className="flex h-7 items-center justify-center rounded px-2 text-xs font-medium text-ink hover:bg-line/60 disabled:opacity-40"
            title="Bulleted List"
          >
            <span className="mr-1 text-sm">•</span> List
          </button>
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("insertOrderedList")}
            className="flex h-7 items-center justify-center rounded px-2 text-xs font-medium text-ink hover:bg-line/60 disabled:opacity-40"
            title="Numbered List"
          >
            <span className="mr-1 text-xs">1.</span> List
          </button>

          <span className="mx-1 h-5 w-[1px] bg-line" />

          {/* Blockquote & Code */}
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => handleFormatBlock("blockquote")}
            className="flex h-7 items-center justify-center rounded px-2 text-xs font-medium text-ink hover:bg-line/60 disabled:opacity-40"
            title="Quote Block"
          >
            Quote
          </button>
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => handleFormatBlock("pre")}
            className="flex h-7 items-center justify-center rounded px-2 font-mono text-xs text-ink hover:bg-line/60 disabled:opacity-40"
            title="Code Block"
          >
            {"</>"}
          </button>

          <span className="mx-1 h-5 w-[1px] bg-line" />

          {/* Link */}
          <button
            type="button"
            disabled={isCodeView}
            onClick={openLinkDialog}
            className="flex h-7 items-center justify-center rounded px-2 text-xs font-medium text-brand-700 hover:bg-line/60 disabled:opacity-40"
            title="Insert Link"
          >
            🔗 Link
          </button>
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("unlink")}
            className="flex h-7 items-center justify-center rounded px-2 text-xs text-muted hover:bg-line/60 disabled:opacity-40"
            title="Remove Link"
          >
            Unlink
          </button>

          <span className="mx-1 h-5 w-[1px] bg-line" />

          {/* Undo / Redo */}
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("undo")}
            className="flex h-7 w-7 items-center justify-center rounded text-xs text-muted hover:bg-line/60 disabled:opacity-40"
            title="Undo"
          >
            ↺
          </button>
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("redo")}
            className="flex h-7 w-7 items-center justify-center rounded text-xs text-muted hover:bg-line/60 disabled:opacity-40"
            title="Redo"
          >
            ↻
          </button>
          <button
            type="button"
            disabled={isCodeView}
            onClick={() => executeCommand("removeFormat")}
            className="flex h-7 items-center justify-center rounded px-2 text-xs text-muted hover:bg-line/60 disabled:opacity-40"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded border border-line bg-surface p-0.5">
          <button
            type="button"
            onClick={() => setIsCodeView(false)}
            className={`rounded px-2.5 py-1 text-xs font-medium transition ${
              !isCodeView
                ? "bg-brand-600 text-white shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Visual Editor
          </button>
          <button
            type="button"
            onClick={() => setIsCodeView(true)}
            className={`rounded px-2.5 py-1 text-xs font-medium transition ${
              isCodeView
                ? "bg-brand-600 text-white shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            &lt;HTML Code&gt;
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative">
        {/* WYSIWYG Mode */}
        {!isCodeView ? (
          <div className="relative p-4">
            {(!value || value === "<p><br></p>" || value === "<br>") && (
              <div className="pointer-events-none absolute left-4 top-4 text-sm text-muted/60">
                {placeholder}
              </div>
            )}
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              style={{ minHeight }}
              className="prose-content max-w-none text-ink outline-none focus:outline-none [&_h1]:mb-3 [&_h1]:mt-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-ink [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_blockquote]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted [&_pre]:my-3 [&_pre]:rounded-md [&_pre]:bg-line/40 [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-sm [&_a]:text-brand-600 [&_a]:underline"
            />
          </div>
        ) : (
          /* HTML Code Mode */
          <div className="p-2">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              style={{ minHeight }}
              spellCheck={false}
              placeholder="<p>Write raw HTML code here...</p>"
              className="w-full resize-y rounded bg-ink/5 p-3 font-mono text-sm leading-relaxed text-ink focus:bg-white focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between border-t border-line bg-paper/50 px-4 py-2 text-xs text-muted">
        <div className="flex items-center gap-3">
          <span>{words} words</span>
          <span>•</span>
          <span>{chars} characters</span>
          {isCodeView && (
            <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-accent">
              HTML Code Mode Active
            </span>
          )}
        </div>
        <div className="text-[11px] text-muted/80">
          Supports rich styling, headings, lists, quotes, and links
        </div>
      </div>

      {/* Insert Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-md rounded-lg border border-line bg-surface p-5 shadow-xl">
            <h3 className="text-base font-semibold text-ink">Insert Link</h3>
            <form onSubmit={applyLink} className="mt-3 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink">
                  Link Text (optional if text is already selected)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Course syllabus PDF"
                  className="w-full rounded border border-line px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink">
                  URL <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded border border-line px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
                />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="rounded border border-line px-3 py-1.5 text-xs text-muted hover:bg-paper"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-brand-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-brand-700"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
