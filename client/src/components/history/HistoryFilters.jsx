import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const languageFilters = [
  "All Languages",
  "Java (18)",
  "C++ (9)",
  "Python (5)",
];

const difficultyFilters = [
  "All Difficulties",
  "Easy (12)",
  "Medium (9)",
  "Hard (3)",
];

const HistoryFilters = ({ history, setFilteredHistory }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("All Languages");
  const [activeDifficulty, setActiveDifficulty] =
    useState("All Difficulties");
  const [sortOrder, setSortOrder] = useState("Recent");

  const applyFilters = (
    search = searchQuery,
    language = activeLanguage,
    difficulty = activeDifficulty,
    sort = sortOrder
  ) => {
    let filtered = [...history];

    // Search
    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Language
    if (language !== "All Languages") {
      const lang = language.split(" ")[0];

      filtered = filtered.filter(
        (item) => item.language === lang
      );
    }

    // Difficulty
    if (difficulty !== "All Difficulties") {
      const level = difficulty.split(" ")[0];

      filtered = filtered.filter(
        (item) => item.difficulty === level
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sort === "Recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    setFilteredHistory(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    applyFilters(value, activeLanguage, activeDifficulty, sortOrder);
  };

  const handleLanguageFilter = (filter) => {
    setActiveLanguage(filter);

    applyFilters(searchQuery, filter, activeDifficulty, sortOrder);
  };

  const handleDifficultyFilter = (filter) => {
    setActiveDifficulty(filter);

    applyFilters(searchQuery, activeLanguage, filter, sortOrder);
  };

  const handleSort = () => {
    const newSort = sortOrder === "Recent" ? "Oldest" : "Recent";

    setSortOrder(newSort);

    applyFilters(
      searchQuery,
      activeLanguage,
      activeDifficulty,
      newSort
    );
  };

  return (
    <div className="flex items-center justify-between gap-6">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        {/* Languages */}
        <div className="flex rounded-xl border border-slate-200 bg-white p-1">
          {languageFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleLanguageFilter(filter)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeLanguage === filter
                  ? "bg-violet-100 text-violet-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div className="flex rounded-xl border border-slate-200 bg-white p-1">
          {difficultyFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleDifficultyFilter(filter)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeDifficulty === filter
                  ? "bg-violet-100 text-violet-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search problems..."
            className="w-56 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Sort */}
        <button
          onClick={handleSort}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Sort: {sortOrder}
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default HistoryFilters;