import { TriangleAlert } from "lucide-react";
const MistakesCard = () => {

    const mistakes = [
        "Don't jump into coding immediately.",
        "Consider edge cases first.",
        "Avoid unnecessary nested loops.",
        "Think about time complexity."
    ];

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            {/* Header */}
            <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
    <TriangleAlert
        size={18}
        className="text-red-600"
        strokeWidth={2.5}
    />
</div>

                <h3 className="text-sm font-semibold text-slate-900">
                    Common Mistakes
                </h3>

            </div>

            {/* List */}
            <div className="mt-4 space-y-3">

                {mistakes.map((mistake, index) => (

                    <div
                        key={index}
                        className="flex items-start gap-3"
                    >

                        <div className="mt-1 h-2 w-2 rounded-full bg-red-500"></div>

                        <p className="text-sm text-slate-600 leading-6">
                            {mistake}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );
};

export default MistakesCard;