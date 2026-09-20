import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthButton from "../../components/auth/AuthButton";
import AuthFooter from "../../components/auth/AuthFooter";
import { requestPasswordReset, resetPassword } from "../../api/auth";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState("request");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRequest = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Please enter the email linked to your account.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await requestPasswordReset(email.trim());
            setToken(response.resetToken || "");
            setStep("reset");
            setMessage(response.message || "Reset token generated. Set your new password.");
            toast.success("Reset token ready! Please set your new password.");
        } catch (requestError) {
            const errMsg = requestError.response?.data?.message || "Failed to initiate password reset.";
            setError(errMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        if (!token.trim()) {
            setError("Reset token is required.");
            return;
        }

        if (password.length < 6) {
            setError("Your new password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await resetPassword(token.trim(), password);
            setMessage(response.message || "Password updated successfully!");
            toast.success("Password updated successfully! You can now log in.");
            setStep("complete");
        } catch (resetError) {
            const errMsg = resetError.response?.data?.message || "That reset token is invalid or expired.";
            setError(errMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/85 p-8 shadow-2xl shadow-violet-200/40 backdrop-blur-xl sm:p-10">
                <Link
                    to="/login"
                    className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 transition hover:text-violet-900"
                >
                    <ArrowLeft size={14} /> Back to Sign In
                </Link>

                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
                        <KeyRound size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">AI DSA Mentor</p>
                        <p className="text-xs text-slate-500">Change / Reset Password</p>
                    </div>
                </div>

                <div className="mt-7">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        {step === "complete"
                            ? "Password Changed!"
                            : step === "reset"
                            ? "Set New Password"
                            : "Reset Your Password"}
                    </h1>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        {step === "complete"
                            ? "Your account password has been updated. You can now sign in."
                            : step === "reset"
                            ? "Enter and confirm your new secure password."
                            : "Enter your registered email address to change your password."}
                    </p>
                </div>

                {step === "request" && (
                    <form onSubmit={handleRequest} className="mt-7 space-y-4">
                        <AuthInput
                            label="Email Address"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
                        <div className="pt-2">
                            <AuthButton disabled={isSubmitting}>
                                {isSubmitting ? "Verifying..." : "Continue to Change Password"}
                            </AuthButton>
                        </div>
                    </form>
                )}

                {step === "reset" && (
                    <form onSubmit={handleReset} className="mt-7 space-y-4">
                        {token ? (
                            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 text-xs text-emerald-800">
                                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                                <span>Reset token ready for <strong>{email}</strong></span>
                            </div>
                        ) : (
                            <AuthInput
                                label="Reset Token"
                                placeholder="Paste your reset token"
                                value={token}
                                onChange={(event) => setToken(event.target.value)}
                            />
                        )}

                        <PasswordInput
                            label="New Password"
                            placeholder="At least 6 characters"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <PasswordInput
                            label="Confirm New Password"
                            placeholder="Repeat new password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                        {message && <p className="rounded-xl bg-violet-50 px-3 py-2 text-xs text-violet-700">{message}</p>}
                        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
                        <div className="pt-2">
                            <AuthButton disabled={isSubmitting}>
                                {isSubmitting ? "Changing Password..." : "Change Password Now"}
                            </AuthButton>
                        </div>
                    </form>
                )}

                {step === "complete" && (
                    <div className="mt-7 space-y-4 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                            <CheckCircle2 size={24} />
                        </div>
                        <p className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 font-medium">
                            {message}
                        </p>
                        <Link
                            to="/login"
                            className="inline-block w-full rounded-2xl bg-violet-600 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-violet-700"
                        >
                            Sign In with New Password
                        </Link>
                    </div>
                )}

                {step !== "complete" && (
                    <div className="mt-6">
                        <AuthFooter text="Remember your password?" linkText="Sign In" to="/login" />
                    </div>
                )}
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
