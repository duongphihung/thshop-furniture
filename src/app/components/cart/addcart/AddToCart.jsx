'use client'
import "./addtocart.css"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import { addToCart } from '@/app/redux/slices/cartSlice';
import { AiOutlineShoppingCart } from "react-icons/ai";

const AddToCart = ({
    product,
    showQty = true,
    redirect = false,
    increasePerClick = false,
    type = "",
}) => {
    const dispatch = useDispatch()

    const cartItems = useSelector((state) => state.cartItems);
    const router = useRouter()
    const [qty, setQty] = useState(1);
    const [selectedQty, setSelectedQty] = useState(1);

    const selectQuantity = (e) => {
        let countInStock = product.quantity !== null ? product.quantity : 1;
        if (increasePerClick) {
            const existItem = cartItems.find((x) => x.id === product.id)
            if (existItem) {
                if (existItem.qty + 1 <= countInStock) {
                    setSelectedQty(existItem.qty + Number(e.target.value));
                    console.log(existItem.qty + Number(e.target.value));
                } else {
                    return alert('No more product exist')
                }
            }
        }
    }

    const addToCartHandler = () => {
        let newQty = qty;
        let countInStock = product.quantity !== null ? product.quantity : 1;
        if (increasePerClick) {
            const existItem = cartItems.find((x) => x.id === product.id)
            if (existItem) {
                if (existItem.qty + 1 <= countInStock) {
                    newQty = existItem.qty + qty;
                } else {
                    return alert('No more product exist')
                }
            }
        }
        dispatch(addToCart({ ...product, qty: newQty }));
        setQty(1);

        if (redirect) router.push('/cart');
    }

    const incrementCartHandler = () => {
        setQty(qty + 1);
    }

    const decrementCartHandler = () => {
        if (qty === 1) {
            setQty(1);
        } else {
            setQty(qty - 1);
        }
    }

    return (type == "detail" ? (
        <>
            <div>
                {/* <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                >
                    {[...Array(Number(product.quantity)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                            {x + 1}
                        </option>
                    ))}
                </select>{' '} */}
                <div className="pro-price-container">
                    <button className="btn-add-price" onClick={decrementCartHandler}>-</button>
                    <p className="pro-amount">{qty}</p>
                    <button className="btn-minus-price" onClick={incrementCartHandler}>+</button>
                </div>
            </div>
            <button className="btn" onClick={addToCartHandler}>
                Thêm vào giỏ hàng
                <AiOutlineShoppingCart />
            </button>
        </>) :
        (<button className="btn-action" onClick={addToCartHandler}>
            <AiOutlineShoppingCart className="product_btn-icon" />
        </button>)
    )
}
export default AddToCart;