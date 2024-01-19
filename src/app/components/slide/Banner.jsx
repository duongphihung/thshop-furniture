"use client"
import Image from "next/image"

import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import "./banner.css"

import Link from "next/link"

const Banner = () => {
    return (
        <div className="banner">
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="slider-container "
            >
                <SwiperSlide>
                    <div className="slider-item">
                        <img src="/banner/banner1.jpg" alt="banner1" className="banner-img"/>
                        <div className="banner-content">
                            <p className="banner-subtitle">Nội thất hiện đại</p>
                            <h2 className="banner-title">Đem lại sự thoải mái cho bạn</h2>

                            <Link href="#" className="banner-btn">Mua ngay</Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slider-item">
                        <img src="/banner/banner2.jpg" alt="banner1" className="banner-img"/>
                        <div className="banner-content">
                            <p className="banner-subtitle">Nội thất hiện đại</p>
                            <h2 className="banner-title">Đem lại sự thoải mái cho bạn</h2>

                            <Link href="#" className="banner-btn">Mua ngay</Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slider-item">
                        <img src="/banner/banner4.jpg" alt="banner1" className="banner-img"/>
                        <div className="banner-content">
                            <p className="banner-subtitle">Nội thất hiện đại</p>
                            <h2 className="banner-title">Đem lại sự thoải mái cho bạn</h2>

                            <Link href="#" className="banner-btn">Mua ngay</Link>
                        </div>
                    </div>
                </SwiperSlide>  
            </Swiper>
        </div>
    )
}

export default Banner