import { useContext } from "react"
import { AnalysisContext } from "../context/AnalysisContext"

export const useAnalysis = ()=>{
    return useContext(AnalysisContext);
};