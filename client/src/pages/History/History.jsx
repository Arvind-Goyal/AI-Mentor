import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HistoryHeader from "../../components/history/HistoryHeader";
import HistoryStats from "../../components/history/HistoryStats";
import HistoryFilters from "../../components/history/HistoryFilters";
import HistoryList from "../../components/history/HistoryList";
import EmptyHistory from "../../components/history/EmptyHistory";

import DashboardLayout from "../DashboardLayout/Dashboard";
import { useAnalysis } from "../../context/AnalysisContext";
import { getHistory } from "../../api/history";
import { getCachedData } from "../../lib/cache";

const History = () => {
  const navigate = useNavigate();

  const {
    setProblem,
    setLanguage,
    setAnalysisData,
    setHistoryId,
  } = useAnalysis();

  const cachedHistory = getCachedData("user_history", 5 * 60 * 1000) || [];
  const [history, setHistory] = useState(cachedHistory);
  const [filteredHistory, setFilteredHistory] = useState(cachedHistory);
  const [loading, setLoading] = useState(cachedHistory.length === 0);

  useEffect(() => {
    let isMounted = true;
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        if (isMounted) {
          const list = Array.isArray(data) ? data : [];
          setHistory(list);
          setFilteredHistory(list);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHistory();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleContinue = (session) => {
    setProblem(session.title);
    setLanguage(session.language);
    setAnalysisData(session.analysis);
    setHistoryId(session._id);

    navigate("/editor");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <HistoryHeader />

        <HistoryStats history={history} />

        <HistoryFilters
          history={history}
          setFilteredHistory={setFilteredHistory}
        />

        {loading && history.length === 0 ? (
          <div className="flex justify-center items-center py-16">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-3 border-violet-600 border-t-transparent" />
          </div>
        ) : filteredHistory.length > 0 ? (
          <HistoryList
            history={filteredHistory}
            onContinue={handleContinue}
          />
        ) : (
          <EmptyHistory />
        )}
      </div>
    </DashboardLayout>
  );
};

export default History;