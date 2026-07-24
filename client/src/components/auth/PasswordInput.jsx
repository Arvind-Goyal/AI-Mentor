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
              rounded-xl
              border
              bg-white/70
              px-4
              py-3
              pr-12
              outline-none
              transition
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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
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