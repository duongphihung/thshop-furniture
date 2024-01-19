import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import "./testimonial.css"
import { BsRobot } from "react-icons/bs";
import { IoArrowUndoOutline, IoCallOutline, IoRocketOutline, IoTicketOutline } from "react-icons/io5";


const Testimonial = () => {
    return (
        <div className="testimonials-box">

            <div className="testimonial">
                <h2 className="title">Testimonial</h2>
                <div className="testimonial-card">
                    <Image src="https://i.pinimg.com/736x/1f/15/9f/1f159f49f62052bef48e42f5799a9ba0.jpg"
                        alt="phii hung"
                        width={80} height={80}
                        className="testimonial-banner"
                    />
                    <p className="testimonial-name">Phii Hung</p>
                    <p className="testimonial-title">CEO & Founder Invision</p>

                    <Image src="/icons/quotes.svg"
                        alt="quotation"
                        className="quotation-img"
                        width="26" height="26"
                    />
                    <p className="testimonial-desc">
                        Thằng nào có tiền thì donate cho tao.
                        Ít thì 5 quả trứng, nhiều thì một cái tên lửa
                    </p>
                </div>
            </div>

            <div className="cta-container">
                
                <img
                    src="/cta-banner.jpg"
                    alt="cta-banner" 
                    className="cta-banner-img"
                />
                
                <Link href="#" className="cta-content">

                    <p className="discount">25% Discount</p>

                    <h2 className="cta-title">Summer collection</h2>

                    <p className="cta-text">Starting @ $10</p>

                    <button className="cta-btn">Shop now</button>

                </Link>
            </div>

            <div className="service">
                <h2 className="title">Our Services</h2>
                <div className="service-container">
                    <Link href="#" className="service-item">
                        <div className="service-icon">
                            <BsRobot />
                        </div>
                        <div className="service-content">
                            <h3 className="service-title">Smart ChatBot</h3>
                            <p className="service-desc">Support all the time</p>
                        </div>
                    </Link>
                    <Link href="#" className="service-item">
                        <div className="service-icon">
                            <IoRocketOutline />
                        </div>
                        <div className="service-content">
                            <h3 className="service-title">Next Day Delivery</h3>
                            <p className="service-desc">VN Orders Only</p>
                        </div>
                    </Link>
                    <Link href="#" className="service-item">
                        <div className="service-icon">
                            <IoCallOutline />
                        </div>
                        <div className="service-content">
                            <h3 className="service-title">Best Online Support</h3>
                            <p className="service-desc">Hours: 8AM - 11PM</p>
                        </div>
                    </Link>
                    <Link href="#" className="service-item">
                        <div className="service-icon">
                            <IoArrowUndoOutline />
                        </div>
                        <div className="service-content">
                            <h3 className="service-title">Return Policy</h3>
                            <p className="service-desc">Easy & Free Return</p>
                        </div>
                    </Link>
                    <Link href="#" className="service-item">
                        <div className="service-icon">
                            <IoTicketOutline />
                        </div>
                        <div className="service-content">
                            <h3 className="service-title">30% Money Back</h3>
                            <p className="service-desc">For Order Over $100</p>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Testimonial