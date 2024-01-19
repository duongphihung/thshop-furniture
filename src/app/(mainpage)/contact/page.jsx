import Link from "next/link"
import "./contactPage.css"
import { IoCallOutline, IoLocationOutline, IoLogoFacebook, IoLogoInstagram, IoLogoTiktok, IoLogoTwitch, IoMailOutline } from "react-icons/io5"

const Contact = () => {
    return (
        <div className="contact-wrapper">
            <div className="contact-title">
                <h1>Kết nối với chúng tôi</h1>
            </div>
            <div className="contact-box">
                <div className="contact-content form">
                    <h3>Send a Message</h3>
                    <form action="https://formsubmit.co/5e8bc63422bed8ac6ea8f10782bcfad2" method="POST">
                        <div className="contact_form-box">
                            <div className="row50">
                                <div className="contact_form-input">
                                    <span>First Name</span>
                                    <input type="text" name="name" placeholder="First Name"/>
                                </div>
                                <div className="contact_form-input">
                                    <span>Last Name</span>
                                    <input type="text" name="name" placeholder="Last Name"/>
                                </div>
                            </div>

                            <div className="row50">
                                <div className="contact_form-input">
                                    <span>Email</span>
                                    <input type="email" name="email" placeholder="Email" required/>
                                </div>
                                <div className="contact_form-input">
                                    <span>Mobile</span>
                                    <input type="text" name="phone number" placeholder="Number" required/>
                                </div>
                            </div>

                            <div className="row100">
                                <div className="contact_form-input">
                                    <span>Message</span>
                                    <textarea name="message" placeholder="Write your message here..." required></textarea>
                                </div>
                            </div>

                            <div className="row100">
                                <div className="contact_form-input">
                                    <input type="submit" value="Send" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="contact-content info">
                    <h3>Contact Info</h3>
                    <div className="contact_info-box">
                        <div>
                            <span><IoLocationOutline /></span>
                            <p>Doan Uan, Khue My, Ngu Hanh Son, Da Nang-VN</p>
                        </div>
                        <div>
                            <span><IoMailOutline /></span>
                            <Link href="mailto:dphung.19it2@vku.udn.vn">dphung.19it2@vku.udn.vn</Link>
                        </div>
                        <div>
                            <span><IoCallOutline /></span>
                            <Link href="tel:0965321123">0965-321-123</Link>
                        </div>
                        <ul className="sci">
                            <li><Link href="#"><IoLogoFacebook /></Link></li>
                            <li><Link href="#"><IoLogoInstagram /></Link></li>
                            <li><Link href="#"><IoLogoTiktok /></Link></li>
                            <li><Link href="#"><IoLogoTwitch /></Link></li>
                        </ul>
                    </div>
                </div>

                <div className="contact-content map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5755997685965!2d108.2402425749435!3d16.03559344033786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142175e9f1ad2ed%3A0x30463d92e7e79b79!2zRG_Do24gVeG6qW4sIEtodcOqIE3hu7ksIE5nxakgSMOgbmggU8ahbiwgxJDDoCBO4bq1bmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699069149238!5m2!1svi!2s"
                        style={{border: "0"}}
                        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default Contact