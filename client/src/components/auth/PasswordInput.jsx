import { useState, forwardRef } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = forwardRef(
  (
    {
      label,
      placeholder,
      error,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            {...props}
            className={`
              w-full
              rounded-2xl
              border
              bg-white/70
              px-4
              py-3.5
              pr-12
              outline-none
              shadow-sm shadow-slate-200/40 transition
              focus:ring-4
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10"
              }
            `}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-violet-600"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;