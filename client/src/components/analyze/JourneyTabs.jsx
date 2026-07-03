const JourneyTabs = ({
    steps,
    selectedStep,
    onSelect,
}) => {
    // const Icon = steps.icon;
    return (

        <div className="grid grid-cols-4 gap-3">

            {steps.map((step) => (
                //  Icon = step.icon,
                <button
                    key={step.id}
                    disabled={step.locked}
                    onClick={() => onSelect(step.id)}
                    className={`
                        rounded-xl
                        border
                        px-3
                        py-2
                        transition-all
                        duration-200

                        ${
                            selectedStep === step.id
                                ? "border-violet-500 bg-violet-50"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                        }

                        ${step.locked && "opacity-50 cursor-not-allowed"}
                    `}
                >

                    <div className="flex flex-col items-center gap-2">

                        <div className="text-xl">
                            {step.icon}
                            {/* <Icon/> */}
                        </div>

                        <p className="text-sm font-medium">
                            {step.title}
                        </p>

                    </div>

                </button>

            ))}

        </div>

    );
};

export default JourneyTabs;