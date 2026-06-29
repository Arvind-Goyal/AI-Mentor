import { FaLightbulb } from "react-icons/fa";

const MotivationCard = () => {
    return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">

            {/* Header */}
            <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">

                    <FaLightbulb
                        size={15}
                        className="text-amber-600"
                    />

                </div>

                <h3 className="text-sm font-semibold text-slate-900">
                    Mentor's Advice
                </h3>

            </div>

            {/* Quote */}

            <p className="mt-4 text-sm leading-7 italic text-slate-700">

                "The best programmers don't start by coding.
                They start by understanding the problem."

            </p>

            {/* Footer */}

            <p className="mt-4 text-xs font-medium text-amber-700">

                — AI Mentor

            </p>

        </div>
    );
};

export default MotivationCard;