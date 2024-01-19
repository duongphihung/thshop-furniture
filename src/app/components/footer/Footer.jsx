import Link from "next/link"
import "./footer.css"
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-nav">
                <div className="footer-container">
                    <div className="footer-info">
                        <ul className="footer-nav-list">
                            <li className="footer-nav-item">
                                <h2 className="footer-title">POPULAR CATEGORIES</h2>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Sofa</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Morden</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Cosmetic</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Health</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Watches</Link>
                            </li>
                        </ul>
                        <ul className="footer-nav-list">
                            <li className="footer-nav-item">
                                <h2 className="footer-title">PRODUCTS</h2>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Prices Drop</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">New Products</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Best Sales</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Contact Us</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Sitemap</Link>
                            </li>
                        </ul>
                        <ul className="footer-nav-list">
                            <li className="footer-nav-item">
                                <h2 className="footer-title">OUR COMPANY</h2>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Delivery</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Legal Notice</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Terms And Conditions</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">About Us</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Secure Payment</Link>
                            </li>
                        </ul>   
                        <ul className="footer-nav-list">
                            <li className="footer-nav-item">
                                <h2 className="footer-title">SERVICES</h2>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Prices Drop</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">New Products</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Best Sales</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Contact Us</Link>
                            </li>
                            <li className="footer-nav-item">
                                <Link href="/" className="footer-nav-link">Sitemap</Link>
                            </li>
                        </ul>
                        <ul className="footer-nav-list">
                            <li className="footer-nav-item">
                                <h2 className="footer-title">CONTACT</h2>
                            </li>
                            <li className="footer-nav-item flex">
                                <div className="icon-box"><IoLocationOutline /></div>
                                <p className="content">
                                    400 Doan Uan, Khue My, Ngu Hanh Son, Da Nang-VN
                                </p>
                            </li>
                            <li className="footer-nav-item flex">
                                <div className="icon-box"><IoCallOutline /></div>
                                <Link href="tel:+0965-321-123" className="footer-nav-link">0965-321-123</Link>
                            </li>
                            <li className="footer-nav-item flex">
                                <div className="icon-box"><IoMailOutline /></div>
                                <Link href="mailto:dphung.19it2@vku.udn.vn" className="footer-nav-link">dphung.19it2@vku.udn.vn</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="copyright">
                    Copyright &copy; <Link href="#" className="footer-logo">THSHop</Link> all rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer