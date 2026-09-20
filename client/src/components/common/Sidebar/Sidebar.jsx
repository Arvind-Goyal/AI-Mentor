import { SIDEBAR_ITEMS, SIDEBAR_FOOTER } from "../../../constants/sidebarItems";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const Sidebar = ({ mobileOpen = false, onClose }) => {
  const content = (
    <div className="flex h-full w-full flex-col bg-[#FDF7FA]">
      {/* Logo and Header */}
      <div className="flex items-center justify-between border-b border-slate-200/70 px-6 py-5 sm:py-6">
        <Link to="/dashboard" onClick={onClose}>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold tracking-wide text-white shadow-md shadow-violet-500/20">
              AI
            </span>
            <div>
              <h1 className="text-base font-bold leading-tight text-slate-900">AI DSA Mentor</h1>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-violet-500">Learn smarter</p>
            </div>
          </div>
        </Link>

        {/* Mobile close button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 lg:hidden"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-slate-200/70 px-3 py-4">
        {SIDEBAR_FOOTER.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            onClick={onClose}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on lg screens) */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 lg:flex">
        {content}
      </aside>

      {/* Mobile Drawer (visible on < lg when open) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <aside className="relative z-10 flex h-full w-72 max-w-[85vw] flex-col border-r border-slate-200 shadow-2xl animate-in slide-in-from-left duration-300">
            {content}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;