import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { GripVertical, PanelLeftClose, PanelLeftOpen, RotateCcw } from "lucide-react";

const STORAGE_KEY = "dsa_editor_split_ratio";
const DEFAULT_WIDTH = 35; // Default percentage for problem panel (~4 of 12 cols)
const MIN_PERCENT = 20;   // Hard minimum percentage
const MAX_PERCENT = 75;   // Hard maximum percentage
const MIN_LEFT_PX = 260;  // Minimum pixels for problem panel
const MIN_RIGHT_PX = 360; // Minimum pixels for code editor

function subscribeLgScreen(callback) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getLgSnapshot() {
  return typeof window !== "undefined"
    ? window.matchMedia("(min-width: 1024px)").matches
    : true;
}

function getServerSnapshot() {
  return true;
}

const ResizableLayout = ({ leftPanel, rightPanel }) => {
  const containerRef = useRef(null);

  // Track responsive screen size (lg = 1024px)
  const isLgScreen = useSyncExternalStore(subscribeLgScreen, getLgSnapshot, getServerSnapshot);

  // Initialize split percentage from localStorage if present
  const [leftWidth, setLeftWidth] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseFloat(saved);
        if (!isNaN(parsed) && parsed >= MIN_PERCENT && parsed <= MAX_PERCENT) {
          return parsed;
        }
      }
    } catch {
      // In case localStorage is disabled
    }
    return DEFAULT_WIDTH;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate clamped percentage honoring both percentage and pixel constraints
  const clampWidth = useCallback((percent, containerWidth) => {
    let minAllowed = MIN_PERCENT;
    let maxAllowed = MAX_PERCENT;

    if (containerWidth > 0) {
      minAllowed = Math.max(MIN_PERCENT, (MIN_LEFT_PX / containerWidth) * 100);
      maxAllowed = Math.min(MAX_PERCENT, ((containerWidth - MIN_RIGHT_PX) / containerWidth) * 100);
      if (minAllowed > maxAllowed) {
        minAllowed = MIN_PERCENT;
        maxAllowed = MAX_PERCENT;
      }
    }

    const clamped = Math.min(Math.max(percent, minAllowed), maxAllowed);
    return Math.round(clamped * 10) / 10;
  }, []);

  // Update left panel width and optionally persist
  const updateWidth = useCallback(
    (newPercent, persist = false) => {
      const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;
      const clamped = clampWidth(newPercent, containerWidth);

      setLeftWidth(clamped);

      if (persist) {
        try {
          localStorage.setItem(STORAGE_KEY, clamped.toString());
        } catch (err) {
          console.warn("Could not save editor split ratio:", err);
        }
      }

      // Prompt Monaco Editor and other components to update their dimensions
      window.dispatchEvent(new Event("resize"));
    },
    [clampWidth]
  );

  // Reset to default 35%
  const handleReset = useCallback(() => {
    setIsCollapsed(false);
    updateWidth(DEFAULT_WIDTH, true);
  }, [updateWidth]);

  // Set preset
  const handlePreset = useCallback(
    (presetWidth) => {
      setIsCollapsed(false);
      updateWidth(presetWidth, true);
    },
    [updateWidth]
  );

  // Mouse drag handler
  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 0 || !isLgScreen) return;
      e.preventDefault();
      setIsDragging(true);

      const handleMouseMove = (moveEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width <= 0) return;

        const offsetPercent = ((moveEvent.clientX - rect.left) / rect.width) * 100;
        updateWidth(offsetPercent, false);
      };

      const handleMouseUp = (upEvent) => {
        setIsDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);

        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const offsetPercent = ((upEvent.clientX - rect.left) / rect.width) * 100;
          updateWidth(offsetPercent, true);
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [isLgScreen, updateWidth]
  );

  // Touch drag handler
  const handleTouchStart = useCallback(
    (e) => {
      if (!isLgScreen || e.touches.length !== 1) return;
      setIsDragging(true);

      const handleTouchMove = (moveEvent) => {
        if (!containerRef.current || moveEvent.touches.length !== 1) return;
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width <= 0) return;

        const offsetPercent = ((moveEvent.touches[0].clientX - rect.left) / rect.width) * 100;
        updateWidth(offsetPercent, false);
      };

      const handleTouchEnd = (endEvent) => {
        setIsDragging(false);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);

        if (containerRef.current && endEvent.changedTouches.length > 0) {
          const rect = containerRef.current.getBoundingClientRect();
          const offsetPercent = ((endEvent.changedTouches[0].clientX - rect.left) / rect.width) * 100;
          updateWidth(offsetPercent, true);
        }
      };

      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    },
    [isLgScreen, updateWidth]
  );

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isLgScreen) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      updateWidth(leftWidth - 2, true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      updateWidth(leftWidth + 2, true);
    } else if (e.key === "Home" || e.key.toLowerCase() === "r") {
      e.preventDefault();
      handleReset();
    }
  };

  // Cursor and user-select style management during drag
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  // Small screens (<1024px): Standard stacked column layout
  if (!isLgScreen) {
    return (
      <div className="flex flex-col gap-4 sm:gap-5 w-full">
        <div className="w-full">{leftPanel}</div>
        <div className="w-full">{rightPanel}</div>
      </div>
    );
  }

  // Desktop screens (>=1024px): Interactive resizable split layout
  return (
    <div
      ref={containerRef}
      className="flex flex-row items-stretch w-full relative"
    >
      {/* Fullscreen transparent drag shield to prevent Monaco / iframes from capturing mouse events */}
      {isDragging && (
        <div className="fixed inset-0 z-50 cursor-col-resize select-none bg-transparent" />
      )}

      {/* Left Panel: Problem Description */}
      {!isCollapsed && (
        <div
          className="min-w-0"
          style={{
            width: `calc(${leftWidth}% - 8px)`,
            transition: isDragging ? "none" : "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {leftPanel}
        </div>
      )}

      {/* Collapsed Left Panel Restorer */}
      {isCollapsed && (
        <div className="mr-3 flex flex-col justify-start pt-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            title="Expand Problem Panel"
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-600 rounded-xl border border-slate-200 hover:border-violet-300 shadow-sm transition text-xs font-semibold group cursor-pointer"
          >
            <PanelLeftOpen size={16} className="text-violet-600 group-hover:scale-110 transition-transform" />
            <span>Show Problem</span>
          </button>
        </div>
      )}

      {/* Resizable Divider (Draggable handle between panels) */}
      {!isCollapsed && (
        <div
          role="separator"
          tabIndex={0}
          aria-orientation="vertical"
          aria-valuenow={Math.round(leftWidth)}
          aria-valuemin={MIN_PERCENT}
          aria-valuemax={MAX_PERCENT}
          aria-label="Resize left problem panel and right editor"
          title="Drag to resize | Double-click to reset"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onDoubleClick={handleReset}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-4 shrink-0 relative flex items-center justify-center cursor-col-resize select-none focus:outline-none group z-10"
        >
          {/* Vertical visual divider line */}
          <div
            className={`w-1 h-[96%] rounded-full transition-colors duration-150 ${
              isDragging
                ? "bg-violet-600 shadow-sm shadow-violet-500/50"
                : isHovered
                ? "bg-violet-400"
                : "bg-slate-200 group-hover:bg-violet-300"
            }`}
          />

          {/* Centered Grab Handle Pill */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-1 rounded-full border shadow-sm transition-all duration-150 ${
              isDragging
                ? "bg-violet-600 border-violet-700 text-white scale-115 shadow-md ring-4 ring-violet-500/20"
                : isHovered
                ? "bg-white border-violet-300 text-violet-600 scale-105 shadow-md"
                : "bg-white border-slate-200 text-slate-400 group-hover:text-violet-600 group-hover:border-violet-200"
            }`}
          >
            <GripVertical size={14} className="pointer-events-none" />
          </div>

          {/* Floating Percent Badge displayed while actively dragging */}
          {isDragging && (
            <div className="absolute bottom-[calc(50%+24px)] left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold tracking-wide shadow-xl border border-slate-700/80 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-100">
              <span className="text-violet-300 font-bold">{Math.round(leftWidth)}%</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-200 font-bold">{Math.round(100 - leftWidth)}%</span>
            </div>
          )}

          {/* Hover Action Menu & Presets (visible on hover when not dragging) */}
          {isHovered && !isDragging && (
            <div className="absolute bottom-[calc(50%+22px)] left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-700 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 before:absolute before:top-full before:left-0 before:w-full before:h-5 before:content-['']">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapsed(true);
                }}
                title="Collapse Problem Panel"
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <PanelLeftClose size={14} />
              </button>

              <div className="h-3.5 w-px bg-slate-200 mx-0.5" />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreset(35);
                }}
                className={`px-2 py-0.5 rounded-lg text-[11px] transition cursor-pointer ${
                  Math.round(leftWidth) === 35
                    ? "bg-violet-100 text-violet-700 font-bold"
                    : "hover:bg-slate-100 text-slate-600 font-medium"
                }`}
                title="Default (35% Problem / 65% Editor)"
              >
                35%
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreset(50);
                }}
                className={`px-2 py-0.5 rounded-lg text-[11px] transition cursor-pointer ${
                  Math.round(leftWidth) === 50
                    ? "bg-violet-100 text-violet-700 font-bold"
                    : "hover:bg-slate-100 text-slate-600 font-medium"
                }`}
                title="Balanced (50% Problem / 50% Editor)"
              >
                50%
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreset(65);
                }}
                className={`px-2 py-0.5 rounded-lg text-[11px] transition cursor-pointer ${
                  Math.round(leftWidth) === 65
                    ? "bg-violet-100 text-violet-700 font-bold"
                    : "hover:bg-slate-100 text-slate-600 font-medium"
                }`}
                title="Wide Problem (65% Problem / 35% Editor)"
              >
                65%
              </button>

              <div className="h-3.5 w-px bg-slate-200 mx-0.5" />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                title="Reset to default (35%)"
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-violet-600 transition cursor-pointer"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Right Panel: Code Editor */}
      <div
        className="flex-1 min-w-0"
        style={{
          width: isCollapsed ? "100%" : `calc(${100 - leftWidth}% - 8px)`,
          transition: isDragging ? "none" : "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {rightPanel}
      </div>
    </div>
  );
};

export default ResizableLayout;
