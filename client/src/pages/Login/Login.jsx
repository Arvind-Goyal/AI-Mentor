import AuthLayout from "../../components/auth/AuthLayout";

const Login = () => {
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue learning."
        >
            <p className="text-center text-gray-400">
                Login Form Here
            </p>
        </AuthLayout>
    );
};

export default Login;