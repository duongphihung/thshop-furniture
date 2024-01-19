import Image from 'next/image'
import Link from 'next/link'
import "./blogitem.css"

const BlogItem = ({ props }) => {
    const { id, title, author, image, date_posted} = props;
    return (
        <div className="blogItem-container">

            <div className="blogItem-card">
                
                <Link href="/">
                    <img src={image} alt="blog-1" className="blogItem-banner"/>
                </Link>

                <div className="blogItem-content">
                    <Link href="/" className="blogItem-category">Sofa</Link>

                    <Link href="/">
                        <h3 className="blogItem-title">
                            {title}
                        </h3>
                    </Link>

                    <p className="blogItem-meta">
                        By <cite>Mr {author}</cite> / <span className="blogItem-time">{date_posted}</span>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default BlogItem