
"use client"
import LoginForm from "../../components/loginForm/LoginForm";
import "./login.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    if(session) {
        router.push('/');
    }
    return (
        <div className="login-form">
            <LoginForm />
        </div>
    )
}

export default Login;