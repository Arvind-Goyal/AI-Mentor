const JourneyTabs = ({
    steps,
    selectedStep,
    onSelect,
}) => {
    // const Icon = steps.icon;
    return (

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {steps.map((step) => (
                <button
                    key={step.id}
                    disabled={step.locked}
                    onClick={() => onSelect(step.id)}
                    className={`
                        rounded-xl
                        border
                        px-2.5 sm:px-3
                        py-2 sm:py-2.5
                        transition-all
                        duration-200

                        ${
                            selectedStep === step.id
                                ? "border-violet-500 bg-violet-50 shadow-xs"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                        }

                        ${step.locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    `}
                >
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                        <div className="text-lg sm:text-xl">
                            {step.icon}
                        </div>

                        <p className="text-xs sm:text-sm font-medium text-center truncate w-full">
                            {step.title}
                        </p>
                    </div>
                </button>
            ))}
        </div>

    );
};

export default JourneyTabs;