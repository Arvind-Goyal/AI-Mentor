import { SIDEBAR_ITEMS, SIDEBAR_FOOTER } from "../../../constants/sidebarItems";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-200">
        <h1 className="text-xl font-bold text-violet-600">
          AI DSA Mentor
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-200 space-y-2">
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