import { Search, ChevronDown, ArrowUpDown, Check, X, RotateCcw } from "lucide-react";
import { useState, useMemo } from "react";

const HistoryFilters = ({ history = [], setFilteredHistory }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("ALL");
  const [activeDifficulty, setActiveDifficulty] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("Recent");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { id: "Recent", label: "Most Recent" },
    { id: "Oldest", label: "Oldest First" },
    { id: "Most Analyzed", label: "Most Analyzed" },
    { id: "Title (A-Z)", label: "Title (A-Z)" },
  ];

  // Dynamically calculate language counts
  const languageOptions = useMemo(() => {
    const javaCount = history.filter(
      (item) => (item.language || "").toLowerCase() === "java"
    ).length;
    const cppCount = history.filter((item) => {
      const l = (item.language || "").toLowerCase();
      return l === "c++" || l === "cpp";
    }).length;
    const pythonCount = history.filter(
      (item) => (item.language || "").toLowerCase() === "python"
    ).length;
    const jsCount = history.filter((item) => {
      const l = (item.language || "").toLowerCase();
      return l === "javascript" || l === "js";
    }).length;

    const list = [
      { id: "ALL", label: `All (${history.length})` },
      { id: "Java", label: `Java (${javaCount})` },
      { id: "C++", label: `C++ (${cppCount})` },
      { id: "Python", label: `Python (${pythonCount})` },
    ];

    if (jsCount > 0) {
      list.push({ id: "JavaScript", label: `JavaScript (${jsCount})` });
    }

    return list;
  }, [history]);

  // Dynamically calculate difficulty counts with indicator dots
  const difficultyOptions = useMemo(() => {
    const easyCount = history.filter((item) => {
      const d = (item.difficulty || item.analysis?.analysis?.difficulty || "").toLowerCase();
      return d === "easy";
    }).length;
    const mediumCount = history.filter((item) => {
      const d = (item.difficulty || item.analysis?.analysis?.difficulty || "").toLowerCase();
      return d === "medium";
    }).length;
    const hardCount = history.filter((item) => {
      const d = (item.difficulty || item.analysis?.analysis?.difficulty || "").toLowerCase();
      return d === "hard";
    }).length;

    return [
      { id: "ALL", label: `All (${history.length})`, dot: null },
      { id: "Easy", label: `Easy (${easyCount})`, dot: "bg-emerald-500" },
      { id: "Medium", label: `Medium (${mediumCount})`, dot: "bg-amber-500" },
      { id: "Hard", label: `Hard (${hardCount})`, dot: "bg-rose-500" },
    ];
  }, [history]);

  const applyFilters = (
    search = searchQuery,
    language = activeLanguage,
    difficulty = activeDifficulty,
    sort = sortOrder
  ) => {
    let filtered = [...history];

    // Search filter
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((item) => {
        const title = (item.title || item.analysis?.problemTitle || "").toLowerCase();
        return title.includes(q);
      });
    }

    // Language filter
    if (language !== "ALL") {
      filtered = filtered.filter((item) => {
        const l = (item.language || "").toLowerCase();
        const target = language.toLowerCase();
        if (target === "c++") return l === "c++" || l === "cpp";
        return l === target;
      });
    }

    // Difficulty filter
    if (difficulty !== "ALL") {
      filtered = filtered.filter((item) => {
        const d = (item.difficulty || item.analysis?.analysis?.difficulty || "").toLowerCase();
        return d === difficulty.toLowerCase();
      });
    }

    // Sort order
    filtered.sort((a, b) => {
      if (sort === "Most Analyzed") {
        return (b.analysisCount || 1) - (a.analysisCount || 1);
      }
      if (sort === "Title (A-Z)") {
        const titleA = (a.title || a.analysis?.problemTitle || "").toLowerCase();
        const titleB = (b.title || b.analysis?.problemTitle || "").toLowerCase();
        return titleA.localeCompare(titleB);
      }
      const dateA = new Date(a.lastAnalyzedAt || a.updatedAt || a.createdAt || 0);
      const dateB = new Date(b.lastAnalyzedAt || b.updatedAt || b.createdAt || 0);
      if (sort === "Recent") {
        return dateB - dateA;
      }
      return dateA - dateB;
    });

    setFilteredHistory(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    applyFilters(value, activeLanguage, activeDifficulty, sortOrder);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    applyFilters("", activeLanguage, activeDifficulty, sortOrder);
  };

  const handleLanguageFilter = (langId) => {
    setActiveLanguage(langId);
    applyFilters(searchQuery, langId, activeDifficulty, sortOrder);
  };

  const handleDifficultyFilter = (diffId) => {
    setActiveDifficulty(diffId);
    applyFilters(searchQuery, activeLanguage, diffId, sortOrder);
  };

  const handleSelectSort = (sortId) => {
    setSortOrder(sortId);
    setIsSortOpen(false);
    applyFilters(searchQuery, activeLanguage, activeDifficulty, sortId);
  };

  const handleResetAll = () => {
    setSearchQuery("");
    setActiveLanguage("ALL");
    setActiveDifficulty("ALL");
    setSortOrder("Recent");
    setIsSortOpen(false);
    applyFilters("", "ALL", "ALL", "Recent");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    activeLanguage !== "ALL" ||
    activeDifficulty !== "ALL" ||
    sortOrder !== "Recent";

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-4 w-full">
      {/* 1. Language */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <label className="text-xs font-semibold text-slate-700">
          Language
        </label>
        <div className="flex h-10 items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {languageOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleLanguageFilter(opt.id)}
              className={`h-8 rounded-lg px-3 text-xs font-semibold transition ${
                activeLanguage === opt.id
                  ? "bg-violet-100 text-violet-700 shadow-sm border border-violet-200/60"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Difficulty */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <label className="text-xs font-semibold text-slate-700">
          Difficulty
        </label>
        <div className="flex h-10 items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {difficultyOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleDifficultyFilter(opt.id)}
              className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition ${
                activeDifficulty === opt.id
                  ? "bg-violet-100 text-violet-700 shadow-sm border border-violet-200/60"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
              }`}
            >
              {opt.dot && (
                <span className={`h-1.5 w-1.5 rounded-full ${opt.dot} shrink-0`} />
              )}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Search Problem */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
        <label className="text-xs font-semibold text-slate-700">
          Search Problem
        </label>
        <div className="relative flex h-10 items-center rounded-xl border border-slate-200 bg-white px-3.5 shadow-sm transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
          <Search size={15} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search problem title..."
            className="w-full bg-transparent pl-2.5 pr-6 text-xs text-slate-800 outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-2.5 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              title="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* 4. Sort By */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            Sort By
          </label>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600 hover:text-rose-700 transition"
              title="Reset all filters and search"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="inline-flex h-10 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 active:scale-95 min-w-[145px]"
          >
            <span className="flex items-center gap-1.5 text-slate-500">
              <ArrowUpDown size={13} />
              <span>Sort:</span>
            </span>
            <span className="font-semibold text-slate-800">
              {sortOptions.find((o) => o.id === sortOrder)?.label || sortOrder}
            </span>
            <ChevronDown
              size={13}
              className={`text-slate-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isSortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsSortOpen(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-1.5 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl shadow-slate-200/50">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectSort(opt.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                      sortOrder === opt.id
                        ? "bg-violet-50 font-semibold text-violet-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortOrder === opt.id && (
                      <Check size={13} className="text-violet-600" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryFilters;