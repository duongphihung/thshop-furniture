"use client"
import Link from "next/link"
import "./paysucceed.css"
import { addToCart, removeFromCart, resetCart } from '@/app/redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "next/navigation";

const PaySucceed = ({ params }) => {
    let payMethod = params.payReturn;
    console.log(payMethod);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const dispatch = useDispatch();
    if (id) {
        dispatch(resetCart());
    }
    return (
        <div className="paysucceed-container">
            <img src="/icon-delivery.jpg" alt="img" className="paysucceed-img" />
            <p>Đơn hàng của bạn đã được đặt hàng thành công!</p>
            <p>Cảm ơn bạn đã đặt hàng tại THShop!</p>
            <Link href="/">Quay lại trang chủ</Link>
        </div>
    )
}

export default PaySucceed