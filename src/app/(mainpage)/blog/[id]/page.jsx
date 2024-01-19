'use client'
import Link from "next/link";
import "./pageDetail.css"
import BlogItem from "../../../components/blogitem/BlogItem";

import { blogs } from "@/app/data/data";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useRouter } from "next/navigation";


const BlogDetail = ({ id }) => {
    const router = useRouter();

    const blog = blogs.find((blog) => blog.id === id);

    if (!blog) {
        return <div>Không tìm thấy bài viết</div>;
    }
    return (
        <div className="blog-detail">
            <div className="blog-hero"></div>
            <main>
                <h2>{blog.title}</h2>
                <div className="blog-detail-container">
                    <div className="blog-profile">
                        <div className="blog-img-container">

                        </div>
                        <div className="blog-profile-info">
                            <h3>{blog.author}</h3>
                            <p>{blog.date_posted}</p>
                        </div>
                    </div>
                    <div className="blog-button">
                        <Link href="/" className="blog-btn">passion</Link>
                    </div>
                </div>

                <div className="blog-detail-content">
                    <p>{blog.content}</p>
                    <p>Thank for reading!</p>
                </div>
            </main>



            <div className="blog-popular">
                <h2>Popular Post</h2>
                <div className="blog-popular-container">
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
                                <SwiperSlide key={blog.id}><BlogItem props={blog} /></SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail;