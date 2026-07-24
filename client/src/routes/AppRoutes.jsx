import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Analyze from "../pages/Analyze/Analyze";
import Editor from "../pages/Editor/Editor";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import ROUTES from "../constants/routes";
import ProtectedEditorRoute from "../pages/Editor/ProtectedEditorRoute";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path={ROUTES.HOME} element={<Landing />} />

            <Route
                path={ROUTES.LOGIN}
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path={ROUTES.SIGNUP}
                element={
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                }
            />

            {/* Protected */}
            <Route
                path={ROUTES.DASHBOARD}
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path={ROUTES.ANALYZE}
                element={
                    <ProtectedRoute>
                        <Analyze />
                    </ProtectedRoute>
                }
            />
            
            <Route
                path={ROUTES.EDITOR}
                element={
                    <ProtectedRoute>
                        <ProtectedEditorRoute>
                            <Editor />
                        </ProtectedEditorRoute>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;