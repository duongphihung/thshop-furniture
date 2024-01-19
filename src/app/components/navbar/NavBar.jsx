"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import './navbar.css';
import SearchBar from '../searchbar/SearchBar';

// react icon
import { AiTwotoneHome } from 'react-icons/ai'
import { FaRegHeart, FaRegUser } from 'react-icons/fa6'
import { IoCreateOutline, IoDocumentTextOutline, IoGridOutline, IoLogInOutline } from 'react-icons/io5'
import { HiOutlineHome, HiOutlineMenu } from "react-icons/hi";
import { FiHome, FiLogIn, FiLogOut } from "react-icons/fi";
import { GrCart } from "react-icons/gr";


// CSSTransition
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Library & Config
import { signOut, useSession, getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Popper, Box, Paper, Typography, Fade, Button } from '@mui/material';
import { hideLoading } from '@/app/redux/slices/cartSlice';
import Cart from "@/app/components/cart/Cart";
import { BsClipboardData } from 'react-icons/bs'
import axios from 'axios'

const NavBar = () => {
    const { data: session, status } = useSession({
        // required: true,
        // onUnauthenticated() {
        //     redirect('/login');
        // }
    });

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartItems);
    // console.log(cartItems);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="navbar">
                <div className="navbar-top">
                    <div className="navbar-container">
                        <div className="navbar-intro">
                            <div className="logo">
                                <Link href="/" className="logo-th">
                                    <AiTwotoneHome />THShop
                                </Link>
                            </div>
                            <SearchBar></SearchBar>
                            <div className="navbar-icons">
                                <Link href="/" className="action-btn">
                                    <FaRegHeart className='icon' />
                                    <span className="count">0</span>
                                </Link>
                                <Cart></Cart>
                                {!session ?
                                    (<Link href="/login" className="action-btn">
                                        <FiLogIn className='icon' />
                                    </Link>)
                                    : (<div className="action-btn">
                                        <FaRegUser className='icon icon-user' />
                                        <div className="user-list">
                                            <div className="user-name">Xin chào! <span className="user-name-color">{session.user.name}</span></div>
                                            {session.user.role === "admin" ?
                                                (<Link href="/admin/dashboard" className="user-item">
                                                    <BsClipboardData />
                                                    Quản lý
                                                </Link>) : ""}
                                            <Link href="/profile" className="user-item">
                                                <IoDocumentTextOutline />
                                                Hồ sơ
                                            </Link>
                                            <Link href="#" onClick={() => signOut({ redirect: true, callbackUrl: '/login' })} className="user-item">
                                                <FiLogOut />
                                                Đăng xuất
                                            </Link>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar-bottom">
                    <ul className="desktop-menu-category-list">
                        <li className="menu-category">
                            <Link href="/" className="menu-title">TRANG CHỦ</Link>
                        </li>
                        <li className="menu-category">
                            <Link href="/product" className="menu-title">SẢN PHẨM</Link>
                        </li>
                        <li className="menu-category">
                            <Link href="/blog" className="menu-title">BÀI VIẾT</Link>
                        </li>
                        <li className="menu-category">
                            <Link href="/about" className="menu-title">THSHOP</Link>
                        </li>
                        <li className="menu-category">
                            <Link href="/contact" className="menu-title">LIÊN HỆ</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="navbar-mobile">
                <button href="/" className="action-btn" onClick={toggleMenu}>
                    <HiOutlineMenu />
                </button>
                <Link href="/" className="action-btn">
                    <FaRegHeart className='icon' />
                    <span className="count">0</span>
                </Link>
                <Link href="/" className="action-btn">
                    <FiHome />
                </Link>
                <Link href="/cart" className="action-btn">
                    <GrCart className='icon' />
                    <span className="count">{cartItems.reduce((a, c) => a + c.qty, 0)}</span>
                </Link>
                <Link href="/" className="action-btn">
                    <FaRegUser className='icon' />
                </Link>
            </div>
            <CSSTransition in={isMenuOpen} classNames="menu-overlay" timeout={300} >
                <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
            </CSSTransition>
            <CSSTransition in={isMenuOpen} classNames="menu" timeout={300} >
                <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                    <h3>Menu</h3>
                    <Link href="/" className="mobile-menu-title">TRANG CHỦ</Link>
                    <Link href="/product" className="mobile-menu-title">SẢN PHẨM</Link>
                    <Link href="/blog" className="mobile-menu-title">BÀI VIẾT</Link>
                    <Link href="/about" className="mobile-menu-title">THSHOP</Link>
                    <Link href="/contact" className="mobile-menu-title">LIÊN HỆ</Link>
                </div>
            </CSSTransition>
        </>
    )
}

export default NavBar