"use client"
import Link from "next/link"
import "../profile.css"
import { CSSTransition } from 'react-transition-group';

import { Select } from 'antd';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { TbUserEdit } from "react-icons/tb";
import { BsGear } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import axios from "axios";

const initialProfileForm = {

}

const Profile = () => {
    // ToggleForm
    const [showForm, setShowForm] = useState(false);
    const [uAddress, setUAddress] = useState({});
    const [data, setData] = useState();
    const [profile, setProfile] = useState(initialProfileForm);
    const [order, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect("/login");
        }
    });
    const toggleForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    };

    useEffect(() => {
        axios.get(`/api/users/profile/${session.user.id}`)
            .then(function (response) {
                console.log(response.data);
                setData(response.data.user);
                setProfile(response.data.user);
                setOrder(response.data.user.orders);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [session]);

    // function of antd
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // Call API Address VN
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    useEffect(() => {
        // Fetch provinces data
        fetch('https://provinces.open-api.vn/api/?depth=3')
            .then((response) => response.json())
            .then((data) => setProvinces(data));
    }, []);

    const handleProvinceChange = (value) => {
        // Fetch districts based on selected province
        const selectedProvince = provinces.find((province) => province.name === value);
        if (selectedProvince) {
            setDistricts(selectedProvince.districts);
        }
    };

    const handleDistrictChange = (value) => {
        // Fetch wards based on selected district
        const selectedDistrict = districts.find((district) => district.name === value);
        if (selectedDistrict) {
            setWards(selectedDistrict.wards);
        }
    };

    const inputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setUAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="profile-sidebar-acc">
                    <img src={profile.image} alt={profile.name} className="profile-acc-avatar" />
                    <p>{profile.name}</p>
                    <CiEdit className="icon-edit-profile" onClick={toggleForm} />
                </div>
                <div className="profile-sidebar-lists">
                    <Link href="/profile"><TbUserEdit />Hồ sơ</Link>
                    <Link href="/profile/changepassword"><BsGear />Đổi mật khẩu</Link>
                </div>
            </div>
            <div className="profile-user-info">
                <h2>Hồ sơ của bạn</h2>
                <p>Thay đổi mật khẩu của bạn</p>
                <div className="profile-user-table">
                    <table>
                        <tbody>
                            <tr>
                                <td>Mật khẩu cũ</td>
                                <td><input type="password" className="change-password-input" /></td>
                            </tr>
                            <tr>
                                <td>Mật khẩu mới</td>
                                <td><input type="password" className="change-password-input" /></td>
                            </tr>
                            <tr>
                                <td>Nhập lại mật khẩu mới</td>
                                <td><input type="password" className="change-password-input" /></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* form address */}
            <CSSTransition in={showForm} classNames="form-overlay" timeout={300} >
                <div className={`overlay ${showForm ? 'active' : ''}`} onClick={toggleForm}></div>
            </CSSTransition>
            <CSSTransition in={showForm} classNames="menu" timeout={300} >
                <div className={`form-container ${showForm ? 'active' : ''}`}>
                    <form>
                        <div className="address-form">
                            <div className="addform-left-section">
                                <div className="addform-user-info">
                                    <p>Họ tên</p>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Họ và tên"
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="addform-user-info">
                                    <p>Số điện thoại</p>
                                    <input
                                        type="text"
                                        name="telephone"
                                        placeholder="Số điện thoại"
                                        onChange={inputChange}
                                    />
                                </div>
                            </div>

                            <div className="addform-right-section">
                                <div className="addform-user-info">
                                    <p>Địa chỉ nhận hàng</p>
                                    <input
                                        type="text"
                                        name="addressLine"
                                        placeholder="Địa chỉ nhận hàng"
                                        onChange={inputChange}
                                    />
                                </div>
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
                                            value: province.name,
                                            label: province.name,
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
                                            value: district.name,
                                            label: district.name,
                                        }))}
                                    />
                                </div>
                                <div className="addform-user-info">
                                    <p>Phường/ Xã</p>
                                    <Select
                                        showSearch
                                        defaultValue=""
                                        filterOption={filterOption}
                                        placeholder="Select ward"
                                        style={{ width: '100%', height: '37px' }}
                                        options={wards.map((ward) => ({
                                            value: ward.name,
                                            label: ward.name,
                                        }))}
                                    />
                                </div>
                                <div className="buttons">
                                    <button className="addform-btn-cancel" onClick={(e) => toggleForm(e)}>Hủy</button>
                                    <button className="addform-btn-save" onClick={(e) => handleSubmitAddress(e)}>Lưu</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Profile