import { IoBarChartSharp, IoBusinessOutline, IoCubeOutline, IoLaptopOutline, IoMailOpenOutline } from "react-icons/io5"
import "./pageAbout.css"
import { AiOutlineLineChart } from "react-icons/ai"

const About = () => {
    return (
        <div className="about-wrapper">
            <h1>Dịch vụ của chúng tôi</h1>
            <p>Lorem ipsum dolor sit amet, consecttetur adipiscing elit. Cum sociis natoque penatibus et justo</p>

            <div className="about_content-box">
                <div className="about-card">
                    <i><IoBarChartSharp /></i>
                    <h2>Marketing Services</h2>
                    <p>
                        Aliquam ut turpis  nec ante pharetra ornare. Integer ac ex non nisl eleifend
                        dapibus nec quis arcu.
                    </p>
                </div>

                <div className="about-card">
                    <i><IoLaptopOutline /></i>
                    <h2>Web App Development</h2>
                    <p>
                        Aliquam ut turpis  nec ante pharetra ornare. Integer ac ex non nisl eleifend
                        dapibus nec quis arcu.
                    </p>
                </div>

                <div className="about-card">
                    <i><AiOutlineLineChart /></i>
                    <h2>24/7 Call Center Service</h2>
                    <p>
                        Aliquam ut turpis  nec ante pharetra ornare. Integer ac ex non nisl eleifend
                        dapibus nec quis arcu.
                    </p>
                </div>

                <div className="about-card">
                    <i><IoMailOpenOutline /></i>
                    <h2>Social Media Marketing</h2>
                    <p>
                        Aliquam ut turpis  nec ante pharetra ornare. Integer ac ex non nisl eleifend
                        dapibus nec quis arcu.
                    </p>
                </div>

                <div className="about-card">
                    <i><IoBusinessOutline /></i>
                    <h2>Corporate Business</h2>
                    <p>
                        Aliquam ut turpis  nec ante pharetra ornare. Integer ac ex non nisl eleifend
                        dapibus nec quis arcu.
                    </p>
                </div>

                <div className="about-card">
                    <i><IoCubeOutline /></i>
                    <h2>Creative Consultancy</h2>
                    <p>
                        Aliquam ut turpis  nec ante pharetra ornare. Integer ac ex non nisl eleifend
                        dapibus nec quis arcu.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About