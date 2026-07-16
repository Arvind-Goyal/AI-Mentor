import { PlayCircle, Sun, Bell } from "lucide-react";
import Avatar from "./Avatar";
import { useEffect, useRef, useState } from "react";
import UserMenu from "./UserMenu";

const NavbarActions = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="flex items-center gap-4">

      {/* How it Works */}
      <button
        className="
          flex items-center gap-2
          px-4 py-2
          rounded-xl
          border
          border-slate-200
          hover:bg-slate-50
          transition
        "
      >
        <PlayCircle size={18} />
        <span className="hidden md:block">
          How it works
        </span>
      </button>

      {/* Theme */}
      <button
        className="
          p-2
          rounded-lg
          hover:bg-slate-100
          transition
        "
      >
        <Sun size={20} />
      </button>

      {/* Notifications */}
      <button
        className="
          relative
          p-2
          rounded-lg
          hover:bg-slate-100
          transition
        "
      >
        <Bell size={20} />

        <span
          className="
            absolute
            -top-1
            -right-1
            w-4
            h-4
            rounded-full
            bg-violet-600
            text-white
            text-[10px]
            flex
            items-center
            justify-center
          "
        >
          2
        </span>

          </button>

        <div className="relative" ref={menuRef}>
        <Avatar
            onClick={() => setOpen(prev => !prev)}
        />
            
           {open && (
            <UserMenu
            onClose={() => setOpen(false)}
             />
            )}

        </div>

    </div>
  );
};

export default NavbarActions;   