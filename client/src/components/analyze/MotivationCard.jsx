import { useAnalysis } from "../../context/AnalysisContext";
import { FaLightbulb } from "react-icons/fa";

const MotivationCard = () => {

    const { analysis } = useAnalysis();

    if (!analysis) return null;

    const advice = analysis.mentor.advice;

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            {/* Header */}

            <div className="flex items-center gap-2">

                <FaLightbulb className="text-yellow-500" />

                <h3 className="text-sm font-semibold text-slate-900">
                    Mentor Advice
                </h3>

            </div>

            {/* Title */}

            <h4 className="mt-4 font-semibold text-slate-800">
                {advice.title}
            </h4>

            {/* Description */}

            <p className="mt-2 text-sm leading-6 text-slate-600">
                {advice.description}
            </p>

        </div>

    );

};

export default MotivationCard;