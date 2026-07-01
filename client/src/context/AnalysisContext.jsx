import { createContext, useContext, useState } from "react";

const AnalysisContext = createContext();
export const AnalysisProvider=({children})=>{
    // user Input
    const [problem,setProblem] = useState("");
    const [language,setLanguage] = useState("Java");

    //UI State
    const [loading,setLoading] = useState(false);
    const [currentStep,setCurrentStep] = useState(1);

    
    //Error
    const[error,setError] = useState(null);
    // AI response
    const[analysis,setAnalysis] = useState(null);

    const [analysisData, setAnalysisData] = useState({
    analysis: null,
    hint1: null,
    hint2: null,
    algorithm: null,
    pseudocode: null,
    review: null,
    optimized: null,
});



    // Reset Everything

    const resetAnalysis = ()=>{
        setProblem("");
        setLanguage("Java");

        setLoading(false);
        setCurrentStep(1);
        setAnalysisData(null)
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

                analysisData,
                setAnalysisData,


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