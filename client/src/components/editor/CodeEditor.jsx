import Editor from "@monaco-editor/react";
import { useEditor } from "../../context/EditorContext";
import { FaCode } from "react-icons/fa";

const CodeEditor = () => {
  const { code, setCode, language, executeUserCode } = useEditor();

  const handleEditorMount = (editor, monaco) => {
    // Add Ctrl+Enter / Cmd+Enter keyboard shortcut to execute code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      executeUserCode();
    });
  };

  const getLanguageLabel = () => {
    switch (language) {
      case "java":
        return "Java (OpenJDK 21)";
      case "cpp":
        return "C++ (GCC 13)";
      case "python":
        return "Python 3.12";
      case "javascript":
        return "JavaScript (Node 20)";
      default:
        return language;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <FaCode className="text-violet-600 text-sm" />
          <h2 className="font-bold text-slate-800 text-sm">
            Code Editor
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-[11px] text-slate-500 font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            Ctrl + Enter to run
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200/60">
            {getLanguageLabel()}
          </span>
        </div>
      </div>

      {/* Monaco */}
      <div className="flex-1 w-full overflow-hidden">
        <Editor
          height="100%"
          language={language === "cpp" ? "cpp" : language}
          theme="vs"
          value={code}
          onChange={(value) => setCode(value ?? "")}
          onMount={handleEditorMount}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 14,
            lineHeight: 22,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            tabSize: 4,
            formatOnPaste: true,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;