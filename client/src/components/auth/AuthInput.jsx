const AuthInput = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white/70
                    px-4
                    py-3
                    text-slate-900
                    placeholder:text-slate-400
                    outline-none
                    transition-all
                    duration-200
                    focus:border-violet-500
                    focus:ring-4
                    focus:ring-violet-500/10
                "
            />
        </div>
    );
};

export default AuthInput;