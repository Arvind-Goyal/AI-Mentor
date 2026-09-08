import { Navigate, useLocation } from "react-router-dom";
import { useAnalysis } from "../../context/AnalysisContext";

const ProtectedEditorRoute = ({ children }) => {
    const { analysisData } = useAnalysis();
    const location = useLocation();

    if (!analysisData?.analysis) {
        return (
            <Navigate
                to="/analyze"
                replace
                state={{
                    message: "Analyze a problem before opening the editor.",
                    from: location.pathname,
                }}
            />
        );
    }

    return children;
};

export default ProtectedEditorRoute;