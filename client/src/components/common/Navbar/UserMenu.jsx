import { User, Settings, CircleHelp, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MENU_ITEMS = [
  {
    label: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    label: "Help & Support",
    icon: CircleHelp,
    path: "/help",
  },
];

const UserMenu = ({ name = "Arvind Goyal", email = "arvind@example.com", onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50">

      {/* User Info */}
      <div className="px-5 py-4 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900">
          {name}
        </h3>

        <p className="text-xs text-slate-500 mt-1">
          {email}
        </p>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className="w-full flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-100 transition"
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Logout */}
      <button
        className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
};

export default UserMenu;