import { useLocation } from "react-router-dom";

import Navbar from "../../components/common/Navbar/Navbar";
import Sidebar from "../../components/common/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const isProfilePage = location.pathname === "/profile";

  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar />

      <div className="flex flex-1 flex-col min-h-0">

        {/* Hide entire navbar on Profile */}
        {!isProfilePage && <Navbar />}

        <main className="flex-1 min-h-0 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;