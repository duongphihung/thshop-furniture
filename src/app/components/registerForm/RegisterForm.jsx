"use client"
import Link from "next/link"
import "./registerForm.css"
import { redirect, useRouter } from 'next/navigation';
import axios from "axios";

const RegisterForm = () => {
    const router = useRouter();
    const handleSignUp = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const { data } = await axios.post('/api/auth/register', (formData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(data);
            if (data.success == true) {
                router.push('/login');
            }
        } catch (error) {
            console.error("An error occurred during the fetch operation:", error);
        }
    }
    return (
        <div className="register-container">
            <div className="register-title">Đăng ký tài khoản</div>
            <form onSubmit={handleSignUp}>
                <div className="register-details">
                    <input type="text" name="role" defaultValue="Credentials user" hidden />
                    <div className="input-box">
                        <span className="details">Họ</span>
                        <input type="text" name="firstname" placeholder="Enter your firstname" className="" />
                    </div>
                    <div className="input-box">
                        <span className="details">Tên</span>
                        <input type="text" name="lastname" placeholder="Enter your lastname" className="" />
                    </div>
                    <div className="input-box">
                        <span className="details">Email</span>
                        <input type="email" placeholder="Enter your email" name="email" required className="" />
                    </div>
                    <div className="input-box">
                        <span className="details">Số điện thoại</span>
                        <input type="text" name="phone" placeholder="Enter your number" className="" />
                    </div>
                    <div className="input-box">
                        <span className="details">Mật khẩu</span>
                        <input type="password" placeholder="Enter your password" name="password" required className="" />
                    </div>
                    <div className="input-box">
                        <span className="details">Xác nhận mật khẩu</span>
                        <input type="password" placeholder="Comfirm your password" name="comfirmPassword" required className="" />
                    </div>
                </div>

                <div className="register-btn">
                    <input type="submit" value="Đăng ký" />
                </div>

                <div className="text">
                    <span>Đã có tài khoản?</span>
                    <Link href="/login" className="link-login">
                        <span>Đăng nhập ngay</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm