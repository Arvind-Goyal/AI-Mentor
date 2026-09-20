import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu } from "lucide-react";

import Navbar from "../../components/common/Navbar/Navbar";
import Sidebar from "../../components/common/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isProfilePage = location.pathname === "/profile" || location.pathname.startsWith("/users/");

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar with mobile drawer support */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col min-h-0 min-w-0">
        {/* Regular Navbar on all non-profile pages */}
        {!isProfilePage && (
          <Navbar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />
        )}

        {/* Dedicated Mobile Header on Profile page so mobile users aren't trapped */}
        {isProfilePage && (
          <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95"
              >
                <Menu size={20} />
              </button>

              <Link to="/dashboard" className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-[10px] font-bold text-white shadow-xs">
                  AI
                </span>
                <span className="text-sm font-bold text-slate-900">AI DSA Mentor</span>
              </Link>
            </div>

            <Link
              to="/dashboard"
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg"
            >
              Dashboard
            </Link>
          </header>
        )}

        <main className="flex-1 min-h-0 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;