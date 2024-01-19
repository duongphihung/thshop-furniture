"use client"
import { AiOutlineClose, AiOutlineMessage, AiOutlineSend } from "react-icons/ai"
import "./chatbot.css"
import { BsRobot } from 'react-icons/bs'
import { useEffect, useRef, useState } from "react";

const ChatBot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const chatboxRef = useRef(null); 

    const handleChatbotRequest = async () => {
        if (!userInput.trim()) {
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:5000/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: userInput }),
            });
            const data = await response.json();
        
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { role: 'outcoming', text: userInput },
                { role: 'incoming', text: data.response },
            ]);
            setUserInput('');

            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // useEffect(() => {
    //     (function (d, m) {
    //         var kommunicateSettings = {
    //             "appId": "37e0faebe28a4d785de8009892bebc79c",
    //             "popupWidget": true,
    //             "automaticChatOpenOnNavigation": true
    //         };
    //         var s = document.createElement("script");
    //         s.type = "text/javascript";
    //         s.async = true;
    //         s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    //         var h = document.getElementsByTagName("head")[0];
    //         h.appendChild(s);
    //         window.kommunicate = m; m._globals = kommunicateSettings;
    //     })(document, window.kommunicate || {});
    // }, []);

    useEffect(() => {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }, [chatHistory]);

    return (
        <div className={`${showChatbot ? 'show-chatbot' : ''}`}>
            <button className="chatbot-toggler" onClick={toggleChatbot}>
                <span className="material-symbols-outline">
                    {showChatbot ? <AiOutlineClose /> : <AiOutlineMessage />}
                </span>
            </button>
            <div className="chatbot">
                <header>
                    <h2>Chatbot</h2>
                </header>
                <ul className="chatbox" ref={chatboxRef}>
                    <li className="chat incoming">
                        <span className="material-symbols-outline"><BsRobot /></span>
                        <p>Xin chào <br /> Tôi có thể giúp gì cho bạn</p>
                    </li>
                    {
                        chatHistory.map((message, index) => (
                            <li key={index} className={`chat ${message.role}`}>
                                {message.role === 'incoming' ? (
                                    <>
                                        <span className="material-symbols-outline"><BsRobot /></span>
                                        <p dangerouslySetInnerHTML={{ __html: message.text }}></p>
                                    </>
                                ) : (
                                    <>
                                        <p>{message.text}</p>
                                    </>
                                )}
                            </li>
                        ))
                    }
                </ul>
                <div className="chat-input">
                    <textarea
                        placeholder="Enter a message"
                        required
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    ></textarea>
                    <button className="material-symbols-btn" onClick={handleChatbotRequest}><AiOutlineSend /></button>
                </div>
            </div>
        </div>
    )
}

export default ChatBot