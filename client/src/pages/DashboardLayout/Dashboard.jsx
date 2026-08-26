import Navbar from "../../components/common/Navbar/Navbar";
import Sidebar from "../../components/common/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {

    return (

        <div className="flex h-screen">

            <Sidebar/>

            <div className="flex flex-col flex-1">

               <Navbar/>

                <main className="flex-1 overflow-y-auto">

                    {children}

                </main>

            </div>

        </div>

    );

};

export default DashboardLayout;