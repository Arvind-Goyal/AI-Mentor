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

const History = () => {
  const navigate = useNavigate();

  const {
    setProblem,
    setLanguage,
    setAnalysisData,
    setHistoryId,
  } = useAnalysis();

  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();

        setHistory(data);
        setFilteredHistory(data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
        console.error(
          "Response:",
          error.response?.data
        );
      }
    };

    fetchHistory();
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
      <div className="flex flex-col gap-8 p-8">
        <HistoryHeader />

        <HistoryStats history={history} />

        <HistoryFilters
          history={history}
          setFilteredHistory={setFilteredHistory}
        />

        {filteredHistory.length > 0 ? (
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