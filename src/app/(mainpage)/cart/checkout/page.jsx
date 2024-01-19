"use client"
import "./pageConfirmCart.css"
import React, { useEffect, useState } from 'react';
import { Input, Radio, Space, Select } from 'antd';
import { CSSTransition } from 'react-transition-group';
import { addToCart, removeFromCart, resetCart } from '@/app/redux/slices/cartSlice';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import ShortUniqueId from 'short-unique-id';
import { Typography } from "@mui/material";
import { formatCurrency } from "@/app/utils/index";

const initAdress = {
    postalCode: "",
    telephone: "",
    addressLine: "",
    description: "",
    townCity: "",
    country: "VN",
    userId: "",
    addressId: "",
    WardCode: "",
    DistrictID: 0,
    ProvinceID: 0,
}

const initPurchaseForm = {
    date: "",
    note: "",
    orderCode: "",
    paymentMethod: "CashOnDelivery",
    location: "",
    userId: "",
    orderItems: [],
    totalPrice: "",
    status: 0,
}

const ConfirmCart = () => {
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect("/login");
        }
    });
    const [uAdrress, setUAddress] = useState(initAdress);
    const [purchaseForm, setPurchaseForm] = useState(initPurchaseForm);
    const [listAdd, setList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});
    // Call API Address VN
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState("");
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState("");
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState('');
    const [services, setServices] = useState([]);
    const [shipCost, setShipCost] = useState(0);

    // Redux
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cartItems);
    const itemsPrice = useSelector((state) => state.itemsPrice * 1000);
    const couponPrice = useSelector((state) => state.couponPrice * 1000);

    const tax = itemsPrice * 0.05;
    const [total, setTotal] = useState(itemsPrice + tax - couponPrice);
    useEffect(() => {
        axios.get(`/api/users/address/${session.user.id}`)
            .then(function (response) {
                // console.log(response);
                if (response.data.location.length > 0) {
                    setList(response.data.location);
                    setSelectedAddress(response.data.location[0]);
                    setUAddress((prevState) => ({
                        ...prevState,
                        addressId: response.data.location[0].id,
                    }));
                } else {

                }
            })
            .catch(function (error) {
                console.log(error);
            });

        setUAddress((prevState) => ({
            ...prevState,
            userId: session.user.id,
        }));

    }, [session]);

    const selectedUserAddress = (e) => {
        console.log('AddressLine: ', e.target.value);
        setUAddress((prevState) => ({
            ...prevState,
            userId: session ? session.user.id : "",
            addressLine: e.target.value,
            addressId: selectedAddress.id,
        }));
    };

    // console.log("User Add: ",uAdrress);

    const inputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setUAddress((prevState) => ({
            ...prevState,
            [name]: value,
            addressId: selectedAddress.id,
        }));

    };

    const addressChange = (e) => {
        const name = e.target.name;
        let value = ""
        if (province.ProvinceName && district.DistrictName && ward.WardName) {
            value = e.target.value + ", " + ward.WardName + ", " + district.DistrictName + ", " + province.ProvinceName;
        }
        setUAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    useEffect(() => {
        const orderCode = randomUUID();
        setPurchaseForm({
            orderCode: `THS_VN_${orderCode}`,
            location: uAdrress.addressLine,
            userId: session.user.id,
            orderItems: cartItems,
            totalPrice: total,
            status: 0,
        });
    }, [uAdrress, session, cartItems]);

    const handlePurchase = (e) => {
        console.log("purchaseForm: ", purchaseForm);
        if (purchaseForm.location !== "" && purchaseForm.totalPrice !== 0 && purchaseForm.userId !== null && shipCost !== 0) {
            axios.post(`/api/checkout`, JSON.stringify({ purchaseForm }))
                .then(function (response) {
                    // console.log(response);
                    if (response.data.success && !response.data.error) {
                        console.log(response);
                        if (response.data.payUrl) {
                            // redirect(response.data.payUrl);
                            dispatch(resetCart());
                            router.push(response.data.payUrl);
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log("Validation form!!!");
        }

    }
    const handleSubmitAddress = (e) => {
        e.preventDefault();

        if (listAdd.length > 1) {
            console.log(uAdrress);
            axios.put(`/api/users/address/${session.user.id}`, JSON.stringify({ uAdrress }))
                .then(function (response) {
                    if (response.data.success) {
                        setList(response.data.newLocation);
                        setUAddress(initAdress);
                        setShowForm(false);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            axios.post(`/api/users/address/${session.user.id}`, JSON.stringify({ uAdrress }))
                .then(function (response) {
                    if (response.data.success) {
                        setList(response.data.newLocation);
                        setUAddress(initAdress);
                        setShowForm(false);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const [value, setValue] = useState(1);
    const onChange = (e) => {
        setPurchaseForm((prevState) => ({
            ...prevState,
            paymentMethod: e.target.value,
        }));
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };



    // function of antd
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // ToggleForm
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Call API Address VN
    useEffect(() => {
        axios.get("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province", {
            headers: {
                "token": process.env.NEXT_PUBLIC_GHN_DEV_TOKEN,
            }
        })
            .then(function (response) {
                setProvinces(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleProvinceChange = (value) => {
        // Fetch districts based on selected province
        const selectedProvince = provinces.find((province) => {
            if (province.ProvinceID === value) {
                setUAddress((prevState) => ({
                    ...prevState,
                    townCity: province.ProvinceName,
                    ProvinceID: province.ProvinceID,
                }));
                setProvince(province);
                return province;
            }
        });
        if (selectedProvince) {
            // setDistricts(selectedProvince.ProvinceID);
            axios.post("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district", {
                "province_id": selectedProvince.ProvinceID
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "token": process.env.NEXT_PUBLIC_GHN_DEV_TOKEN,
                }
            })
                .then(function (res) {
                    // console.log("Huyện: ", res.data.data);
                    setDistricts(res.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const handleDistrictChange = (value) => {
        const selectedDistrict = districts.find((district) => {
            if (district.DistrictID === value) {
                setUAddress((prevState) => ({
                    ...prevState,
                    DistrictID: district.DistrictID,
                }));
                setDistrict(district);
                return district;
            }
        });
        if (selectedDistrict) {
            // setDistricts(selectedProvince.ProvinceID);
            axios.post("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id", {
                "district_id": selectedDistrict.DistrictID
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "token": process.env.NEXT_PUBLIC_GHN_DEV_TOKEN,
                }
            })
                .then(function (res) {
                    // console.log("Xã: ", res.data.data);
                    setWards(res.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };


    const handleWardChange = (value) => {
        const selectedWard = wards.find((ward) => {
            if (ward.WardCode === value) {
                setUAddress((prevState) => ({
                    ...prevState,
                    WardCode: ward.WardCode,
                }));
                setWard(ward);
                return ward;
            }
        });
        console.log("Xã: ", selectedWard);
    }

    // GET gói dịch vụ & tính phí ship
    useEffect(() => {
        // axios.post("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services", {
        //     "shop_id": Number(process.env.NEXT_PUBLIC_DEV_SHOPID),
        //     "from_district": 1531,
        //     "to_district": selectedAddress.DistrictID,
        // }, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "token": process.env.NEXT_PUBLIC_GHN_DEV_TOKEN,
        //     }
        // })
        //     .then(function (res) {
        //         console.log("Gói dịch vụ: ", res.data);
        //         setServices(res.data.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        const items = cartItems.map((val, i) => {
            return {
                "name": val.name,
                "quantity": val.qty,
                "height": 200,
                "weight": 5000,
                "length": 200,
                "width": 200
            }
        })

        let formShipCost = {
            "service_type_id": 5,
            "from_district_id": 1531,
            "to_district_id": selectedAddress.DistrictID,
            "to_ward_code": selectedAddress.WardCode,
            "weight": 10000,
            "insurance_value": 0,
            "coupon": null,
            "coupon": null,
            "items": [
                ...items
            ]
        }

        console.log("Form ship: ", formShipCost);

        axios.post("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee", formShipCost, {
            headers: {
                'Content-Type': 'application/json',
                "token": process.env.NEXT_PUBLIC_GHN_DEV_TOKEN,
                "shopId": Number(process.env.NEXT_PUBLIC_DEV_SHOPID)
            }
        })
            .then(function (res) {
                // console.log("Phí vận chuyển: ", res.data);
                setShipCost(res.data.data.total);
                setTotal(res.data.data.total + itemsPrice + tax - couponPrice);

            })
            .catch(function (error) {
                console.log(error);
            });


    }, [selectedAddress])

    return (
        <div className="container-cart">
            <div className="left-panel">
                <div className="card">
                    <div className="card-address">
                        <h2>Địa chỉ giao hàng</h2>
                        <button className="cartconfirm-edit" onClick={toggleForm}>{listAdd.length > 1 ? "Edit" : "Add"}</button>
                    </div>
                    <Radio.Group onChange={selectedUserAddress} value={uAdrress.addressLine}>
                        <Space direction="vertical">
                            {listAdd.length > 0 ? listAdd.map((addr, index) => {
                                return (
                                    <Radio
                                        defaultChecked={index === 0}
                                        required={true}
                                        value={addr.addressLine}
                                        key={index}
                                        onClick={() => setSelectedAddress(addr)}>
                                        <span>{addr.name}</span> - <span>{addr.telephone}</span> - <span>{addr.addressLine}</span>
                                    </Radio>
                                )
                            }) : (
                                <><Typography>
                                    Bạn chưa thêm địa chỉ giao hàng.
                                </Typography></>
                            )}

                        </Space>
                    </Radio.Group>
                </div>
                <div className="card">
                    <h2>Thông tin đơn hàng của bạn</h2>
                    {(cartItems.length < 1 ? (<>Cart is empty</>) : cartItems.map((item, i) => {
                        return (
                            <div className="card-prodInfo" key={i}>
                                <img src={item.imageUrl} alt="Product Image" className="card-prodInfo-img" />
                                <p>{item.name}</p>
                                <p>{formatCurrency(item.price * 1000)}</p>
                                <p>Số lượng: {item.qty}</p>
                            </div>
                        )
                    }))}
                </div>
            </div>

            {/* form address */}
            <CSSTransition in={showForm} classNames="form-overlay" timeout={300} >
                <div className={`overlay ${showForm ? 'active' : ''}`} onClick={toggleForm}></div>
            </CSSTransition>
            <CSSTransition in={showForm} classNames="menu" timeout={300} >
                <div className={`form-container ${showForm ? 'active' : ''}`}>
                    <div className="address-form">
                        <div className="addform-left-section">
                            <div className="addform-user-info">
                                <p>Họ tên</p>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={listAdd.length > 1 ? selectedAddress.name : ""}
                                    placeholder="Họ và tên"
                                    onChange={inputChange}
                                    required={true}
                                />
                            </div>
                            <div className="addform-user-info">
                                <p>Số điện thoại</p>
                                <input
                                    type="text"
                                    name="telephone"
                                    defaultValue={listAdd.length > 1 ? selectedAddress.telephone : 0}
                                    placeholder="Số điện thoại"
                                    onChange={inputChange}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="addform-right-section">
                            <div className="addform-user-info">
                                <p>Tỉnh/ Thành phố</p>
                                <Select
                                    showSearch
                                    defaultValue=""
                                    filterOption={filterOption}
                                    placeholder="Select province"
                                    onChange={handleProvinceChange}
                                    style={{ width: '100%', height: '37px' }}
                                    options={provinces.map((province) => ({
                                        value: province.ProvinceID,
                                        label: province.ProvinceName,
                                    }))}
                                />
                            </div>
                            <div className="addform-user-info">
                                <p>Quận/ Huyện</p>
                                <Select
                                    showSearch
                                    defaultValue=""
                                    filterOption={filterOption}
                                    placeholder="Select district"
                                    onChange={handleDistrictChange}
                                    style={{ width: '100%', height: '37px' }}
                                    options={districts.map((district) => ({
                                        value: district.DistrictID,
                                        label: district.DistrictName,
                                    }))}
                                />
                            </div>
                            <div className="addform-user-info">
                                <p>Phường/ Xã</p>
                                <Select
                                    showSearch
                                    defaultValue=""
                                    filterOption={filterOption}
                                    onChange={handleWardChange}
                                    placeholder="Select ward"
                                    style={{ width: '100%', height: '37px' }}
                                    options={wards.map((ward) => ({
                                        value: ward.WardCode,
                                        label: ward.WardName,
                                    }))}
                                />
                            </div>
                            <div className="addform-user-info">
                                <p>Địa chỉ nhận hàng</p>
                                <input
                                    type="text"
                                    name="addressLine"
                                    required={true}
                                    defaultValue={listAdd.length > 1 ? selectedAddress.addressLine : ""}
                                    placeholder="Địa chỉ nhận hàng"
                                    onChange={addressChange}
                                />
                            </div>
                            <div className="buttons">
                                <button className="addform-btn-cancel" onClick={toggleForm}>Hủy</button>
                                <button className="addform-btn-save" onClick={(e) => handleSubmitAddress(e)}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>


            <div className="right-panel">
                <div className="card">
                    <h2>Phương thức thanh toán</h2>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <div className="payment-choice">
                                <Radio required={true} value="Momo">
                                    <div className="payment-option">
                                        <img src="/payment/momo_logo.png" alt="img payment" className="payment-logo" />
                                        <p>Thanh toán trực tuyến qua Momo</p>
                                    </div>
                                </Radio>
                            </div>
                            <div className="payment-choice">
                                <Radio required={true} value="VNPay">
                                    <div className="payment-option">
                                        <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" alt="img payment" className="payment-logo" />
                                        <p>Thanh toán trực tuyến qua VNPay</p>
                                    </div>
                                </Radio>
                            </div>
                            <div className="payment-choice">
                                <Radio defaultChecked={true} required={true} value="CashOnDelivery">
                                    <div className="payment-option">
                                        <img src="https://postech.vn/wp-content/uploads/2018/11/icon-cash_grande.png" alt="img_payment_3" className="payment-logo" />
                                        <p>Thanh toán khi nhận hàng</p>
                                    </div>
                                </Radio>
                            </div>
                        </Space>
                    </Radio.Group>
                    {/* <h3>Phương thức vận chuyển</h3>
                    {services.map((s, i) => {
                        return (<p key={i}>Vận chuyển {s.short_name}</p>)
                    })} */}
                    <h3>Tổng tiền thanh toán</h3>
                    {(<>
                        <p>Tạm tính: {formatCurrency(itemsPrice)}</p>
                        <p>Thuế (5%): {formatCurrency(tax)}</p>
                        <p>Mã giảm giá: {formatCurrency(couponPrice)}</p>
                        <p>Phí vận chuyển: {formatCurrency(Number(shipCost))}</p>
                        <p>Tổng tiền: <span className="confirm-total-price">{formatCurrency(total)}</span></p>
                    </>)}
                    <button type="button" onClick={(e) => handlePurchase(e)}>Thanh toán</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmCart