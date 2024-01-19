import Image from "next/image"
import "./pageBlog.css"

import { blogs } from "@/app/data/data";
import Link from "next/link";

const Blog = () => {
    return (
        <div className="blog-wrapper">
            <div className="blog-banner">
                <img src="/blog-banner.jpg" alt="Slider image" />
                <div className="blog-title">
                    <h2>Furniture Blog</h2>
                    <p>Cùng tìm hiểu về vẻ đẹp - kiến thức và cách trang trí cho căn nhà của bạn thêm sang trọng</p>
                </div>
            </div>

            <div className="blog-content">
                <div className="blog-box">
                    <article className="blog-posts">
                        {blogs.map((blog, index) => (
                            <div key={index} className="post">
                                <div className="post-image">
                                    <img src={blog.image} alt="How to Ace Your Life Image" />
                                </div>
                                <div className="post-content">
                                    <a className="post-title">{blog.title}</a>
                                    <p className="post-info">Posted on {blog.date_posted} by {blog.author}</p>
                                    <div className="post-summary-container">
                                        <p className="post-summary">
                                            {blog.content}
                                        </p>
                                    </div>
                                </div>
                                <div className="post-read-more">
                                    <Link href={`/blog/${blog.id}`}><span>+</span></Link>
                                </div>
                            </div>
                        ))}

                    </article>
                </div>

                <div className="blog-categories">
                    <div className="popular-posts-side">
                        <h2>POPULAR POSTS</h2>
                        <div className="popular-posts">
                            <div className="popular-post">
                                <div className="popular-post-image">
                                    <img src="/post-1.jpg" alt="How to Ace Your Life Image" />
                                </div>
                                <div className="popular-post-content">
                                    <a href="#" className="popular-post-title">How to Ace Your Life</a>
                                    <p className="popular-post-desc">
                                        Etiam placerat velit vitae dui blandit sollicitudin.
                                    </p>
                                </div>
                            </div>

                            <div className="popular-post">
                                <div className="popular-post-image">
                                    <img src="/post-1.jpg" alt="How to Ace Your Life Image" />
                                </div>
                                <div className="popular-post-content">
                                    <a href="#" className="popular-post-title">How to Ace Your Life</a>
                                    <p className="popular-post-desc">
                                        Etiam placerat velit vitae dui blandit sollicitudin.
                                    </p>
                                </div>
                            </div>

                            <div className="popular-post">
                                <div className="popular-post-image">
                                    <img src="/post-1.jpg" alt="How to Ace Your Life Image" />
                                </div>
                                <div className="popular-post-content">
                                    <a href="#" className="popular-post-title">How to Ace Your Life</a>
                                    <p className="popular-post-desc">
                                        Etiam placerat velit vitae dui blandit sollicitudin.
                                    </p>
                                </div>
                            </div>

                            <div className="popular-post">
                                <div className="popular-post-image">
                                    <img src="/post-1.jpg" alt="How to Ace Your Life Image" />
                                </div>
                                <div className="popular-post-content">
                                    <a href="#" className="popular-post-title">How to Ace Your Life</a>
                                    <p className="popular-post-desc">
                                        Etiam placerat velit vitae dui blandit sollicitudin.
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Blog