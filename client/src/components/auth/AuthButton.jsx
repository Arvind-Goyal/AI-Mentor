const AuthButton = ({ children }) => {
    return (
        <button
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
                hover:scale-[1.02]
                hover:shadow-lg
                hover:shadow-violet-500/25
                active:scale-95
            "
        >
            {children}
        </button>
    );
};

export default AuthButton;