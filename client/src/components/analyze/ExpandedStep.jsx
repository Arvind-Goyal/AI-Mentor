const ExpandedStep = ({ step, onContinue }) => {

    if (!step) return null;

    return (

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">

            {/* Title */}

            <h3 className="text-xl font-semibold text-slate-900">
                {step.title}
            </h3>

            {/* Description */}

            <p className="mt-3 leading-7 text-slate-600">
                {step.description}
            </p>

            {/* Button */}

            <button
                onClick={onContinue} 
                disabled={step.locked}
                className={`mt-6 rounded-xl px-5 py-3 font-medium transition
                    ${
                        step.locked
                            ? "cursor-not-allowed bg-slate-200 text-slate-500"
                            : "bg-violet-600 text-white hover:bg-violet-700"
                    }
                `}
            >
                {step.locked ? "Locked" : "Continue Learning"}
            </button>

        </div>

    );
};

export default ExpandedStep;