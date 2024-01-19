'use client'
import "./pageCart.css";
import { addToCart, removeFromCart, incrementQuantity, decrementQuantity, setPrice } from '@/app/redux/slices/cartSlice';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from "@/app/utils/index"
import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const CartPage = () => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch()
    const router = useRouter()
    const cartItems = useSelector((state) => state.cartItems);
    const itemsPrice = useSelector((state) => state.itemsPrice * 1000);
    const tax = itemsPrice * 0.05;
    const [coupon, setCoupon] = useState("");
    const [couponCheck, setCouponCheck] = useState("");
    const [priceCoupon, setPriceCoupon] = useState(0);
    const [total, setTotal] = useState(itemsPrice + tax);
    console.log(cartItems);


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const handleUseCoupon = () => {
        console.log(couponCheck);
        axios.patch(`/api/coupons`, JSON.stringify({ coupon: couponCheck }))
            .then(function (response) {
                console.log(response);
                setCoupon(response.data.coupon);
                const price = ((itemsPrice + tax) * Number(response.data.coupon.coupon)) / 100;
                console.log(price);
                console.log((itemsPrice + tax) - price);
                setPriceCoupon(price);
                setTotal((itemsPrice + tax) - price);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const handleCheckout = () => {
        dispatch(setPrice(priceCoupon));
        // console.log(total);
        router.push("cart/checkout")
    }

    const changeCoupon = (e) => {
        const value = e.target.value;
        setCouponCheck(value);
    }

    return (
        <div className="cart-page-container">
            <h1 className="shopping-cart-title">Giỏ hàng của bạn</h1>
            <div className="shopping-cart-top">
                <button className="shopping-cart-continute"><Link href="/">Tiếp tục mua</Link></button>
                <p>Giỏ hàng({cartItems.length > 0 ? cartItems.length : 0})</p>
                {/* <button className="shopping-cart-checkout">Xác nhận đặt hàng</button> */}
            </div>
            <div className="shopping-cart-bot">
                <div className="shopping-cart-info">
                    {cartItems.length > 0 ? cartItems.map((item, i) => {
                        return (
                            <div className="shopping-cart-product" key={i}>
                                <div className="cart-product-detail">
                                    <img src={item.imageUrl} alt={item.name} className="cart-pro-img" />
                                    <div className="pro-detail">
                                        <div className="pro-name"><b>Tên sản phẩm:</b> {item.name}</div>
                                        {/* <div className="pro-id"><b>ID:</b> 69</div> */}
                                        <div className="pro_price"><b>Giá tiền:</b> {formatCurrency(item.price * 1000)}</div>
                                    </div>
                                </div>
                                <div className="pro-price">
                                    <div className="pro-price-container">
                                        <button className="btn-add-price" onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                                        <p className="pro-amount">{item.qty}</p>
                                        <button className="btn-minus-price" onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                                    </div>
                                    {/* <p className="pro-total-price">$69</p> */}
                                </div>
                                <button className="pro-btn-remove" onClick={() => removeFromCartHandler(item.id)}>
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        )
                    }) : <Typography>Chưa có sản phẩm nào</Typography>}

                </div>
                <div className="shopping-cart-summary">
                    <h1 className="summary-title">Thông tin đơn hàng</h1>
                    <div className="code-sale-container">
                        <input type="text" placeholder="Nhập mã giảm giá" name="code" onChange={(e) => changeCoupon(e)} className="sale-input" />
                        <button className="sale-btn" onClick={() => handleUseCoupon()}>Áp dụng</button>
                    </div>
                    <div className="summary-item">
                        <div className="summary-item-text">Tạm tính</div>
                        <div className="summary-item-price">{formatCurrency(itemsPrice)}</div>
                    </div>
                    <div className="summary-item">
                        <div className="summary-item-text">Thuế (5%)</div>
                        <div className="summary-item-price">{formatCurrency(tax)}</div>
                    </div>
                    {coupon !== "" ? (<div className="summary-item">
                        <div className="summary-item-text">Mã giảm giá ({coupon.coupon}%)</div>
                        <div className="summary-item-price">{formatCurrency(priceCoupon)}</div>
                    </div>) : ""}

                    <div className="summary-item total">
                        <div className="summary-item-text">Tổng tiền</div>
                        <div className="summary-item-price">{coupon !== "" ? formatCurrency(total) : formatCurrency(itemsPrice + tax)}</div>
                    </div>

                    <button className="summary-btn-checkout" onClick={handleCheckout}>
                        Xác nhận đặt hàng
                    </button>
                </div>
            </div>
        </div>

    );
}
export default CartPage;