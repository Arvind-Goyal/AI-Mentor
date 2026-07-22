const AuthLayout = ({ children }) => {
    return (
        <div className="relative  overflow-hidden bg-[#F8FAFF]">

            {/* Purple Glow */}
            <div className="absolute -top-52 -left-44 h-[550px] w-[550px] rounded-full bg-purple-300/40 blur-[140px]" />

            {/* Blue Glow */}
            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-[140px]" />

            {/* Small floating blob */}
            <div className="absolute top-1/3 right-1/4 h-32 w-32 rounded-full bg-violet-200/40 blur-3xl" />

            <div className="relative z-10 flex min-h-screen min-w-screen items-center justify-center px-6 py-12">

                {children}

            </div>

        </div>
    );
};

export default AuthLayout;