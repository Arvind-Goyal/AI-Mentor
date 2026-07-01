import { useAnalysis } from "../../context/AnalysisContext";

const MistakesCard = () => {

    const { analysis } = useAnalysis();

    if (!analysis) return null;

    const mistakes = analysis.mentor.mistakes;

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <h3 className="text-sm font-semibold text-slate-900">
                ⚠️ Common Mistakes
            </h3>

            <div className="mt-4 space-y-3">

                {mistakes.map((mistake, index) => (

                    <div
                        key={index}
                        className="flex items-start gap-3"
                    >

                        <div className="mt-1 h-2 w-2 rounded-full bg-red-500"></div>

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