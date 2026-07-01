const ExpandedStep = ({ step, content, onContinue }) => {

    if (!step) return null;

    return (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-2">

            {/* Title */}
           
            {/* No Data */}
            {!content ? (
                <div className="mt-6 text-slate-500">
                    This step will be unlocked as you progress.
                </div>
            ) : (
                <div className="mt-3 space-y-6">

                    {/* Problem Analysis */}
                    {content.summary && (
                        <div>
                            

                            <p className="mt-2 text-slate-600">
                                {content.summary}
                            </p>
                        </div>
                    )}

                    {/* Difficulty */}
                    {content.difficulty && (
                        <div>
                           

                            <span className="mt-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
                                {content.difficulty}
                            </span>
                        </div>
                    )}

                    {/* Concepts */}
                    {content.concepts && (
                        <div>
                           

                            <div className="mt-3 flex flex-wrap gap-2">
                                {content.concepts.map((concept) => (
                                    <span
                                        key={concept}
                                        className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700"
                                    >
                                        {concept}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hint */}
                    {content.text && (
                        <div>
                          

                            <p className="mt-2 text-slate-600">
                                {content.text}
                            </p>
                        </div>
                    )}

                    {/* Algorithm */}
                    {content.steps && (
                        <div>
                           

                            <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-600">
                                {content.steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {/* Pseudocode / Code */}
                    {content.code && (
                        <div>
                            <h4 className="font-semibold text-slate-800">
                                Code
                            </h4>

                            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-green-300">
                                <code>{content.code}</code>
                            </pre>
                        </div>
                    )}

                    {/* Strengths */}
                    {content.strengths && (
                        <div>
                            <h4 className="font-semibold text-green-700">
                                Strengths
                            </h4>

                            <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-600">
                                {content.strengths.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Improvements */}
                    {content.improvements && (
                        <div>
                            <h4 className="font-semibold text-orange-700">
                                Improvements
                            </h4>

                            <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-600">
                                {content.improvements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Complexity */}
                    {content.complexity && (
                        <div className="grid grid-cols-2 gap-4">

                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <p className="text-sm text-slate-500">
                                    Time Complexity
                                </p>

                                <p className="mt-1 font-semibold">
                                    {content.complexity.time}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <p className="text-sm text-slate-500">
                                    Space Complexity
                                </p>

                                <p className="mt-1 font-semibold">
                                    {content.complexity.space}
                                </p>
                            </div>

                        </div>
                    )}

                </div>
            )}

            <button
                onClick={onContinue}
                disabled={step.locked}
                className={`mt-8 rounded-xl px-5 py-3 font-medium transition ${
                    step.locked
                        ? "cursor-not-allowed bg-slate-200 text-slate-500"
                        : "bg-violet-600 text-white hover:bg-violet-700"
                }`}
            >
                {step.locked ? "Locked" : "Continue Learning"}
            </button>

        </div>
    );
};

export default ExpandedStep;