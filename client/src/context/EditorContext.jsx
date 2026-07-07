import { createContext, useContext, useEffect, useState } from "react";
import { useAnalysis } from "./AnalysisContext";

const EditorContext = createContext();

// const javaTemplate;

// const cppTemplate;
  
// const pythonTemplate;
  
// const jsTemplate;
  
//   const templates = {
//     java: javaTemplate,
//     cpp: cppTemplate,
//     python: pythonTemplate,
//     javascript: jsTemplate,
//   };
  
  export const EditorProvider = ({ children }) => {
    const { analysisData} = useAnalysis();
    const [language, setLanguage] = useState("java");
    const [code, setCode] = useState();
    
    const [output, setOutput] = useState("");
    const [consoleOutput, setConsoleOutput] = useState("");
    
    const [review, setReview] = useState(null);
    
    const [running, setRunning] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);
    
    const [activeTab, setActiveTab] = useState("output"); 
    
    useEffect(() => {
  if (analysisData?.template) {
    setCode(analysisData.template[language]);
  }
}, [analysisData, language]);

    const resetCode = () => {
      if (analysisData?.template) return;
      // console.log(analysisData.template);
    setCode(analysisData.template[language]);
  };

    const changeLanguage = (lang) => {
       if (
    code !== analysisData.template?.[language] &&
    !window.confirm(
      "Changing the language will replace your current code. Continue?"
    )
        ) {
         return;
        }

    setLanguage(lang);
    setCode(analysisData.template[lang]);
  };
  

  const value = {
    language,
    setLanguage: changeLanguage,

    code,
    setCode,

    output,
    setOutput,

    consoleOutput,
    setConsoleOutput,

    review,
    setReview,

    running,
    setRunning,

    reviewLoading,
    setReviewLoading,
    
    activeTab,
    setActiveTab,
    
    resetCode,
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);