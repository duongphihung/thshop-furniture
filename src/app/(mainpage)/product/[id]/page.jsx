"use client"
import Link from 'next/link'
import "./pageDetail.css"
import { AiFillCheckCircle, AiFillStar, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import { LiaComment } from "react-icons/lia";

import Rating from '@mui/material/Rating';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import AddToCart from '@/app/components/cart/addcart/AddToCart';


import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import moment from 'moment';
import Loading from '@/app/components/loading/Loading';
import { formatCurrency } from "@/app/utils/index";
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@mui/icons-material';

const initComment = {
    userId: "",
    productId: "",
    content: "",
    images: "",
    video: "",
    rating: "",
}

const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const ProductDetail = ({ params }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [data, setData] = useState({});
    const [rating, setRating] = useState(0);
    const [products, setProduct] = useState([]);
    const [comment, setComment] = useState(initComment);
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { data: session, status } = useSession({});
    const [imgs, setImg] = useState([]);
    let id = params.id;

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(function (response) {
                console.log(response.data.product);
                setData(response.data.product);
                setComments(response.data.product.comments);
                setImg(JSON.parse(response.data.product.images));
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        setComment((prevState) => ({
            ...prevState,
            productId: id,
            userId: session ? session.user.id : "",
        }));
    }, [id]);

    const [imgId, setImgId] = useState(0);

    const handleShowImg = (id) => {
        setImgId(id);
    }

    const handleChangeRating = (e, newValue) => {
        setRating(newValue);
        setComment((prevState) => ({
            ...prevState,
            rating: e.target.value,
        }));
    }

    const inputCommentChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setComment((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const getListComment = async () => {
        axios.get(`/api/comments/${id}`)
            .then(function (response) {
                setComments(response.data.comments);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        console.log(comment);
        axios.post('/api/comments', JSON.stringify({ comment }))
            .then(function (response) {
                console.log(response);
                if (response.data.success) {
                    getListComment();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        setComment((prevState) => ({
            ...prevState,
            content: "",
        }));
        setRating(0)
    };

    const handleClearComment = (e) => {
        e.preventDefault();
        setComment(() => ({
            content: ""
        }));
        setRating(0);
    }

    if (isLoading || !data) {
        return <div className="loading-main"><div className="loading-wrap"><Loading /></div></div>;
    }

    return (
        <div className="page-product-detail">
            <div className="section-product">
                <div className="pro-card">
                    <div className="pro-imgs">
                        <div className="pro-img-list1">
                            <Swiper
                                spaceBetween={10}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                            >
                                {
                                    imgs.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={img}
                                                alt={data.name + "_" + index}
                                                style={{ display: 'block' }}
                                            />
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>
                        </div>
                        <div className="pro-img-list2">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {
                                    imgs.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={img}
                                                alt={data.name + "_" + index}
                                                style={{ display: 'block' }}
                                            />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>

                    </div>

                    <div className="pro-content">
                        <h2 className="pro-title">{data.name}</h2>
                        <div className="pro-rating">
                            <Rating name="rating" size="large" value={Number(data.rating)} readOnly precision={0.1} />
                            <span>{data.rating}({comments.length})</span>
                        </div>
                        <div className="pro-price">
                            <p className="last-price">Giá sản phẩm : <span>{formatCurrency(data.price * 1000)}</span></p>
                            {/* <p className="new-price">New Price : <span>$249.00(5%)</span></p> */}
                        </div>
                        <div className="pro-detail">
                            <h2>Thông tin sản phẩm</h2>
                            <p>
                                {data.shortDescription}
                            </p>
                            <ul>
                                <li><AiFillCheckCircle /> Màu sắc: <span>{data.color}</span></li>
                                <li><AiFillCheckCircle /> Số lượng: <span>{data.quantity < 0 ? "None" : "In stock"}</span></li>
                                <li><AiFillCheckCircle /> Danh mục: <span>{data.categoryId ? data.category.name : ""}</span></li>
                                <li><AiFillCheckCircle /> Khu vực giao hàng: <span>VietNam</span></li>
                            </ul>
                        </div>
                        <div className="purchase-info">
                            <AddToCart product={data} redirect={false} key={data.id} increasePerClick={true} type='detail' />
                            <button className="btn">
                                + Danh sách yêu thích
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="section-des-product">
                <h2>Mô tả sản phẩm</h2>
                <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
            </div>

            <div className="section-comment">
                <h2>Đánh giá sản phẩm</h2>
                {session ? (
                    <>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => handleChangeRating(event, newValue)}
                        />
                        <div className="upload-img">
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </div>
                        <form encType="multipart/form-data">
                            <textarea onChange={inputCommentChange} name="content" placeholder="Your opinion..." value={comment.content}></textarea>
                            <div className="comment-btn-group">
                                <button type="button" onClick={handleSubmitComment} className="btn-submit-comment">Đăng</button>
                                <button className="btn-cancel-comment" onClick={handleClearComment}>Xoá</button>
                            </div>
                        </form>
                    </>) : (<div><p className="section-comment_suggess">Để có thể đánh giá sản phẩm này vui lòng <span><Link href="/login">đăng nhập</Link></span> </p></div>)}
                <div className="comment-user">
                    {comments.length > 0 ? (
                        comments.map((cmt, index) => {
                            const formattedDate = moment(cmt.createdAt).format('MMMM DD, YYYY');
                            return (
                                <div key={index} className="comment_box">
                                    <img className="media_man" src={cmt.user.image} alt={cmt.user.name} />
                                    <div className="media-body">
                                        <div className="custom_flex">
                                            <h5 className="custom_para">
                                                {cmt.user.name} | <span>{formattedDate}</span>
                                            </h5>
                                        </div>
                                        <div>
                                            <Rating value={cmt.rating} readOnly />
                                        </div>
                                        <img src="/products/1.png" alt="img" className="comment-img-user"/>
                                        <p className="blog_details_para">{cmt.content}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="section-first-comment">
                            <LiaComment className="section-first-icon" />
                            <p>Hãy cho chúng tôi biết cảm nhận của bạn về sản phẩm này!</p>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default ProductDetail