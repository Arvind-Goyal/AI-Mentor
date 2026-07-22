import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthButton from "../../components/auth/AuthButton";
import Divider from "../../components/auth/Divider";
import GoogleButton from "../../components/auth/GoogleButton";
import AuthFooter from "../../components/auth/AuthFooter";

const Login = () => {
    return (
        <AuthLayout>
            <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-10 shadow-2xl backdrop-blur-xl">

                {/* Logo */}

                <div className="flex justify-center">
                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-lg font-bold text-white">
                            AI
                        </div>

                        <span className="text-2xl font-bold text-slate-900">
                            Mentor
                        </span>

                    </div>
                </div>

                {/* Heading */}

                <div className="mt-8 text-center">

                    <h1 className="text-4xl font-bold text-slate-900">
                        Welcome Back
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Sign in to continue your learning journey.
                    </p>

                </div>

                {/* Form */}

                <form className="mt-10 space-y-5">

                    <AuthInput
                        type="email"
                        label="Email"
                        placeholder="john@example.com"
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                    />

                    {/* Forgot Password */}

                    <div className="flex justify-end">

                        <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-violet-600 hover:text-violet-700"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    <AuthButton>
                        Sign In
                    </AuthButton>

                </form>

                <Divider />

                <GoogleButton />

                <AuthFooter
                    text="Don't have an account?"
                    linkText="Create one"
                    to="/signup"
                />

            </div>
        </AuthLayout>
    );
};

export default Login;