import AccordionItem from "./AccordionItem";
import { useAnalysis } from "../../context/AnalysisContext";
const ProblemPanel = () => {
  // Dummy data (replace with analysisData later)

//   const problem = `
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution,
// and you may not use the same element twice.
// `;

//   const hint1 =
//     "Think about how you can quickly determine whether the required complement has already been seen.";

//   const hint2 =
//     "A HashMap can store numbers you've already visited along with their indices.";

//   const hint3 =
//     "For each number, check if target - currentNumber exists before inserting the current number.";

//   const algorithm = `
// 1. Create an empty HashMap.
// 2. Traverse the array.
// 3. Compute complement = target - nums[i].
// 4. If complement exists, return indices.
// 5. Otherwise store nums[i].
// `;

//   const pseudocode = `
// map = {}

// for each number:

//     complement = target - number

//     if complement exists:
//         return answer

//     store current number
// `;

//   const solution = `
// public int[] twoSum(int[] nums, int target){

//     Map<Integer,Integer> map = new HashMap<>();

//     for(int i=0;i<nums.length;i++){

//         int comp = target - nums[i];

//         if(map.containsKey(comp))
//             return new int[]{map.get(comp),i};

//         map.put(nums[i],i);
//     }

//     return new int[]{};
// }
  // `;
  
  const { analysisData }=useAnalysis();
 3
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[70vh] overflow-hidden flex flex-col">
      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">
          Two Sum
        </h2>
      </div>

      {/* Scrollable Content */}

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent px-6">

        <AccordionItem
    title="Problem Statement"
    content={analysisData.analysis.summary}
    defaultOpen
/>

<AccordionItem
    title="Hint 1"
    content={analysisData.hint1.text}
/>

<AccordionItem
    title="Hint 2"
    content={analysisData.hint2.text}
/>

<AccordionItem
    title="Hint 3"
    content={analysisData.hint3.text}
/>

<AccordionItem
    title="Algorithm"
    content={analysisData.algorithm.steps}
    type="list"
/>

<AccordionItem
    title="Pseudocode"
    content={analysisData.pseudocode.code}
    type="code"
/>

<AccordionItem
    title="Optimized Solution"
    content={analysisData.optimized.code}
    type="code"
/>

      </div>
    </div>
  );
};

export default ProblemPanel;