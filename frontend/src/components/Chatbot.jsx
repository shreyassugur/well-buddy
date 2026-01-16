import { useState, useRef, useEffect } from 'react';
import { findBestMatch } from './chatbotData';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you regarding your rental needs today?", sender: "bot" }
    ]);
    const [inputValue, setInputValue] = useState("");

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        setMessages(prev => [...prev, { text: inputValue, sender: "user" }]);
        const userQuestion = inputValue;
        setInputValue("");

        // Simulate bot response with local data
        setTimeout(() => {
            const response = findBestMatch(userQuestion);
            setMessages(prev => [...prev, { text: response, sender: "bot" }]);
        }, 600);
    };

    return (
        <>
            <div className={`fixed bottom-4 right-4 z-50`}>
                <button
                    className="btn btn-circle btn-lg border-2 border-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-12"
                    onClick={toggleChat}
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                    )}
                </button>
            </div>

            {isOpen && (
                <div className="fixed bottom-24 right-4 z-50 w-80 md:w-96 bg-base-100 shadow-2xl rounded-2xl border border-base-200 overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="avatar online">
                                <div className="w-10 rounded-full bg-base-100 p-0.5">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Bot" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Rental Buddy</h3>
                                <span className="text-xs opacity-80">Always here to help</span>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="btn btn-ghost btn-circle btn-sm hover:bg-primary-focus">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/50 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-base-300">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
                                <div className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-base-100 border-t border-base-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="input input-bordered w-full focus:outline-none focus:border-primary rounded-full px-4"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary btn-circle shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
