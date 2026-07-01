import { createContext, useContext, useState } from "react";

const AnalysisContext = createContext();
export const AnalysisProvider=({children})=>{
    // user Input
    const [problem,setProblem] = useState("");
    const [language,setLanguage] = useState("Java");

    //UI State
    const [loading,setLoading] = useState(false);
    const [currentStep,setCurrentStep] = useState(1);

    // AI response
    const[analysis,setAnalysis] = useState(null);

    //Error
    const[error,setError] = useState(null);

    // Reset Everything

    const resetAnalysis = ()=>{
        setProblem("");
        setLanguage("Java");

        setLoading(false);
        setCurrentStep(1);

        setAnalysis(null);
        setError(null);
    }
     return (

        <AnalysisContext.Provider
            value={{

                problem,
                setProblem,

                language,
                setLanguage,

                loading,
                setLoading,

                currentStep,
                setCurrentStep,

                analysis,
                setAnalysis,

                error,
                setError,

                resetAnalysis,

            }}
        >

            {children}

        </AnalysisContext.Provider>

    );

};

export const useAnalysis = () => useContext(AnalysisContext);