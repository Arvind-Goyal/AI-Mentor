const ConceptsCard = () => {
    const concepts = [
        "Arrays",
        "HashMap",
        "Binary Search",
        "Two Pointers"
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            {/* Header */}
            <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    📚
                </div>

                <h3 className="text-sm font-semibold text-slate-900">
                    Concepts You'll Learn
                </h3>

            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">

                {concepts.map((concept) => (
                    <span
                        key={concept}
                        className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 border border-green-100"
                    >
                        {concept}
                    </span>
                ))}

            </div>

        </div>
    );
};

export default ConceptsCard;