import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
    label,
    placeholder,
}) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2">

            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>

            <div className="relative">

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white/70
                        px-4
                        py-3
                        pr-12
                        outline-none
                        transition
                        focus:border-violet-500
                        focus:ring-4
                        focus:ring-violet-500/10
                    "
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                    {showPassword ? (
                        <FiEyeOff />
                    ) : (
                        <FiEye />
                    )}
                </button>

            </div>

        </div>
    );
};

export default PasswordInput;