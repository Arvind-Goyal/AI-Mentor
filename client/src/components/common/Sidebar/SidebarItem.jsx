import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `
        flex items-center gap-3
        px-4 py-3
        rounded-xl
        transition-all duration-200

        ${
          isActive
            ? "bg-violet-100 text-violet-700 font-semibold"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }
      `
      }
    >
      <Icon size={20} />

      <span>{item.label}</span>
    </NavLink>
  );
};

export default SidebarItem;