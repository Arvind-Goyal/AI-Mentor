import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Analyze from "../pages/Analyze/Analyze";
import History from "../pages/History/History";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import Editor from "../pages/Editor/Editor"
import ROUTES from "../constants/routes.js";
import ProtectedEditorRoute from "../pages/Editor/ProtectedEditorRoute.jsx";

const AppRoutes = () => {

    return (

        <Routes>

        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.ANALYZE} element={<Analyze />} />
        {/* <Route path = {ROUTES.EDITOR} element={<Editor/>}/> */}
        <Route path={ROUTES.EDITOR} element={
            <ProtectedEditorRoute>
                <Editor />
            </ProtectedEditorRoute>
        }
        />

        </Routes>

    );
};

export default AppRoutes;