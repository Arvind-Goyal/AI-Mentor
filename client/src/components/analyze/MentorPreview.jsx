import {
  FaRobot,
  FaBrain,
  FaLightbulb,
  FaCode,
  FaSearch,
  FaRocket,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine className="text-violet-600" />,
    title: "Difficulty Detection",
  },
  {
    icon: <FaBrain className="text-blue-600" />,
    title: "Concept Identification",
  },
  {
    icon: <FaLightbulb className="text-yellow-500" />,
    title: "Progressive Hints",
  },
  {
    icon: <FaCode className="text-green-600" />,
    title: "Algorithm & Pseudocode",
  },
  {
    icon: <FaSearch className="text-pink-600" />,
    title: "AI Code Review",
  },
  {
    icon: <FaRocket className="text-indigo-600" />,
    title: "Optimized Solution",
  },
];

const MentorPreview = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sticky top-6">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
          <FaRobot className="text-2xl text-violet-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            AI Mentor
          </h2>

          <p className="text-sm text-slate-500">
            Ready to guide your learning.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-violet-50 border border-violet-100 p-4 mb-6">
        <p className="text-sm text-slate-700">
          Paste any coding problem and I'll generate a personalized learning
          roadmap instead of just giving the answer.
        </p>
      </div>

      <div className="space-y-4">
        {features.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {item.icon}

            <span className="text-slate-700">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-4 border">
        <p className="text-sm text-slate-500">
          ⚡ Estimated analysis time
        </p>

        <p className="font-semibold text-slate-900">
          5–10 seconds
        </p>
      </div>
    </div>
  );
};

export default MentorPreview;