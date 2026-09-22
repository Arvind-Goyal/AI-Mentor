import DashboardLayout from "../DashboardLayout/Dashboard";

import Toolbar from "../../components/editor/Toolbar";
import ProblemPanel from "../../components/editor/ProblemPanel";
import CodeEditor from "../../components/editor/CodeEditor";
import OutputPanel from "../../components/editor/OutputPanel";
import ResizableLayout from "../../components/editor/ResizableLayout";

const Editor = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1536px] space-y-4 sm:space-y-5 p-3 sm:p-6">

          {/* Toolbar */}
          <Toolbar />

          {/* Main Resizable Section */}
          <ResizableLayout
            leftPanel={<ProblemPanel />}
            rightPanel={<CodeEditor />}
          />

          {/* Bottom */}
          <OutputPanel />

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Editor;