import {
  PlayCircle,
  Sun,
  Bell,
  Search,
} from "lucide-react";

import Avatar from "./Avatar";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

import { searchUsers } from "../../../api/user";

const NavbarActions = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // User search
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Profile menu
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

      // Search dropdown
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Search users
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        setSearchOpen(true);

        const data = await searchUsers(search);

        setSearchResults(data.users || []);
      } catch (error) {
        console.error("User search error:", error);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Open selected user's profile
  const handleUserClick = (user) => {
    setSearch("");
    setSearchResults([]);
    setSearchOpen(false);

    navigate(`/users/${user.username}`);
  };

  return (
    <div className="flex items-center gap-4">

      {/* How it Works */}
      <button
        type="button"
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          px-4
          py-2
          transition
          hover:bg-slate-50
        "
      >
        <PlayCircle size={18} />

        <span className="hidden md:block">
          How it works
        </span>
      </button>


      {/* User Search */}
      <div
        ref={searchRef}
        className="relative hidden md:block"
      >

        {/* Search Input */}
        <div
          className="
            flex
            h-10
            w-64
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3
            transition
            focus-within:border-violet-400
            focus-within:ring-2
            focus-within:ring-violet-100
          "
        >
          <Search
            size={18}
            className="shrink-0 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => {
              if (search.trim()) {
                setSearchOpen(true);
              }
            }}
            placeholder="Search users..."
            className="
              w-full
              bg-transparent
              text-sm
              text-slate-700
              outline-none
              placeholder:text-slate-400
            "
          />
        </div>


        {/* Search Dropdown */}
        {searchOpen && (
          <div
            className="
              absolute
              right-0
              top-12
              z-50
              w-80
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-xl
            "
          >

            {/* Loading */}
            {searchLoading && (
              <div className="px-4 py-4">
                <p className="text-sm text-slate-500">
                  Searching...
                </p>
              </div>
            )}


            {/* Results */}
            {!searchLoading &&
              searchResults.length > 0 && (
                <div>
                  {searchResults.map((user) => (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => handleUserClick(user)}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-left
                        transition
                        hover:bg-violet-50
                      "
                    >
                      {/* Avatar */}
                      <img
                        src={
                          user.profilePicture ||
                          "/default-avatar.png"
                        }
                        alt={user.name}
                        className="
                          h-10
                          w-10
                          shrink-0
                          rounded-full
                          object-cover
                          ring-1
                          ring-slate-200
                        "
                      />

                      {/* User information */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          @{user.username}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}


            {/* No Results */}
            {!searchLoading &&
              searchResults.length === 0 && (
                <div className="px-4 py-6 text-center">
                  <Search
                    size={22}
                    className="mx-auto mb-2 text-slate-300"
                  />

                  <p className="text-sm font-medium text-slate-700">
                    No users found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try a different name or username.
                  </p>
                </div>
              )}

          </div>
        )}
      </div>


      {/* Theme */}
      <button
        type="button"
        className="
          rounded-lg
          p-2
          transition
          hover:bg-slate-100
        "
      >
        <Sun size={20} />
      </button>


      {/* Notifications */}
      <button
        type="button"
        className="
          relative
          rounded-lg
          p-2
          transition
          hover:bg-slate-100
        "
      >
        <Bell size={20} />

        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-4
            w-4
            items-center
            justify-center
            rounded-full
            bg-violet-600
            text-[10px]
            text-white
          "
        >
          2
        </span>
      </button>


      {/* Profile Menu */}
      <div
        className="relative"
        ref={menuRef}
      >
        <Avatar
          onClick={() => setOpen((prev) => !prev)}
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