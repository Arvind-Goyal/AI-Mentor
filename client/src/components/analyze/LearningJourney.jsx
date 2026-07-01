import { useState } from "react";
import { useAnalysis } from "../../context/AnalysisContext";

import { JOURNEY_STEPS } from "../../constants/learningJourney";

import ExpandedStep from "./ExpandedStep";
import JourneyTabs from "./JourneyTabs";

const LearningJourney = () => {

    const {
        analysisData,
        loading,
    } = useAnalysis();

    // Current unlocked step index
    const [curr, setCurr] = useState(0);

    // Current selected step
    const [selectedStep, setSelectedStep] = useState(
        JOURNEY_STEPS[0].id
    );

    const handleContinue = () => {

        if (curr < JOURNEY_STEPS.length - 1) {

            const next = curr + 1;

            setCurr(next);
            setSelectedStep(JOURNEY_STEPS[next].id);

        }

    };

    // Empty State
    if (!analysisData && !loading) {
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

    // Build tab state
    const steps = JOURNEY_STEPS.map((step, index) => ({
        ...step,
        completed: index < curr,
        active: index === curr,
        locked: index > curr,
    }));

    // Current selected step
    const currentStep =
        steps.find((step) => step.id === selectedStep) || steps[0];

    // Current content
    const currentContent = analysisData?.[currentStep.id];

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
                content={currentContent}
                onContinue={handleContinue}
            />

        </div>
    );
};

export default LearningJourney;