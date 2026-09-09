import { SIDEBAR_ITEMS, SIDEBAR_FOOTER } from "../../../constants/sidebarItems";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-[#FDF7FA]">
      
      {/* Logo */}
      <div className="border-b border-slate-200/70 px-6 py-6">
        <Link to="/dashboard">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold tracking-wide text-white shadow-md shadow-violet-500/20">AI</span>
            <div>
              <h1 className="text-base font-bold leading-tight text-slate-900">AI DSA Mentor</h1>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-violet-500">Learn smarter</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-slate-200/70 px-3 py-4">
        {SIDEBAR_FOOTER.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;