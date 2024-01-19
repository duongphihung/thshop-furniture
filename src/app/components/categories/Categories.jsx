"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import "./categories.css";
import { useState, useEffect } from 'react';

const Categories = () => {

    const [data, setData] = useState({});
    const [categorys, setCategorys] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchCategorys = () => {
        fetch('/api/categorys')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setCategorys(data.categorys);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchCategorys();
    }, []);

    return (
        <div className="category">
            <div className="category-container-item has-scrollbar">
                {categorys ? categorys.map((item, index) => {
                    return (
                        <div className="category-item" key={index}>
                            <div className="category-img-box">
                                <Image src={item.icon} alt={item.name} width={30} height={30} />
                            </div>
                            <div className="category-content-box">
                                <div className="category-content-flex">
                                    <h3 className="category-item-title">{item.name}</h3>

                                    <p className="category-item-amount">({item.products.length})</p>
                                </div>

                                <Link href={`/product?category="${item.id}"`} className="category-btn">Xem thêm</Link>
                            </div>
                        </div>
                    )
                }) : ""}
            </div>
        </div>
    )
}

export default Categories