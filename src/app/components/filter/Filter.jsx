"use client"
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import "./filter.css";
import axios from 'axios';


const initFilter = {
    room: "",
    type: "",
    priceTo: 0,
    priceFrom: 9999999,
    color: "",
}

const Filter = ({ products, setProducts, setLoading }) => {
    const [filter, setFilter] = useState(initFilter);

    const selectRoom = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            room: value,
        }));
    };

    const selectColor = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            color: value,
        }));
    };

    const selectType = (value) => {
        setFilter((prevState) => ({
            ...prevState,
            type: value,
        }));
    };

    const selectChangePrice = (value) => {
        let prices = "";
        if (value !== "all") {
            prices = value.split("-");
            setFilter((prevState) => ({
                ...prevState,
                priceFrom: prices[1],
                priceTo: prices[0],
            }));
        } else {
            setFilter((prevState) => ({
                ...prevState,
                priceFrom: "",
                priceTo: "",
            }));
        }
    }
    useEffect(() => {
        // console.log(filter);
        axios.get(`/api/products?room=${filter.room}&type=${filter.type}&color=${filter.color}&priceFrom=${filter.priceFrom}&priceTo=${filter.priceTo}`)
            .then(function (response) {
                console.log(response);
                setProducts(response.data.products);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [filter])


    const handleReset = () => {
        console.log(filter);
        setFilter(initFilter);
    }

    return (
        <div className="filter">
            <div>
                <h3>Vị trí</h3>
                <Select
                    defaultValue={filter.room}
                    fieldNames="room"
                    style={{
                        width: "100%",
                        height: "40px",
                        margin: "0px 0px 20px 0px",
                    }}
                    onChange={selectRoom}
                    options={[
                        {
                            value: '',
                            label: 'Tất cả',
                        },
                        {
                            value: 'living room',
                            label: 'Phòng khách',
                        },
                        {
                            value: 'kitchen',
                            label: 'Phòng bếp',
                        },
                        {
                            value: 'bedroom',
                            label: 'Phòng ngủ',
                        },
                        {
                            value: "work room",
                            label: "Phòng làm việc",
                        }
                    ]}
                />
            </div>

            <div>
                <h3>Loại</h3>
                <Select
                    defaultValue={filter.type !== "" ? filter.type : "Tất cả"}
                    onChange={selectType}
                    fieldNames="type"
                    style={{
                        width: "100%",
                        height: "40px",
                        margin: "0px 0px 20px 0px"

                    }}
                    options={[
                        {
                            value: '',
                            label: 'Tất cả',
                        },
                        {
                            value: 'go',
                            label: 'Gỗ',
                        },
                        {
                            value: 'nhua',
                            label: 'Nhựa',
                        },
                        {
                            value: 'nhom',
                            label: 'Nhôm',
                        },
                        {
                            value: 'hopkim',
                            label: 'Hợp kim',
                        },
                    ]}
                />
            </div>

            <div>
                <h3>Màu</h3>
                <Select
                    defaultValue={filter.color}
                    onChange={selectColor}
                    fieldNames="color"
                    style={{
                        width: "100%",
                        height: "40px",
                        margin: "0px 0px 20px 0px"

                    }}
                    options={[
                        {
                            value: '',
                            label: 'Tất cả',
                        },
                        {
                            value: 'blue',
                            label: 'Xanh dương',
                        },
                        {
                            value: 'black',
                            label: 'Đen',
                        },
                        {
                            value: 'red',
                            label: 'Đỏ',
                        },
                        {
                            value: "yellow",
                            label: "Vàng",
                        }
                    ]}
                />
            </div>

            <div>
                <h3>Giá tiền</h3>
                <Select
                    defaultValue={(filter.priceTo === 0 & filter.priceFrom === 9999999) ? `Tất cả` : `$${filter.priceTo} - $${filter.priceFrom}`}
                    onChange={selectChangePrice}
                    style={{
                        width: "100%",
                        height: "40px",

                    }}
                    options={[
                        {
                            value: '0-9999999',
                            label: 'Tất cả',
                        },
                        {
                            value: '0-300',
                            label: '0-300.000',
                        },
                        {
                            value: '300-800',
                            label: '300.000-800.000',
                        },
                        {
                            value: '800-1000',
                            label: '800.000-1.000.000',
                        },
                        {
                            value: "1000-1500",
                            label: "1.000.000-1.500.000",
                        }
                    ]}
                />
            </div>

            <button className="btn-reset-filter" onClick={handleReset}>Huỷ lọc</button>
        </div>
    )
}

export default Filter