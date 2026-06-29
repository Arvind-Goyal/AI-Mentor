import { FaStar } from "react-icons/fa";

const LearningProgressCard = () => {
    return (

        <div className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm hover:shadow-md transition">

            {/* Header */}

            <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">

                    <FaStar
                        className="text-indigo-600"
                        size={15}
                    />

                </div>

                <h3 className="text-sm font-semibold text-slate-900">
                    Learning Progress
                </h3>

            </div>

            {/* Level */}

            <div className="mt-5">

                <div className="flex justify-between">

                    <span className="text-sm text-slate-500">
                        Level
                    </span>

                    <span className="font-bold text-indigo-600">
                        7
                    </span>

                </div>

                {/* Progress */}

                <div className="mt-3 h-2 rounded-full bg-slate-200">

                    <div className="h-2 w-[72%] rounded-full bg-indigo-600"></div>

                </div>

                <div className="mt-2 flex justify-between text-xs text-slate-500">

                    <span>1420 XP</span>

                    <span>2000 XP</span>

                </div>

            </div>

            {/* Footer */}

            <div className="mt-5 rounded-xl bg-indigo-50 p-3">

                <p className="text-xs font-medium text-indigo-700">

                    🚀 Only 580 XP left to reach Level 8!

                </p>

            </div>

        </div>

    );

};

export default LearningProgressCard;