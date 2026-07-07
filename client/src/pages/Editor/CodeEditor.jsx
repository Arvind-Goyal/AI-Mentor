import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useEditor } from "../../context/EditorContext";
import { useAnalysis } from "../../context/AnalysisContext";


const CodeEditor = () => {
  const { analysisData} = useAnalysis();
  const { code, setCode, language } = useEditor();
  // const changeTemp = () => {
  //   setCode(analysisData.template.language);
  // }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[70vh] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-800">
          Code Editor
        </h2>

        <span className="text-sm text-slate-500">
          {language}
        </span>
      </div>

      {/* Monaco */}
      <Editor
        height="calc(70vh - 60px)"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value??"")}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 15,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 4,
        }}
      />

    </div>
  );
};

export default CodeEditor;