import React from "react";
import { useLocation } from "react-router-dom";

import PageHeader from "./PageHeader";
import NavbarActions from "./NavbarActions";

const Navbar = () => {
  const location = useLocation();

  const isProfilePage = location.pathname === "/profile";

  return (
    <nav className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 py-4">

      {/* Page Header */}
      <PageHeader />

      {/* Navbar Actions */}
      <NavbarActions />

    </nav>
  );
};

export default Navbar;