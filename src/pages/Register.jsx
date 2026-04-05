import { Link } from "react-router-dom";

import RegisterForm from "./../components/RegisterForm";
import AuthenticationRightSide from "./../components/AuthenticationRightSide";

const Register = () => {
    return (
        <div className="flex flex-col lg:flex-row w-full h-screen z-10 relative">
            <RegisterForm></RegisterForm>
            <AuthenticationRightSide></AuthenticationRightSide>
        </div>
    );
};

export default Register;
