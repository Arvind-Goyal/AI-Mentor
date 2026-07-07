import {
  FaBug,
  FaExclamationTriangle,
  FaLightbulb,
  FaChartLine,
  FaClipboardCheck,
} from "react-icons/fa";

import ReviewSection from "./ReviewSection";
import { useEditor } from "../../context/EditorContext";

const ReviewPanel = () => {
  const { review } = useEditor();

  if (!review) return null;

  return (
    <div className="p-6 overflow-y-auto h-full">

      {/* Errors */}
      <ReviewSection
        icon={<FaBug className="text-red-500" />}
        title="Errors"
      >
        <ul className="space-y-2">
          {review.errors.map((error, index) => (
            <li
              key={index}
              className="text-sm text-slate-600 list-disc ml-5"
            >
              {error}
            </li>
          ))}
        </ul>
      </ReviewSection>

      {/* Logic Issues */}
      <ReviewSection
        icon={<FaExclamationTriangle className="text-orange-500" />}
        title="Logic Issues"
      >
        <ul className="space-y-2">
          {review.logicIssues.map((issue, index) => (
            <li
              key={index}
              className="text-sm text-slate-600 list-disc ml-5"
            >
              {issue}
            </li>
          ))}
        </ul>
      </ReviewSection>

      {/* Suggestions */}
      <ReviewSection
        icon={<FaLightbulb className="text-amber-500" />}
        title="Suggestions"
      >
        <ul className="space-y-2">
          {review.suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="text-sm text-slate-600 list-disc ml-5"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </ReviewSection>

      {/* Complexity */}
      <ReviewSection
        icon={<FaChartLine className="text-green-600" />}
        title="Complexity Analysis"
      >
        <div className="overflow-x-auto">
          <table className="w-50 text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-2">Metric</th>
                <th className="text-left px-4 py-2">Your Code</th>
                <th className="text-left px-4 py-2">Expected</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Time</td>
                <td className="px-4 py-2">{review.complexity.time}</td>
                <td className="px-4 py-2">
                  {review.complexity.expectedTime}
                </td>
              </tr>

              <tr className="border-t">
                <td className="px-4 py-2">Space</td>
                <td className="px-4 py-2">{review.complexity.space}</td>
                <td className="px-4 py-2">
                  {review.complexity.expectedSpace}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ReviewSection>

      {/* Overall Feedback */}
      <ReviewSection
        icon={<FaClipboardCheck className="text-violet-600" />}
        title="Overall Feedback"
      >
        <p className="text-sm text-slate-600 leading-7">
          {review.overallFeedback}
        </p>
      </ReviewSection>

    </div>
  );
};

export default ReviewPanel;