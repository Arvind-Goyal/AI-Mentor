import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { signup, login } from "../../../api/auth";
import { useAuth } from "../../../context/AuthContext";

const AuthPanel = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (isSignup && !formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }

    // Signup-specific validation
    if (isSignup) {
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    try {
      setLoading(true);

      if (isSignup) {
        const response = await signup({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });

        loginUser(response.user);

        toast.success("Account created successfully!");

        navigate("/dashboard");
      } else {
        const response = await login({
          email: formData.email.trim(),
          password: formData.password,
        });

        loginUser(response.user);

        toast.success("Welcome back!");

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Authentication error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-[0_25px_70px_rgba(99,67,180,0.18)] backdrop-blur-xl">

      {/* Top switch */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600">
          <Sparkles size={16} />
          AI DSA Mentor
        </div>

        <div className="flex rounded-full bg-slate-100 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-full px-4 py-2 font-medium transition ${
              isSignup
                ? "bg-white text-purple-600 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-full px-4 py-2 font-medium transition ${
              !isSignup
                ? "bg-white text-purple-600 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Heading */}
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
          <Sparkles size={22} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          {isSignup ? "Create your account" : "Welcome back"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {isSignup
            ? "Start your journey to master DSA with AI"
            : "Continue your journey with your AI mentor"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        {isSignup && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        {isSignup && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                disabled={loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Forgot Password */}
        {!isSignup && (
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-purple-200 transition hover:scale-[1.01] hover:shadow-purple-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {loading
            ? "Please wait..."
            : isSignup
              ? "Create Account"
              : "Sign In"}

          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      {/* Bottom */}
      <p className="mt-6 text-center text-sm text-slate-500">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("login")}
              disabled={loading}
              className="font-semibold text-purple-600 hover:text-purple-700"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              disabled={loading}
              className="font-semibold text-purple-600 hover:text-purple-700"
            >
              Create one
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthPanel;