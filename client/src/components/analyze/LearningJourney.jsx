import { useState } from "react";
import { useAnalysis } from "../../context/AnalysisContext";

import { JOURNEY_STEPS } from "../../constants/learningJourney";

import ExpandedStep from "./ExpandedStep";
import JourneyTabs from "./JourneyTabs";

const LearningJourney = () => {

    const { analysis, loading } = useAnalysis();
   const [selectedStep, setSelectedStep] = useState(1);
const [curr, setCurr] = useState(1);
    const handleContinue = () => {

    if (curr < JOURNEY_STEPS.length) {

        const next = curr + 1;

        setCurr(next);
        setSelectedStep(next);

    }

};

    // Empty State
    if (!analysis && !loading) {
        return (
            <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                    Learning Journey
                </h2>

                <p className="mt-3 text-slate-500">
                    Analyze a problem to unlock your personalized learning journey.
                </p>
            </div>
        );
    }

    // Loading State
    if (loading) {
        return (
            <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                    Learning Journey
                </h2>

                <p className="mt-3 text-slate-500">
                    Preparing your personalized roadmap...
                </p>
            </div>
        );
    }

    const steps = JOURNEY_STEPS.map((step) => ({
    ...step,

    completed: step.id < curr,

    active: step.id === curr,

    locked: step.id > curr,
}));

    const currentStep =
        steps.find((step) => step.id === selectedStep) || steps[0];

    return (
        <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">

            {/* Header */}

            <div className="mb-4 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-600">
                    4
                </div>

                <div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Learning Journey
                    </h2>

                    <p className="text-sm text-slate-500">
                        Unlock each step as you progress.
                    </p>

                </div>

            </div>

            {/* Journey Tabs */}

            <JourneyTabs
                steps={steps}
                selectedStep={selectedStep}
                onSelect={setSelectedStep}
            />

            {/* Expanded Step */}

            <ExpandedStep
             step={currentStep}
             onContinue={handleContinue}
            />

        </div>
    );
};

export default LearningJourney;