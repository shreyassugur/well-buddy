import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post("/api/chat", {
                message: input,
            });

            const aiMessage = {
                sender: "ai",
                text: response.data.reply,
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "AI failed to respond. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto h-[80vh] flex flex-col">
            <h1 className="text-2xl font-bold mb-4">WellBuddy AI</h1>

            <div className="flex-1 overflow-y-auto border rounded p-4 mb-4 bg-gray-50">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"
                            }`}
                    >
                        <span
                            className={`inline-block px-4 py-2 rounded-lg ${msg.sender === "user"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-300 text-black"
                                }`}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}

                {loading && (
                    <div className="text-left mb-3">
                        <span className="inline-block px-4 py-2 rounded-lg bg-gray-300">
                            WellBuddy AI is typing...
                        </span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 border rounded px-4 py-2"
                    placeholder="Ask about fitness, diet, productivity..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;