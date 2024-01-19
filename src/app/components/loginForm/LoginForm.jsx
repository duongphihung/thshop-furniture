"use client";

import Link from "next/link"
import "./loginForm.css"
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { redirect } from "next/navigation";

// icon
import { FaFacebookSquare, FaGithub } from "react-icons/fa";
import { FcGoogle, } from "react-icons/fc";

const LoginForm = () => {
    const router = useRouter();
    const path = usePathname();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signInResponse = await signIn("credentials", {
            email: e.target.email.value,
            password: e.target.password.value,
            redirect: true,
            callbackUrl: "/"
        });
        if (signInResponse) redirect("/");
    }

    const loginGithub = () => {
        signIn('github', { redirect: true, callbackUrl: "/" });
    }

    const loginGoogle = () => {
        signIn('google', { redirect: true, callbackUrl: "/" });
    }

    const loginFacebook = () => {
        signIn('facebook', { redirect: true, callbackUrl: "/" });
    }

    return (
        <div className="login-container">
            {error && (
                <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
                    {error}
                </span>
            )}
            <div className="login-title">Đăng nhập</div>
            <form onSubmit={handleSubmit}>
                <div className="login-details">
                    <div className="input-box">
                        <span className="details">Email</span>
                        <input type="email" id="email" placeholder="Nhập email tài khoản của bạn" name="email" required className="" />
                    </div>
                    <div className="input-box">
                        <span className="details">Mật khẩu</span>
                        <input type="password" id="password" placeholder="Nhập mật khẩu của bạn" name="password" required className="" />
                    </div>
                </div>
                <div className="login-btn">
                    <input type="submit" value="Đăng nhập" />
                </div>
            </form>
            <div className="login-text">
                <span>Chưa đăng ký tài khoản?</span>
                <Link href="/register" className="link-register">
                    <span>Đăng ký ngay</span>
                </Link>
            </div>
            <p className="login-with">or</p>
            <button className="login-with-github" onClick={loginGithub}>
                <FaGithub />
                Đăng nhập với GitHub
            </button>
            <button className="login-with-facebook" onClick={loginFacebook}>
                <FaFacebookSquare />
                Đăng nhập với Facebook
            </button>
            <button className="login-with-google" onClick={loginGoogle}>
                <FcGoogle />
                Đăng nhập với Google
            </button>
        </div>
    )
}

export default LoginForm