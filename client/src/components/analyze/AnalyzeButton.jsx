import { dummyAnalysis } from "../../constants/learningJourney.js";
import { useAnalysis } from "../../context/AnalysisContext";
import analyzeProblem from "../../services/analyzeService.js";
import axios from 'axios';

const AnalyzeButton = () => {
  
  const { setAnalysisData,analysisData } = useAnalysis();
  const {
    problem,
    language,
    loading,
    setLoading,
    setAnalysis,
    setError
} = useAnalysis();
// console.log(language);
  const handleAnalyze = async()=>{
    if(!problem.trim()){
      alert("Please enter problem first. ")
      return ;
    }
    
    try {
      setLoading(true);
      // console.log("Analyzing",problem);
      const response = await axios.post("http://localhost:5000/api/analyze",{problem,language});
      await new Promise((resolve) => setTimeout(resolve, 2500));
     
      // const response = await  analyzeProblem(problem,language);
      setAnalysisData(response.data.data);
      setAnalysis(response.data.data);
      console.log("analu")
      console.log(analysisData);
    }catch(error){
      setError(error.message);
    } finally{
      setLoading(false);
    }
    // setTimeout(() => {

    //     console.log("Analysis Complete");

    //     setLoading(false);

    // }, 3000);


  }

  return (
    <button
    onClick={handleAnalyze}
      className="
        mt-6
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        via-purple-600
        to-indigo-600
        px-8
        py-6
        text-white
        shadow-lg
        transition
        duration-300
        hover:scale-[1.01]
        hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="text-left">

          <h2 className="text-xl font-semibold">
            {
            loading?"Analyzing......":"✨ Analyze Problem"}
          </h2>

          <p className="mt-1 text-sm text-violet-100">
           {loading
        ? "Please wait while AI is analyzing your problem..."
        : "AI will analyze your problem and generate your personalized learning roadmap."}
          </p>

        </div>

        {/* Right */}

        <div className="text-3xl">
          {loading ? "⏳" : "→"}
       </div>

      </div>
    </button>
  );
};

export default AnalyzeButton;