import { useAnalysis } from "../../context/AnalysisContext";
import { AiFillWarning } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";

const MistakesCard = () => {
  const { analysisData } = useAnalysis();
    
  if (!analysisData.analysis) return null;

  const mistakes = analysisData.mentor.mistakes;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
            <AiFillWarning className="text-amber-500 text-lg" />
            <h3 className="text-sm font-semibold text-slate-900">
                Common Mistakes
            </h3>
            </div>

      <div className="mt-4 space-y-3">
        {mistakes.map((mistake, index) => (
          <div
            key={index}
            className="flex items-start gap-2"
          >
           <GoDotFill className="text-red-500 text-xl" style={{ color: 'red', fontSize: '16px' }} />
            <p className="text-sm text-slate-600 leading-6">
              {mistake}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MistakesCard;