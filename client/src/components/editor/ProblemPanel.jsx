import AccordionItem from "./AccordionItem";
import { useAnalysis } from "../../context/AnalysisContext";

const ProblemPanel = () => {
  const { analysisData } = useAnalysis();

  const title = analysisData?.problemTitle || "Problem Description";
  const problemStatement =
    analysisData?.analysis?.summary ||
    analysisData?.summary ||
    analysisData?.description ||
    "Read the problem description and craft your solution in the editor.";

  const hint1 =
    analysisData?.hint1?.text ||
    (typeof analysisData?.hint1 === "string" ? analysisData.hint1 : "");

  const hint2 =
    analysisData?.hint2?.text ||
    (typeof analysisData?.hint2 === "string" ? analysisData.hint2 : "");

  const hint3 =
    analysisData?.hint3?.text ||
    (typeof analysisData?.hint3 === "string" ? analysisData.hint3 : "");

  const algorithm =
    analysisData?.algorithm?.steps || analysisData?.algorithm || [];

  const pseudocode =
    analysisData?.pseudocode?.code ||
    (typeof analysisData?.pseudocode === "string" ? analysisData.pseudocode : "");

  const optimized =
    analysisData?.optimized?.code ||
    (typeof analysisData?.optimized === "string" ? analysisData.optimized : "");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[70vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900 truncate">
          {title}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent px-6 py-2">
        <AccordionItem
          title="Problem Statement"
          content={problemStatement}
          defaultOpen
        />

        {hint1 && <AccordionItem title="Hint 1" content={hint1} />}
        {hint2 && <AccordionItem title="Hint 2" content={hint2} />}
        {hint3 && <AccordionItem title="Hint 3" content={hint3} />}

        {algorithm && (Array.isArray(algorithm) ? algorithm.length > 0 : Boolean(algorithm)) && (
          <AccordionItem
            title="Algorithm"
            content={algorithm}
            type="list"
          />
        )}

        {pseudocode && (
          <AccordionItem
            title="Pseudocode"
            content={pseudocode}
            type="code"
          />
        )}

        {optimized && (
          <AccordionItem
            title="Optimized Solution"
            content={optimized}
            type="code"
          />
        )}
      </div>
    </div>
  );
};

export default ProblemPanel;