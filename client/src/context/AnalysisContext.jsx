import { createContext, useState } from "react";

export const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {

    const [question, setQuestion] = useState("");

    const [language, setLanguage] = useState("Python 3");

    const [difficultyMode, setDifficultyMode] = useState("Auto Detect");

    const [loading, setLoading] = useState(false);

    const [analysis, setAnalysis] = useState(null);

    const [userCode, setUserCode] = useState("");

    const [currentStep, setCurrentStep] = useState(0);

    const value = {
        question,
        setQuestion,

        language,
        setLanguage,

        difficultyMode,
        setDifficultyMode,

        loading,
        setLoading,

        analysis,
        setAnalysis,

        userCode,
        setUserCode,

        currentStep,
        setCurrentStep
    };

    return (
        <AnalysisContext.Provider value={value}>
            {children}
        </AnalysisContext.Provider>
    );
};