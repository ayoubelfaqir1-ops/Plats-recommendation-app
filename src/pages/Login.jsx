import LoginForm from "./../components/LoginForm";
import AuthenticationRightSide from "./../components/AuthenticationRightSide";

const Login = () => {
    return (
        <div className="flex flex-col lg:flex-row w-full h-screen z-10 relative">
            <LoginForm></LoginForm>
            <AuthenticationRightSide></AuthenticationRightSide>
        </div>
    );
};

export default Login;
