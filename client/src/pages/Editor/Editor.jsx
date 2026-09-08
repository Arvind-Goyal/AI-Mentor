import DashboardLayout from "../DashboardLayout/Dashboard";

import Toolbar from "../../components/editor/Toolbar";
import ProblemPanel from "../../components/editor/ProblemPanel";
import CodeEditor from "../../components/editor/CodeEditor";
import OutputPanel from "../../components/editor/OutputPanel";

const Editor = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-5 p-6">

          {/* Toolbar */}
          <Toolbar />

          {/* Main Section */}
          <div className="grid grid-cols-12 gap-5">

            {/* Left */}
            <div className="col-span-4">
              <ProblemPanel />
            </div>

            {/* Right */}
            <div className="col-span-8">
              <CodeEditor />
            </div>

          </div>

          {/* Bottom */}
          <OutputPanel />

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Editor;