import { forwardRef } from "react";

const AuthInput = forwardRef(
    (
        {
            label,
            type = "text",
            placeholder,
            error,
            ...props
        },
        ref
    ) => {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                    {label}
                </label>

                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    className={`
                        w-full
                        rounded-xl
                        border
                        bg-white/70
                        px-4
                        py-3
                        text-slate-900
                        placeholder:text-slate-400
                        outline-none
                        transition-all
                        duration-200
                        focus:ring-4
                        ${
                            error
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10"
                        }
                    `}
                    {...props}
                    ref={ref}
                />

                {error && (
                    <p className="text-sm text-red-500">
                        {error.message}
                    </p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;