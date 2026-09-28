"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

export type SupportedLanguage = "javascript" | "python" | "java";

interface LogMessage {
  id: string;
  type: "log" | "info" | "warn" | "error" | "system";
  content: string;
  timestamp: string;
}

export interface CodePracticeCompilerProps {
  initialCode?: string | null;
  lessonTitle: string;
  question?: string | null;
  onRunSuccess?: () => void;
}

export interface ParsedPracticeData {
  question: string;
  starterCode?: string;
}

export function parsePracticeContent(
  contentUrl?: string | null,
  lessonTitle?: string,
  explicitQuestion?: string | null
): ParsedPracticeData {
  if (explicitQuestion && explicitQuestion.trim()) {
    return {
      question: explicitQuestion.trim(),
      starterCode: undefined,
    };
  }

  if (!contentUrl || !contentUrl.trim()) {
    return {
      question: lessonTitle?.trim() || "Practice Question",
      starterCode: undefined,
    };
  }

  const trimmed = contentUrl.trim();

  // 1. JSON check (if saved with question & starterCode)
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        question: parsed.question?.trim() || lessonTitle?.trim() || "",
        starterCode: parsed.starterCode?.trim() || undefined,
      };
    } catch {
      // not JSON
    }
  }

  // 2. Otherwise, whatever string is stored is purely the question!
  return {
    question: trimmed,
    starterCode: undefined,
  };
}

function getInitialCodeTemplate(
  lang: SupportedLanguage,
  parsed: ParsedPracticeData
): string {
  if (parsed.starterCode && parsed.starterCode.trim()) {
    return parsed.starterCode.trim();
  }

  return DEFAULT_TEMPLATES[lang];
}

const DEFAULT_TEMPLATES: Record<SupportedLanguage, string> = {
  javascript: `// Online JavaScript Compiler (OneCompiler style)
// Write, Edit and Run your JavaScript code here

function calculateSum(a, b) {
    return a + b;
}

console.log("Welcome to JavaScript Practice!");
console.log("Sum of 10 and 25 is:", calculateSum(10, 25));

const fruits = ["Apple", "Banana", "Cherry"];
console.log("Fruits list:", fruits);

// Try your own code below:
`,
  python: `# Online Python Compiler (OneCompiler style)
# Write, Edit and Run your Python code here

def calculate_sum(a, b):
    return a + b

print("Welcome to Python Practice!")
print("Sum of 10 and 25 is:", calculate_sum(10, 25))

fruits = ["Apple", "Banana", "Cherry"]
for idx, fruit in enumerate(fruits, start=1):
    print(f"{idx}. {fruit}")
`,
  java: `// Online Java Compiler (OneCompiler style)
// Write, Edit and Run your Java code here

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Practice!");
        
        int a = 10;
        int b = 25;
        System.out.println("Sum of " + a + " and " + b + " is: " + (a + b));
        
        String[] fruits = {"Apple", "Banana", "Cherry"};
        for (int i = 0; i < fruits.length; i++) {
            System.out.println((i + 1) + ". " + fruits[i]);
        }
    }
}
`,
};

const FILE_NAMES: Record<SupportedLanguage, string> = {
  javascript: "main.js",
  python: "main.py",
  java: "Main.java",
};

export function CodePracticeCompiler({
  initialCode,
  lessonTitle,
  question,
  onRunSuccess,
}: CodePracticeCompilerProps) {
  const parsedPractice = useMemo(() => {
    return parsePracticeContent(initialCode, lessonTitle, question);
  }, [initialCode, lessonTitle, question]);

  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState<string>(() => {
    return getInitialCodeTemplate("javascript", parsedPractice);
  });

  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [layout, setLayout] = useState<"split" | "stacked">("split");
  const [fontSize, setFontSize] = useState<"text-xs" | "text-sm" | "text-base">("text-sm");
  const [copied, setCopied] = useState<boolean>(false);
  const [stdinInput, setStdinInput] = useState<string>("");
  const [showStdin, setShowStdin] = useState<boolean>(false);
  const [pyodideReady, setPyodideReady] = useState<boolean>(false);
  const [pyodideLoading, setPyodideLoading] = useState<boolean>(false);

  // Question panel and Console Output layout states
  const [consoleMode, setConsoleMode] = useState<"normal" | "expanded" | "collapsed">("normal");
  const [questionCopied, setQuestionCopied] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const pyodideInstanceRef = useRef<any>(null);
  const sandboxFrameRef = useRef<HTMLIFrameElement | null>(null);

  // Sync line numbers scroll with textarea
  function handleScroll() {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }

  // Handle Tab key and Auto-closing quotes/brackets
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Ctrl + Enter or Cmd + Enter to Run
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
      return;
    }

    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Handle Tab (insert 2 spaces)
    if (e.key === "Tab") {
      e.preventDefault();
      const updated = code.substring(0, start) + "  " + code.substring(end);
      setCode(updated);
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
      return;
    }

    // Auto-close brackets & quotes
    const pairs: Record<string, string> = {
      "(": ")",
      "[": "]",
      "{": "}",
      '"': '"',
      "'": "'",
      "`": "`",
    };

    if (pairs[e.key] && start === end) {
      const openChar = e.key;
      const closeChar = pairs[openChar];
      e.preventDefault();
      const updated = code.substring(0, start) + openChar + closeChar + code.substring(end);
      setCode(updated);
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      });
    }
  }

  // Handle language switch
  function handleLanguageChange(nextLang: SupportedLanguage) {
    if (nextLang === language) return;
    const currentDefault = getInitialCodeTemplate(language, parsedPractice);
    const nextDefault = getInitialCodeTemplate(nextLang, parsedPractice);

    setLanguage(nextLang);
    // If current code is the default template of the old language, update to new default
    if (code === currentDefault || code === DEFAULT_TEMPLATES[language]) {
      setCode(nextDefault);
    } else {
      const confirmReset = window.confirm(
        `Switch to ${nextLang.toUpperCase()}? Click OK to load the ${nextLang.toUpperCase()} starter template, or Cancel to keep your edits.`
      );
      if (confirmReset) {
        setCode(nextDefault);
      }
    }

    if (nextLang === "python" && !pyodideReady && !pyodideLoading) {
      loadPyodideRuntime();
    }
  }

  // Copy code to clipboard
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  // Copy question text to clipboard
  async function handleCopyQuestion() {
    try {
      await navigator.clipboard.writeText(parsedPractice.question);
      setQuestionCopied(true);
      setTimeout(() => setQuestionCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  // Reset code to default
  function handleReset() {
    if (window.confirm("Reset code to starter template? Unsaved changes will be discarded.")) {
      setCode(getInitialCodeTemplate(language, parsedPractice));
      setLogs([
        {
          id: String(Date.now()),
          type: "system",
          content: `Code reset to starter ${language.toUpperCase()} template.`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }

  // Clear output logs
  function handleClearLogs() {
    setLogs([]);
    setExecutionTime(null);
  }

  // Load Pyodide for Python execution in WebAssembly
  async function loadPyodideRuntime() {
    if (pyodideInstanceRef.current || (window as any).loadPyodide) {
      if (!pyodideInstanceRef.current && (window as any).loadPyodide) {
        try {
          setPyodideLoading(true);
          const pyodide = await (window as any).loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
          });
          pyodideInstanceRef.current = pyodide;
          setPyodideReady(true);
        } catch (e) {
          console.warn("Pyodide init error", e);
        } finally {
          setPyodideLoading(false);
        }
      }
      return;
    }

    setPyodideLoading(true);
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
    script.onload = async () => {
      try {
        const pyodide = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });
        pyodideInstanceRef.current = pyodide;
        setPyodideReady(true);
      } catch (err) {
        console.warn("Failed to initialize Pyodide:", err);
      } finally {
        setPyodideLoading(false);
      }
    };
    script.onerror = () => {
      setPyodideLoading(false);
    };
    document.body.appendChild(script);
  }

  // =========================================================================
  // RUN CODE CONTROLLER
  // =========================================================================
  async function runCode() {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    const startTime = performance.now();

    if (language === "javascript") {
      runJavaScript(startTime);
    } else if (language === "python") {
      await runPython(startTime);
    } else if (language === "java") {
      runJavaSimulated(startTime);
    }
  }

  // 1. Run JavaScript in a Sandboxed IFrame
  function runJavaScript(startTime: number) {
    try {
      // Remove any existing sandbox iframe
      if (sandboxFrameRef.current) {
        sandboxFrameRef.current.remove();
        sandboxFrameRef.current = null;
      }

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      // sandbox with allow-scripts but NO allow-same-origin for maximum security
      iframe.setAttribute("sandbox", "allow-scripts");
      document.body.appendChild(iframe);
      sandboxFrameRef.current = iframe;

      const newLogs: LogMessage[] = [];
      let isDone = false;

      function finish(status: "success" | "error") {
        if (isDone) return;
        isDone = true;
        const elapsed = Math.round(performance.now() - startTime);
        setExecutionTime(elapsed);
        setIsRunning(false);
        if (sandboxFrameRef.current) {
          sandboxFrameRef.current.remove();
          sandboxFrameRef.current = null;
        }
        if (status === "success" && onRunSuccess) {
          onRunSuccess();
        }
      }

      // Timeout guard for infinite loops (4 seconds)
      const timeoutId = setTimeout(() => {
        if (!isDone) {
          setLogs((prev) => [
            ...prev,
            {
              id: "timeout-" + Date.now(),
              type: "error",
              content: "⏱ Error: Execution timed out after 4 seconds (Infinite loop protection triggered).",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          finish("error");
        }
      }, 4000);

      // Listen for messages posted from sandbox iframe
      const messageHandler = (event: MessageEvent) => {
        if (!event.data || typeof event.data !== "object") return;
        if (event.data.__sandbox_compiler__) {
          const { type, content, isComplete, status } = event.data;
          if (content !== undefined) {
            setLogs((prev) => [
              ...prev,
              {
                id: Math.random().toString(36).substring(2, 9),
                type: type || "log",
                content: String(content),
                timestamp: new Date().toLocaleTimeString(),
              },
            ]);
          }
          if (isComplete) {
            clearTimeout(timeoutId);
            window.removeEventListener("message", messageHandler);
            finish(status || "success");
          }
        }
      };

      window.addEventListener("message", messageHandler);

      // Prepare iframe script injection
      const injectedHtml = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body>
          <script>
            (function() {
              function send(type, content, isComplete, status) {
                window.parent.postMessage({
                  __sandbox_compiler__: true,
                  type: type,
                  content: content,
                  isComplete: isComplete,
                  status: status
                }, '*');
              }

              function formatArg(arg) {
                if (arg === null) return 'null';
                if (arg === undefined) return 'undefined';
                if (typeof arg === 'function') return arg.toString();
                if (typeof arg === 'object') {
                  try {
                    return JSON.stringify(arg, null, 2);
                  } catch (e) {
                    return Object.prototype.toString.call(arg);
                  }
                }
                return String(arg);
              }

              console.log = function(...args) {
                send('log', args.map(formatArg).join(' '));
              };
              console.info = function(...args) {
                send('info', args.map(formatArg).join(' '));
              };
              console.warn = function(...args) {
                send('warn', args.map(formatArg).join(' '));
              };
              console.error = function(...args) {
                send('error', args.map(formatArg).join(' '));
              };

              window.onerror = function(message, source, lineno, colno, error) {
                var loc = lineno ? ' (Line ' + lineno + ')' : '';
                send('error', 'Runtime Error: ' + message + loc);
                send('system', '', true, 'error');
                return true;
              };

              window.onunhandledrejection = function(e) {
                send('error', 'Unhandled Promise Rejection: ' + (e.reason ? (e.reason.message || e.reason) : e));
                send('system', '', true, 'error');
              };

              try {
                var userCode = ${JSON.stringify(code)};
                var result = eval(userCode);
                if (result !== undefined && typeof result !== 'function') {
                  send('system', '=> Result: ' + formatArg(result));
                }
                setTimeout(function() {
                  send('system', '', true, 'success');
                }, 50);
              } catch (err) {
                send('error', err.name + ': ' + err.message);
                send('system', '', true, 'error');
              }
            })();
          <\/script>
        </body>
        </html>
      `;

      iframe.srcdoc = injectedHtml;
    } catch (err: any) {
      setLogs((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          type: "error",
          content: "Failed to initialize code runner: " + err.message,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setIsRunning(false);
    }
  }

  // 2. Run Python (WebAssembly via Pyodide or client-side fallback)
  async function runPython(startTime: number) {
    if (!pyodideInstanceRef.current && (window as any).loadPyodide) {
      try {
        setPyodideLoading(true);
        pyodideInstanceRef.current = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });
        setPyodideReady(true);
      } catch (err) {
        console.warn("Pyodide error", err);
      } finally {
        setPyodideLoading(false);
      }
    }

    if (pyodideInstanceRef.current) {
      const pyodide = pyodideInstanceRef.current;
      try {
        pyodide.setStdout({
          batched: (text: string) => {
            setLogs((prev) => [
              ...prev,
              {
                id: Math.random().toString(36).substring(2, 9),
                type: "log",
                content: text,
                timestamp: new Date().toLocaleTimeString(),
              },
            ]);
          },
        });

        pyodide.setStderr({
          batched: (text: string) => {
            setLogs((prev) => [
              ...prev,
              {
                id: Math.random().toString(36).substring(2, 9),
                type: "error",
                content: text,
                timestamp: new Date().toLocaleTimeString(),
              },
            ]);
          },
        });

        const result = await pyodide.runPythonAsync(code);
        if (result !== undefined) {
          setLogs((prev) => [
            ...prev,
            {
              id: "res-" + Date.now(),
              type: "system",
              content: `=> Result: ${String(result)}`,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }
        setExecutionTime(Math.round(performance.now() - startTime));
        if (onRunSuccess) onRunSuccess();
      } catch (err: any) {
        setLogs((prev) => [
          ...prev,
          {
            id: "err-" + Date.now(),
            type: "error",
            content: "Python Error: " + (err.message || String(err)),
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } finally {
        setIsRunning(false);
      }
      return;
    }

    // Fallback Python lightweight runner if Pyodide CDN is blocked / offline
    try {
      const lines = code.split("\n");
      const outputs: string[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("print(") && trimmed.endsWith(")")) {
          const inner = trimmed.substring(6, trimmed.length - 1);
          // Evaluate simple strings and numbers
          if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
            outputs.push(inner.substring(1, inner.length - 1));
          } else {
            try {
              // try evaluating arithmetic or variables
              const evaluated = new Function(`return (${inner})`)();
              outputs.push(String(evaluated));
            } catch {
              outputs.push(inner);
            }
          }
        }
      }

      if (outputs.length > 0) {
        outputs.forEach((out) => {
          setLogs((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              type: "log",
              content: out,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        });
      } else {
        setLogs((prev) => [
          ...prev,
          {
            id: "notice-" + Date.now(),
            type: "info",
            content: "Python runner note: To enable full WebAssembly Python 3.12 interpreter, please connect to internet to download Pyodide.",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
      setExecutionTime(Math.round(performance.now() - startTime));
      if (onRunSuccess) onRunSuccess();
    } catch (err: any) {
      setLogs((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          type: "error",
          content: "Python Simulation Error: " + err.message,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  }

  // 3. Run Java Simulated Runner
  function runJavaSimulated(startTime: number) {
    try {
      const lines = code.split("\n");
      const outputs: string[] = [];

      for (const rawLine of lines) {
        const line = rawLine.trim();
        // Match System.out.println(...)
        const match = line.match(/System\.out\.println\s*\((.*)\)\s*;?/);
        if (match) {
          const expr = match[1];
          try {
            // Convert Java string concatenation (e.g. "Sum: " + (a + b)) to JS evaluation
            const jsExpr = expr
              .replace(/\bString\b/g, "var")
              .replace(/\bint\b/g, "var")
              .replace(/\bdouble\b/g, "var");
            const result = new Function(`try { return (${jsExpr}); } catch(e) { return ${JSON.stringify(expr)}; }`)();
            outputs.push(String(result));
          } catch {
            outputs.push(expr.replace(/^["']|["']$/g, ""));
          }
        }
      }

      if (outputs.length > 0) {
        outputs.forEach((out) => {
          setLogs((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              type: "log",
              content: out,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        });
      } else {
        setLogs((prev) => [
          ...prev,
          {
            id: "java-info-" + Date.now(),
            type: "system",
            content: "Program executed with return code 0 (No System.out.println calls found).",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
      setExecutionTime(Math.round(performance.now() - startTime));
      if (onRunSuccess) onRunSuccess();
    } catch (err: any) {
      setLogs((prev) => [
        ...prev,
        {
          id: "java-err-" + Date.now(),
          type: "error",
          content: "Java compilation/runtime notice: " + err.message,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  }

  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex h-full w-full flex-col bg-[#181825] text-slate-200 select-none overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
      {/* =================================================================== */}
      {/* 1. TOP TOOLBAR & COMPILER CONTROLS (OneCompiler Style)              */}
      {/* =================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-[#1e1e2e] px-4 py-2.5">
        {/* Left: Language Selection & File Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg bg-[#11111b] p-0.5 border border-slate-800">
            {(["javascript", "python", "java"] as SupportedLanguage[]).map((lang) => {
              const isActive = language === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-brand-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span>
                    {lang === "javascript" && "🟨"}
                    {lang === "python" && "🐍"}
                    {lang === "java" && "☕"}
                  </span>
                  <span>{lang === "javascript" ? "JavaScript" : lang === "python" ? "Python 3" : "Java"}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-md bg-slate-900/60 px-2.5 py-1 text-xs font-mono text-slate-400 border border-slate-800">
            <span className="text-amber-400">📄</span>
            <span className="text-slate-300 font-bold">{FILE_NAMES[language]}</span>
          </div>

          {pyodideLoading && (
            <span className="text-[11px] text-amber-400 animate-pulse font-mono">
              ⚡ Loading Python Engine...
            </span>
          )}
        </div>

        {/* Right: Run Button & Action Controls */}
        <div className="flex items-center gap-2">
          {/* Layout Toggle */}
          <button
            type="button"
            onClick={() => setLayout(layout === "split" ? "stacked" : "split")}
            title="Toggle Split / Stacked Layout"
            className="hidden md:flex h-8 items-center gap-1 rounded-lg border border-slate-800 bg-[#11111b] px-2.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
          >
            <span>{layout === "split" ? "◫ Stack" : "▥ Split"}</span>
          </button>

          {/* Font Size Toggle */}
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value as any)}
            className="h-8 rounded-lg border border-slate-800 bg-[#11111b] px-2 text-xs font-mono text-slate-300 hover:bg-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="text-xs">12px</option>
            <option value="text-sm">14px</option>
            <option value="text-base">16px</option>
          </select>

          {/* Copy Code */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-800 bg-[#11111b] px-3 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
          >
            <span>{copied ? "✓ Copied!" : "📋 Copy"}</span>
          </button>

          {/* Reset Template */}
          <button
            type="button"
            onClick={handleReset}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-800 bg-[#11111b] px-3 text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 transition cursor-pointer"
          >
            <span>↺ Reset</span>
          </button>

          {/* PROMINENT RUN BUTTON (OneCompiler style green run) */}
          <button
            type="button"
            onClick={runCode}
            disabled={isRunning}
            className="flex h-8 items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-4 text-xs font-bold text-white shadow-md shadow-emerald-950/40 transition cursor-pointer"
          >
            {isRunning ? (
              <>
                <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Running...</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Run</span>
                <span className="hidden lg:inline text-[10px] opacity-75 font-mono">(Ctrl+Enter)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. SPLIT VIEW: EDITOR (LEFT / TOP) + CONSOLE OUTPUT (RIGHT / BOTTOM)*/}
      {/* =================================================================== */}
      <div
        className={`flex-1 min-h-0 flex ${
          layout === "split" ? "flex-col lg:flex-row" : "flex-col"
        } divide-y lg:divide-y-0 lg:divide-x divide-slate-800`}
      >
        {/* ================================================================= */}
        {/* LEFT / TOP PANE: CODE EDITOR                                      */}
        {/* ================================================================= */}
        <div className="flex-1 min-h-0 flex flex-col bg-[#1e1e2e]">
          {/* File Tab Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-[#181825] px-3 py-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-t-md bg-[#1e1e2e] px-3 py-1 font-mono font-medium text-slate-200 border-t-2 border-brand-500">
                <span className="text-amber-400">●</span> {FILE_NAMES[language]}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {lineCount} lines • {code.length} chars
            </span>
          </div>

          {/* Editor Core (Line Numbers + Textarea) */}
          <div className="relative flex-1 min-h-0 flex overflow-hidden font-mono">
            {/* Line numbers gutter */}
            <div
              ref={lineNumbersRef}
              className="w-12 flex-shrink-0 select-none overflow-hidden bg-[#181825] py-3 text-right pr-3 text-slate-600 border-r border-slate-800/80 leading-6"
            >
              {lineNumbers.map((num) => (
                <div key={num} className={`${fontSize} font-mono`}>
                  {num}
                </div>
              ))}
            </div>

            {/* Code Input Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className={`flex-1 resize-none bg-transparent p-3 text-slate-100 placeholder-slate-600 focus:outline-none leading-6 ${fontSize} font-mono selection:bg-brand-600/40`}
              placeholder="// Write your code here..."
            />
          </div>

          {/* Bottom Bar for Editor */}
          <div className="flex items-center justify-between border-t border-slate-800/80 bg-[#181825] px-3 py-1 text-[11px] text-slate-500 font-mono">
            <span>Spaces: 2 • UTF-8</span>
            <span>Client-side Execution (Zero Server Delay)</span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT / BOTTOM PANE: QUESTION + CONSOLE OUTPUT (ALWAYS VISIBLE)   */}
        {/* ================================================================= */}
        <div
          className={`${
            layout === "split" ? "w-full lg:w-[45%] xl:w-[42%]" : "h-[500px]"
          } min-h-0 flex flex-col bg-[#11111b] divide-y divide-slate-800`}
        >
          {/* =============================================================== */}
          {/* 1. TOP: QUESTION / PROBLEM STATEMENT (ALWAYS VISIBLE)             */}
          {/* =============================================================== */}
          <div className="flex-1 min-h-[140px] flex flex-col bg-[#161622] overflow-hidden">
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-[#181825] px-3.5 py-2 flex-shrink-0">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200">
                <span className="text-amber-400">📝</span>
                Question
              </span>

              <button
                type="button"
                onClick={handleCopyQuestion}
                title="Copy question text"
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800/60 transition cursor-pointer"
              >
                <span>{questionCopied ? "✓ Copied" : "📋 Copy"}</span>
              </button>
            </div>

            {/* Question Content Body - ONLY the instructor's dynamic question, nothing extra */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 select-text">
              <div className="text-xs sm:text-sm font-normal text-slate-200 leading-relaxed whitespace-pre-wrap">
                {parsedPractice.question}
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 2. CONSOLE OUTPUT (THODA CHHOTA / COMPACT & EXPANDABLE)         */}
          {/* =============================================================== */}
          <div
            className={`${
              consoleMode === "collapsed"
                ? "h-9 flex-shrink-0"
                : consoleMode === "expanded"
                ? "h-[65%] min-h-[220px] flex-shrink-0"
                : "h-[38%] min-h-[145px] max-h-[46%] flex-shrink-0"
            } flex flex-col bg-[#11111b] transition-all duration-200`}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-[#181825] px-3 py-1.5 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Console Output
                </span>

                {executionTime !== null && (
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                    {executionTime} ms
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {/* Console Size Control Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    if (consoleMode === "collapsed") setConsoleMode("normal");
                    else if (consoleMode === "normal") setConsoleMode("expanded");
                    else setConsoleMode("normal");
                  }}
                  title={consoleMode === "expanded" ? "Restore normal size" : "Expand console height"}
                  className="text-[11px] font-mono text-slate-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-slate-800/60 transition cursor-pointer"
                >
                  {consoleMode === "expanded" ? "▼ Normal" : "▲ Expand"}
                </button>

                <button
                  type="button"
                  onClick={() => setConsoleMode(consoleMode === "collapsed" ? "normal" : "collapsed")}
                  title={consoleMode === "collapsed" ? "Open console" : "Minimize console"}
                  className="text-[11px] font-mono text-slate-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-slate-800/60 transition cursor-pointer"
                >
                  {consoleMode === "collapsed" ? "▲ Open" : "− Min"}
                </button>

                <span className="text-slate-700">|</span>

                <button
                  type="button"
                  onClick={() => setShowStdin(!showStdin)}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded transition cursor-pointer ${
                    showStdin
                      ? "bg-brand-600 text-white"
                      : "text-slate-400 hover:text-white bg-slate-800/60"
                  }`}
                >
                  STDIN
                </button>

                <button
                  type="button"
                  onClick={handleClearLogs}
                  title="Clear console output"
                  className="text-[11px] font-mono text-slate-400 hover:text-rose-400 px-1.5 py-0.5 rounded hover:bg-slate-800/60 transition cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {consoleMode !== "collapsed" && (
              <>
                {/* Optional STDIN Drawer */}
                {showStdin && (
                  <div className="border-b border-slate-800 bg-[#1e1e2e]/50 p-2 flex-shrink-0">
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Standard Input (STDIN)
                    </label>
                    <textarea
                      value={stdinInput}
                      onChange={(e) => setStdinInput(e.target.value)}
                      placeholder="Enter input values here..."
                      rows={2}
                      className="w-full resize-none rounded border border-slate-800 bg-[#11111b] p-2 text-xs font-mono text-slate-200 focus:border-brand-600 focus:outline-none"
                    />
                  </div>
                )}

                {/* Terminal Body */}
                <div className="flex-1 min-h-0 overflow-y-auto p-3 font-mono text-xs space-y-1.5 select-text">
                  {logs.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center p-3 text-slate-500">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <span className="text-slate-600 font-bold">&gt;_</span>
                        <span>Console is idle</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Click <span className="text-emerald-400 font-semibold">Run</span> or press{" "}
                        <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">
                          Ctrl + Enter
                        </kbd>{" "}
                        to execute.
                      </p>
                    </div>
                  ) : (
                    logs.map((log) => {
                      let badgeColor = "text-slate-400";
                      let textColor = "text-slate-200";
                      let prefix = "";

                      if (log.type === "warn") {
                        badgeColor = "text-amber-400";
                        textColor = "text-amber-200";
                        prefix = "[WARN] ";
                      } else if (log.type === "error") {
                        badgeColor = "text-rose-400";
                        textColor = "text-rose-300";
                        prefix = "✕ ";
                      } else if (log.type === "system") {
                        badgeColor = "text-brand-400";
                        textColor = "text-brand-300 font-semibold";
                      }

                      return (
                        <div
                          key={log.id}
                          className={`leading-relaxed whitespace-pre-wrap break-words ${textColor}`}
                        >
                          {prefix && <span className={`font-bold ${badgeColor}`}>{prefix}</span>}
                          {log.content}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Terminal Footer status */}
                <div className="flex items-center justify-between border-t border-slate-800 bg-[#181825] px-3 py-1 text-[11px] text-slate-500 font-mono flex-shrink-0">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isRunning
                          ? "bg-amber-400 animate-ping"
                          : logs.some((l) => l.type === "error")
                          ? "bg-rose-500"
                          : "bg-emerald-500"
                      }`}
                    />
                    {isRunning
                      ? "Executing code..."
                      : logs.some((l) => l.type === "error")
                      ? "Execution finished with errors"
                      : logs.length > 0
                      ? "Execution successful"
                      : "Ready"}
                  </span>

                  <span>Sandbox Mode</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
