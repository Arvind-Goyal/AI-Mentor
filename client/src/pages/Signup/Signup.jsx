import AuthLayout from "../../components/auth/AuthLayout";

const Signup = () => {
    return (
        <AuthLayout>

            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-10 shadow-xl">

                {/* Logo */}

                <div className="mb-10 flex justify-center">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-lg font-bold text-white">

                            AI

                        </div>

                        <span className="text-2xl font-bold text-slate-900">

                            LeetCode AI

                        </span>

                    </div>

                </div>

                <h1 className="text-center text-4xl font-bold text-slate-900">

                    Create Account

                </h1>

                <p className="mt-3 text-center text-slate-500">

                    Let's get you started.

                </p>

            </div>

        </AuthLayout>
    );
};

export default Signup;