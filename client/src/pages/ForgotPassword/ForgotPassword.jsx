import { useState } from "react";
import { Link } from "react-router-dom";

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
            setError("Enter the email linked to your account.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await requestPasswordReset(email.trim());
            setToken(response.resetToken || "");
            setStep("reset");
            setMessage(response.message);
        } catch (requestError) {
            setError(requestError.response?.data?.message || "We could not start the reset flow.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

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
            setMessage(response.message);
            setStep("complete");
        } catch (resetError) {
            setError(resetError.response?.data?.message || "That reset link is invalid or expired.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/85 p-8 shadow-2xl shadow-violet-200/40 backdrop-blur-xl sm:p-10">
                <Link to="/login" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800">
                    <span aria-hidden="true">&#8592;</span> Back to sign in
                </Link>

                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-violet-500/20">AI</div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900">AI DSA Mentor</p>
                        <p className="text-xs text-slate-500">Account recovery</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        {step === "complete" ? "Password updated" : step === "reset" ? "Create a new password" : "Forgot your password?"}
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        {step === "complete" ? "Your account is ready. Sign in with your new password." : step === "reset" ? "Use the reset token from the previous step, then choose a password you will remember." : "Enter your email and we will help you get back to your learning journey."}
                    </p>
                </div>

                {step === "request" && (
                    <form onSubmit={handleRequest} className="mt-8 space-y-5">
                        <AuthInput label="Email" type="email" placeholder="john@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
                        <AuthButton disabled={isSubmitting}>{isSubmitting ? "Preparing reset..." : "Continue"}</AuthButton>
                    </form>
                )}

                {step === "reset" && (
                    <form onSubmit={handleReset} className="mt-8 space-y-5">
                        <AuthInput label="Reset token" placeholder="Paste your reset token" value={token} onChange={(event) => setToken(event.target.value)} />
                        <PasswordInput label="New password" placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <PasswordInput label="Confirm password" placeholder="Repeat your new password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                        {message && <p className="rounded-xl bg-violet-50 px-3 py-2 text-sm leading-5 text-violet-700">{message}</p>}
                        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
                        <AuthButton disabled={isSubmitting}>{isSubmitting ? "Updating password..." : "Update password"}</AuthButton>
                    </form>
                )}

                {step === "complete" && (
                    <div className="mt-8">
                        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>
                        <Link to="/login" className="mt-5 block text-center text-sm font-semibold text-violet-600 hover:text-violet-800">Return to sign in</Link>
                    </div>
                )}

                {step !== "complete" && !message && <AuthFooter text="Remember your password?" linkText="Sign in" to="/login" />}
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
