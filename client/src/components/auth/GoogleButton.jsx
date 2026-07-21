import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
    return (
        <button
            className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-white
                py-3
                font-medium
                transition
                hover:bg-slate-50
            "
        >
            <FcGoogle size={22} />

            Continue with Google
        </button>
    );
};

export default GoogleButton;