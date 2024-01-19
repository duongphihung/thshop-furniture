"use client"
import "./cart.css"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Popper, Box, Paper, Typography, Fade, Button } from '@mui/material';
import { GrCart } from "react-icons/gr";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { addToCart, removeFromCart, incrementQuantity, decrementQuantity } from '@/app/redux/slices/cartSlice';
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems);
    const itemsPrice = useSelector((state) => state.itemsPrice);


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const dispatch = useDispatch();

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    return (
        <div>
            <button aria-describedby={id} className="action-btn" onClick={handleClick}>
                <GrCart className='icon' />
                <span className="count">{cartItems.reduce((a, c) => a + c.qty, 0)}</span>
            </button>
            <Popper
                id={id}
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{ p: 2 }}>
                            {cartItems.length < 1 ?
                                (<Typography component="div">
                                    <img src="/empty_cart.png" className="empty-card-img" />
                                </Typography>)
                                : (
                                    <>
                                        <div className="cart-wrapper">
                                            {cartItems.map((item, index) => {
                                                const countInStock = item.quantity !== null ? parseInt(item.quantity) : 1;
                                                return (

                                                    <Card sx={{ maxWidth: 345 }} key={item.id} className="cart-card">
                                                        <CardMedia
                                                            sx={{ height: 140 }}
                                                            image={item.imageUrl}
                                                            title="green iguana"
                                                            className="cart-product-img"
                                                        />
                                                        <CardContent>
                                                            <Typography component="div">
                                                                {item.name}
                                                            </Typography>
                                                            <div className="cart-wrapper-option">
                                                                <div className='cart-group-btn'>
                                                                    <button className="cart-btn-add" onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                                                                    <p>{item.qty}</p>
                                                                    <button className="cart-btn-minus" onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                                                                </div>
                                                                <CardActions>
                                                                    <Button onClick={(e) => removeFromCartHandler(item.id)} className="cart-delete-pro">
                                                                        <FaRegTrashAlt />
                                                                    </Button>
                                                                </CardActions>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                            <Button className="Go-to-cart" variant="contained" href="/cart">
                                Kiểm tra giỏ hàng
                            </Button>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    )
}

export default Cart;