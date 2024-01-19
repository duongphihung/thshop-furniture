
import ChatBot from "../components/chatbot/ChatBot";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import { StoreProvider } from "../providers/StoreProvider";
import "./layout.css";

export default async function RootLayout({ children }) {
    return (
        <StoreProvider>
            <div>
                <div>
                    <div className="container">
                        <NavBar />
                        <div className="wrapper">
                            {children}
                        </div>
                        <ChatBot />
                        <Footer />
                    </div>
                </div>
            </div>
        </StoreProvider>
    )
}