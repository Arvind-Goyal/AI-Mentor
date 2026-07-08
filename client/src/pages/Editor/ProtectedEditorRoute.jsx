// components/ProtectedEditorRoute.jsx

import { Navigate } from "react-router-dom";
import { useAnalysis } from "../../context/AnalysisContext";

const ProtectedEditorRoute = ({ children }) => {
  const { analysisData } = useAnalysis();

  if (!analysisData.analysis) {
    return <Navigate to="/analyze" replace />;
  }

  return children;
};

export default ProtectedEditorRoute;