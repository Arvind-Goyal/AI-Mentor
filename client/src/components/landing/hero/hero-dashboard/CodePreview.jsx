import { FileCode2 } from "lucide-react";

const code = [
  "class Solution {",
  "  public int[] twoSum(int[] nums, int target) {",
  "    HashMap<Integer, Integer> map = new HashMap<>();",
  "",
  "    for (int i = 0; i < nums.length; i++) {",
  "      int diff = target - nums[i];",
  "",
  "      if (map.containsKey(diff)) {",
  "        return new int[]{map.get(diff), i};",
  "      }",
  "",
  "      map.put(nums[i], i);",
  "    }",
  "",
  "    return new int[]{};",
  "  }",
  "}",
];

const highlight = (line) => {
  if (line.includes("HashMap"))
    return (
      <>
        <span className="text-sky-400">HashMap</span>
        {line.replace("HashMap", "")}
      </>
    );

  if (line.includes("return"))
    return <span className="text-emerald-400">{line}</span>;

  if (line.includes("for"))
    return <span className="text-violet-400">{line}</span>;

  if (line.includes("if"))
    return <span className="text-amber-400">{line}</span>;

  return line;
};

const CodePreview = () => {
  return (
    <div className="border-b border-slate-100 px-6 py-6">

      <div className="mb-4 flex items-center gap-2">
        <FileCode2 className="h-5 w-5 text-violet-600" />
        <h3 className="text-lg font-semibold text-slate-900">
          Code Preview
        </h3>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-slate-900">

        <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />

          <span className="ml-3 text-xs text-slate-400">
            Solution.java
          </span>
        </div>

        <pre className="overflow-hidden px-5 py-4 text-sm leading-7 text-slate-300">
          {code.map((line, index) => (
            <div
              key={index}
              className="flex gap-5"
            >
              <span className="w-4 select-none text-right text-slate-500">
                {index + 1}
              </span>

              <code>{highlight(line)}</code>
            </div>
          ))}
        </pre>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />

      </div>

    </div>
  );
};

export default CodePreview;