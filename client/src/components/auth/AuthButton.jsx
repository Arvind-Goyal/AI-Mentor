const AuthButton = ({
    children,
    type = "submit",
    disabled = false,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            {...props}
            className={`
                w-full
                rounded-xl
                py-3.5
                font-semibold
                text-white
                transition-all
                duration-300

                ${
                    disabled
                        ? "cursor-not-allowed bg-slate-400"
                        : `
                            bg-gradient-to-r
                            from-violet-600
                            to-indigo-600
                            hover:-translate-y-0.5
                            hover:shadow-lg
                            hover:shadow-violet-500/25
                            active:translate-y-0
                          `
                }
            `}
        >
            {children}
        </button>
    );
};

export default AuthButton;