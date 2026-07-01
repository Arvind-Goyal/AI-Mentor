const GoalCard = () => {

    

    // const goal = analysis?.mentor.goal;
    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            {/* Title */}
            <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100">
                    🎯
                </div>

                <h3 className="text-sm font-semibold text-slate-900">
                    Today's Goal
                </h3>

            </div>

            {/* Description */}

            <p className="mt-4 text-sm leading-6 text-slate-600">
                Understand the optimal approach before writing code.
            </p>

            {/* Divider */}

            <div className="my-5 border-t border-slate-100"></div>

            {/* Time */}

            <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                    Target Time
                </span>

                <span className="font-semibold text-violet-600">
                    20 mins
                </span>

            </div>

        </div>

    );
};

export default GoalCard;