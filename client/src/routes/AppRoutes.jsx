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
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import NotFound from "../pages/NotFound/NotFound";

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

            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
            

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

            {/* Universal 404 Error Route for Wrong Pages */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;