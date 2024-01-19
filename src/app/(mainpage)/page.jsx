"use client"
import React from "react";
import { useState, useEffect } from 'react';
import BlogItem from "../components/blogitem/BlogItem";
import Categories from "../components/categories/Categories";
import ProductItem from "../components/productitem/ProductItem";
import Slide from "../components/slide/Banner";
import Testimonial from "../components/testimonial/Testimonial";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import styles from "./homepage.module.css";

import { blogs } from "../data/data";
import Loading from "../components/loading/Loading";


export default function Home() {
  const [data, setData] = useState({});
  const [products, setProduct] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setProduct(data.products);
        setLoading(false);
      })
  }

  const fetchProductSales = () => {
    fetch('/api/discounts')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.discounts);
        setProductSales(data.discounts);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchProducts();
    fetchProductSales();
  }, []);

  return (
    <div>
      <Slide />
      <Categories />
      <div className={styles.productMain}>
        <h2 className={styles.contentProduct}>Sản phẩm mới</h2>
        <div className={styles.productGrid}>
          {products.map((product, index) => {
            return (<ProductItem product={product} key={index} index={index} />)
          })}
        </div>
      </div>

      <div className={styles.productMain}>
        <h2 className={styles.contentProduct}>Đang giảm giá</h2>
        <div className={styles.productGrid}>
          {productSales.map((product, index) => {
            return (<ProductItem product={product} key={index} index={index} />)
          })}
        </div>
      </div>

      <div className={styles.testimonial}>
        <Testimonial />
      </div>

      <div className={styles.blog}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            1280: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          modules={[Pagination]}
        >
          {
            blogs.map(blog => (
              <SwiperSlide key={blog.id}><BlogItem props={blog}/></SwiperSlide>
            ))
          }
        </Swiper>
      </div>

    </div>
  )
}
