import React, { useState } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: "bot", text: "Hi there! How can I help you today?" },
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: "user", text: message };
    setChatHistory((prev) => [...prev, userMsg]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Thanks for reaching out! This is a custom React chat preview.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-125 w-90 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 transition-all duration-200 ease-out sm:w-100">
          {/* Header */}
          <div className="flex items-center justify-between bg-(--bg-color) px-4 py-4 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot size={30} />
              </div>
              <div>
                <h3 className="font-semibold text-lg leading-none">
                  DoBu Assistant
                </h3>
                <span className="text-[11px] text-(--primary-color)">
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="rounded-lg p-1 text-indigo-100 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-4">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-(--accent-color) text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-slate-100 p-3 bg-white flex gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-(--accent-color) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--accent-color) transition-all"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--accent-color) text-white hover:bg-red-500 active:scale-95 transition-all shadow-md shadow-indigo-200"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 active:scale-90 ${
          isOpen
            ? "bg-(--accent-color) hover:bg-red-500 rotate-90 shadow-slate-300"
            : "bg-(--accent-color) hover:bg-red-500 hover:shadow-indigo-300"
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default Chatbot;
