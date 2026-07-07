import DashboardLayout from "../Dashboard/Dashboard";

import Toolbar from "./Toolbar";
import ProblemPanel from "./ProblemPanel";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";

const Editor = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 ">

        <div className="max-w-7xl mx-auto p-6 space-y-5">

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