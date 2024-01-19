


"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import './index.css'
import { CiSearch } from 'react-icons/ci'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation'

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [product, setProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isFocused, setFocused] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const route = useRouter();

    useEffect(() => {
        if (query.trim() !== "") {
            axios.get(`/api/products?query=${query}`)
                .then(function (response) {
                    setProduct(response.data.products);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [query]);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleSearch = () => {
        console.log(query);
    };

    const handleClickItem = () => {
        // console.log(id);
        setQuery("");
        setFocused(false);
        // setShowResults(true);
        // route.push(`/product/${id}`);
    }

    const handleDocumentClick = (e) => {
        // Ẩn kết quả khi click vào bất kỳ nơi nào trên trang ngoại trừ input
        if (!e.target.closest(".navbar_search")) {
            setFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, []);

    return (
        <div className="navbar_search">
            <input
                type="search"
                name='search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleFocus}
                autoComplete='off'
                placeholder="Nhập tên sản phẩm..."
                className="search-field"
            />
            <button onClick={handleSearch} className="search-btn">
                <CiSearch />
            </button>
            {isFocused && query.trim() !== "" && (
                <div className='search_result'>
                    {product.length > 0 ? product.map((pro, i) => (
                        <Link href={`/product/${pro.id}`} key={i} onClick={handleClickItem} style={{ textDecoration: "none", color: "black" }}>
                            <div className='result-item'>
                                <img className='img-item' src={pro.imageUrl} alt={pro.name} width={52} height={60} />
                                <div className='wrap-item'>
                                    <div className='name-product-item' >
                                        {pro.name}
                                    </div>
                                    <div className='des-product-item'>
                                        {pro.shortDescription}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : (
                        <div className='des-product-item'>Không có sản phẩm phù hợp.</div>
                    )}
                </div>
            )}
        </div>
    );
};



export default SearchBar;