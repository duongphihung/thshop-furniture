"use client"
import React from "react";
import { useState, useEffect } from 'react';
import Link from "next/link"
import "./pageProduct.css"
import { PiFunnelLight } from "react-icons/pi";
import ProductItem from "../../components/productitem/ProductItem"
import Filter from "../../components/filter/Filter"

import { Button, Popover } from 'antd';
import Loading from "@/app/components/loading/Loading";
import { useSearchParams } from 'next/navigation'

const content = (
    <div>
        <Filter />
    </div>
);

const PageProduct = () => {
    const [data, setData] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const searchParams = useSearchParams()
    const page = searchParams.get('page');
    const [pages, setPages] = useState(page);

    const fetchProducts = () => {
        fetch(`/api/products?page=${pages}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
                setProducts(data.products);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchProducts();
    }, [pages]);

    if (isLoading || !data || !data.products || data.products.length === 0) {
        return <div className="loading-main"><div className="loading-wrap"><Loading /></div></div>;
    }

    return (
        <div className="page-product">

            <div className="icon-funnel-filter">
                <Popover
                    placement="rightTop"
                    content={content}
                    title="Filter"
                    trigger="click"
                >
                    <PiFunnelLight className="btn-icon-filter" />
                </Popover>
            </div>
            <div className="sidebar">
                <h1>Bộ lọc</h1>
                <div className="pro-filter">
                    <Filter products={products} setProducts={setProducts} setLoading={setLoading} />
                </div>
            </div>

            <div className="griddot">
                {products.map((product, index) => {
                    return (<ProductItem product={product} key={index} index={index} />)
                })}
            </div>
        </div>
    )
}

export default PageProduct