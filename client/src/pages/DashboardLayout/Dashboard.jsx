import Navbar from "../../components/common/Navbar/Navbar";
import Sidebar from "../../components/common/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {

    return (

        <div className="flex h-screen overflow-hidden">

            <Sidebar/>

            <div className="flex flex-1 flex-col min-h-0">

               <Navbar/>

                <main className="flex-1 min-h-0 overflow-y-auto bg-[#F8FAFC]">

                    {children}

                </main>

            </div>

        </div>

    );

};

export default DashboardLayout;