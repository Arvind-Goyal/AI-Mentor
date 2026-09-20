import { User, Settings, CircleHelp, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../api/auth";
import { useAuth } from "../../../context/AuthContext";

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

const UserMenu = ({ onClose }) => {
  const navigate = useNavigate();

  const { user, logoutUser } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = async () => {
    try {
      await logout(); // Backend clears HTTP-only cookie

      logoutUser(); // Clear AuthContext

      onClose?.();
      // console.log("Pahuch gaya");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50">

      {/* User Info */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white ring-1 ring-slate-200 select-none">
            {user?.name?.trim()?.[0]?.toUpperCase() || user?.username?.trim()?.[0]?.toUpperCase() || "U"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {user?.name || "Guest"}
          </h3>

          <p className="truncate text-xs text-slate-500 mt-0.5">
            {user?.email || "Not signed in"}
          </p>
        </div>
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
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
};

export default UserMenu;