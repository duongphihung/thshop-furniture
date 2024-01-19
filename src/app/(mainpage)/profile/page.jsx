"use client"
import Link from "next/link"
import "./profile.css"
import { CSSTransition } from 'react-transition-group';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Select, Upload } from 'antd';
import { useEffect, useState } from "react";

import { TbUserEdit } from "react-icons/tb";
import { BsGear } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment";
import { formatCurrency } from "@/app/utils/index";
import { validateConfig } from "next/dist/server/config-shared";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const initialProfileForm = {

}

const Profile = () => {
    // ToggleForm

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
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
    const [showForm, setShowForm] = useState(false);
    const [itemOrder, setItemOrder] = useState([]);
    const toggleForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
    };

    const [showFormBill, setShowFormBill] = useState(false);
    const toggleFormBill = (e, orderId) => {
        const orderItems = order?.map((val, i) => {
            if (val.id === orderId) {
                setItemOrder(val);
                return val;
            }
        });
        e.preventDefault();
        setShowFormBill(!showFormBill);
    }

    // function of antd
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // Call API Address VN
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const inputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setUAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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


    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="profile-sidebar-acc">
                    <img src={profile.image} alt="avatar" className="profile-acc-avatar" />
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
                <p>Quản lý hồ sơ của bạn</p>
                <div className="profile-user-container">
                    <div className="profile-user-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Email đăng nhập</td>
                                    <td>{profile.email}</td>
                                </tr>
                                <tr>
                                    <td>Tên</td>
                                    <td>{profile.name}</td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại</td>
                                    <td>{profile.phoneNumber}</td>

                                </tr>
                                <tr>
                                    <td>Địa chỉ</td>
                                    <td>
                                        {profile?.locations?.map((addr, i) => {
                                            return (<div key={i}>
                                                {addr.addressLine}
                                            </div>)
                                        })
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <p>Lịch sử mua hàng</p>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID Order</StyledTableCell>
                                <StyledTableCell align="right">Tổng</StyledTableCell>
                                <StyledTableCell align="right">Ngày</StyledTableCell>
                                <StyledTableCell align="right">Trạng thái</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order?.map((item, i) => {
                                return (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell component="th" scope="row">
                                            {item.orderCode}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{formatCurrency(Number(item.totalPrice))}</StyledTableCell>
                                        <StyledTableCell align="right">{moment(item.createdAt).format("DD/MM/YYYY")}</StyledTableCell>
                                        <StyledTableCell align="right">Đang giao</StyledTableCell>
                                        <StyledTableCell key={item?.id} align="right"><button onClick={(e) => toggleFormBill(e, item?.id)} className="btn-view-order">Xem</button></StyledTableCell>
                                    </StyledTableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
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
                                <div className="profile-user-ava">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt="avatar"
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                                    <p>Dụng lượng file tối đa 1 MB</p>
                                    <p>Định dạng: .JPEG, .JPG, .PNG</p>
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

            {/* form bill */}
            <CSSTransition in={showFormBill} classNames="form-overlay" timeout={300} >
                <div className={`overlay ${showFormBill ? 'active' : ''}`} onClick={toggleFormBill}></div>
            </CSSTransition>
            <CSSTransition in={showFormBill} classNames="form-bill" timeout={300} >
                <div className={`form-bill-container ${showFormBill ? 'active' : ''}`}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Tên sản phẩm</TableCell>
                                    <TableCell align="right">Số lượng</TableCell>
                                    <TableCell align="right">Giá tiền</TableCell>
                                    <TableCell align="right">Tổng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itemOrder?.orderItems?.map((val, i) => {
                                    return (
                                        <TableRow key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                1
                                            </TableCell>
                                            <TableCell align="right">{val?.product.name}</TableCell>
                                            <TableCell align="right">{val.quantity}</TableCell>
                                            <TableCell align="right">{formatCurrency(Number(val?.product.price) * 1000)}</TableCell>
                                            <TableCell align="right">{formatCurrency(Number(val?.product.price) * 1000 * val.quantity)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="form-bill-price">
                        <button onClick={toggleFormBill} className="form-bill-btnok">OK</button>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Profile