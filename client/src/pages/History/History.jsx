import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import HistoryHeader from "../../components/history/HistoryHeader";
import HistoryStats from "../../components/history/HistoryStats";
import HistoryFilters from "../../components/history/HistoryFilters";
import HistoryList from "../../components/history/HistoryList";
import EmptyHistory from "../../components/history/EmptyHistory";

import DashboardLayout from "../Dashboard/Dashboard";
import { useAuth } from "../../context/AuthContext";
import { useAnalysis } from "../../context/AnalysisContext";

const History = () => {
  const { user } = useAuth();
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
        if (!user?._id) return;

        const response = await axios.get(
          `http://localhost:5000/api/history/${user._id}`
        );

        setHistory(response.data);
        setFilteredHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, [user]);

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