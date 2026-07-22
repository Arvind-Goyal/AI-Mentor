import { Link } from "react-router-dom";

const AuthFooter = ({
    text,
    linkText,
    to,
}) => {
    return (
        <p className="mt-8 text-center text-sm text-slate-500">

            {text}

            <Link
                to={to}
                className="ml-2 font-semibold text-violet-600 hover:underline"
            >
                {linkText}
            </Link>

        </p>
    );
};

export default AuthFooter;