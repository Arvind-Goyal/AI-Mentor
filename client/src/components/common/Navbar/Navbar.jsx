import React from "react";
import { Menu } from "lucide-react";

import PageHeader from "./PageHeader";
import NavbarActions from "./NavbarActions";

const Navbar = ({ onOpenMobileSidebar }) => {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-6 py-2 sm:py-4">
      {/* Left: Mobile hamburger & Page Header */}
      <div className="flex items-center min-w-0 pr-2">
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            aria-label="Open sidebar menu"
            className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 lg:hidden shrink-0"
          >
            <Menu size={20} />
          </button>
        )}

        <PageHeader />
      </div>

      {/* Right: Navbar Actions */}
      <div className="shrink-0">
        <NavbarActions />
      </div>
    </nav>
  );
};

export default Navbar;