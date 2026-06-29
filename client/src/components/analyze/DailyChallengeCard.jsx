import { FaTrophy } from "react-icons/fa";

const DailyChallengeCard = () => {
    return (

        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm hover:shadow-md transition">

            {/* Header */}

            <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">

                    <FaTrophy
                        className="text-yellow-600"
                        size={15}
                    />

                </div>

                <h3 className="text-sm font-semibold text-slate-900">

                    Daily Challenge

                </h3>

            </div>

            {/* Goal */}

            <p className="mt-4 text-sm text-slate-700">

                Solve

                <span className="font-semibold text-slate-900">
                    {" "}2 Medium Problems
                </span>

                today.

            </p>

            {/* Progress */}

            <div className="mt-5">

                <div className="flex justify-between text-xs text-slate-500">

                    <span>Progress</span>

                    <span>1 / 2</span>

                </div>

                <div className="mt-2 h-2 rounded-full bg-yellow-100">

                    <div className="h-2 w-1/2 rounded-full bg-yellow-500"></div>

                </div>

            </div>

            {/* Reward */}

            <div className="mt-5 rounded-xl bg-white p-3 border border-yellow-200">

                <p className="text-sm font-semibold text-yellow-700">

                    🎁 Reward: +100 XP

                </p>

            </div>

        </div>

    );

};

export default DailyChallengeCard;