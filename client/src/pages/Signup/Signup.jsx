import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthButton from "../../components/auth/AuthButton";
import Divider from "../../components/auth/Divider";
import GoogleButton from "../../components/auth/GoogleButton";
import AuthFooter from "../../components/auth/AuthFooter";

import { signupSchema } from "../../schemas/signupSchema";
import { signup } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (formData) => {
        try {
            setServerError("");

            const response = await signup(formData);

            loginUser(response.user);

            navigate("/dashboard");
        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

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
                        Create Account
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Start solving smarter with AI-powered guidance.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-10 space-y-5"
                >
                    <AuthInput
                        label="Full Name"
                        placeholder="John Doe"
                        {...register("name", {
                            onChange: () => setServerError(""),
                        })}
                        error={errors.name}
                    />

                    <AuthInput
                        type="email"
                        label="Email"
                        placeholder="john@example.com"
                        {...register("email", {
                            onChange: () => setServerError(""),
                        })}
                        error={errors.email}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter password"
                        {...register("password", {
                            onChange: () => setServerError(""),
                        })}
                        error={errors.password}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm password"
                        {...register("confirmPassword", {
                            onChange: () => setServerError(""),
                        })}
                        error={errors.confirmPassword}
                    />

                    {serverError && (
                        <p className="text-center text-sm font-medium text-red-500">
                            {serverError}
                        </p>
                    )}

                    <div className="pt-2">
                        <AuthButton disabled={isSubmitting}>
                            {isSubmitting
                                ? "Creating Account..."
                                : "Create Account"}
                        </AuthButton>
                    </div>
                </form>

                <Divider />

                <GoogleButton />

                <AuthFooter
                    text="Already have an account?"
                    linkText="Sign In"
                    to="/login"
                />
            </div>
        </AuthLayout>
    );
};

export default Signup;