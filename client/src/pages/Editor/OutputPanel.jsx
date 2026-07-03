import { useState } from "react";
import { useEditor } from "../../context/EditorContext";

const tabs = ["Output", "AI Review"];

const OutputPanel = () => {

  const {activeTab, setActiveTab } = useEditor();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

      {/* Tabs */}

      <div className="flex border-b border-slate-200">

        {tabs.map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-medium transition
              ${
                activeTab === tab
                  ? "border-b-2 border-violet-600 text-violet-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
          >
            {tab}
          </button>

        ))}

      </div>

      {/* Content */}

      <div className="h-56 p-6">

        {activeTab === "Output" ? (

          <div className="text-slate-500">

            Run your code to see the output.

          </div>

        ) : (

          <div className="text-slate-500">

            Submit your code for AI review.

          </div>

        )}

      </div>

    </div>
  );
};

export default OutputPanel;