const AuthButton = ({
    children,
    type = "submit",
}) => {
    return (
        <button
            type={type}
            className="
                w-full
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                py-3.5
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
                hover:shadow-violet-500/25
                active:translate-y-0
            "
        >
            {children}
        </button>
    );
};

export default AuthButton;