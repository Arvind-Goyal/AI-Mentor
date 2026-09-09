import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `
        group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200

        ${
          isActive
            ? "bg-violet-100 text-violet-700 font-semibold shadow-sm shadow-violet-100"
            : "text-slate-600 hover:bg-white/80 hover:text-slate-900 hover:shadow-sm"
        }
      `
      }
    >
      <Icon size={18} strokeWidth={2} className="shrink-0 transition-transform group-hover:scale-105" />

      <span>{item.label}</span>
    </NavLink>
  );
};

export default SidebarItem;