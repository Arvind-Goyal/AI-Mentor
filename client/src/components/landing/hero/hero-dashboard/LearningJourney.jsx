import {
  Search,
  Lightbulb,
  GitBranch,
  FileCode2,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    label: "Analyze",
    active: true,
  },
  {
    icon: Lightbulb,
    label: "Hint",
    active: true,
  },
  {
    icon: GitBranch,
    label: "Algorithm",
    active: true,
  },
  {
    icon: FileCode2,
    label: "Code",
    active: false,
  },
  {
    icon: CheckCircle2,
    label: "Review",
    active: false,
  },
];

const LearningJourney = () => {
  return (
    <div className="border-b border-slate-100 px-6 py-6">

      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Learning Journey
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Learn step-by-step instead of jumping to the final solution.
        </p>
      </div>

      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300
                  ${
                    step.active
                      ? "bg-violet-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <span
                  className={`mt-2 text-xs font-medium ${
                    step.active
                      ? "text-slate-800"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`mx-3 h-1 flex-1 rounded-full ${
                    index < 2
                      ? "bg-violet-600"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningJourney;