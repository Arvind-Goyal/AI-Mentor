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
import ProtectedEditorRoute from "../components/editor/ProtectedEditorRoute";
import History from "../pages/History/History";
import Profile from "../pages/Profile/Profile";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path={ROUTES.HOME} element={<Landing />} />

            <Route
                path={ROUTES.LOGIN}
                element={
                    <PublicRoute>
                        <Landing />
                    </PublicRoute>
                }
            />

            <Route
                path={ROUTES.SIGNUP}
                element={
                    <PublicRoute>
                        <Landing />
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
            <Route
                path={ROUTES.HISTORY}
                element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                }
            />

            <Route
                path={ROUTES.PROFILE}
                element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/users/:username"
                element={<Profile />}
            />
        </Routes>
    );
};

export default AppRoutes;