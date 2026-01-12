import React, { useEffect, useRef, useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import instance from "../axiosConfig.js";

/* Suggested quick questions */
const SUGGESTED_QUESTIONS = [
  "Is this product good for daily use?",
  "What are the main features of this product?",
  "Who should buy this product?",
  "Is this product worth the price?",
];

const AIChatBox = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hi 👋 Ask me anything about "${product.name}".`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  /* Auto scroll */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text = input) {
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await instance.post("/chat", {
        message: text,
        product: {
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.discountedPrice || product.originalPrice,
        },
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry 😔 AI is not available right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🔵 FLOATING ICON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg z-40"
        title="Ask AI"
      >
        <FaRobot size={24} />
      </button>

      {/* 🌑 OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-end sm:justify-end">
          {/* 💬 CHAT BOX */}
          <div
            className="
              w-full h-[85%]
              sm:w-[520px] sm:h-[640px]
              sm:mr-6 sm:mb-6
              bg-white
              rounded-t-2xl sm:rounded-2xl
              shadow-2xl
              flex flex-col
              animate-slideUp
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3 bg-teal-600 text-white rounded-t-2xl">
              <h3 className="text-sm font-semibold">
                Ask AI about this product 🤖
              </h3>
              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* CHAT BODY */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-slate-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm p-3 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-teal-600 text-white ml-auto text-right"
                      : "bg-slate-200 text-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="text-xs text-gray-500 italic">
                  AI is typing...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* SUGGESTED QUESTIONS */}
            <div className="flex flex-wrap gap-2 px-4 py-2 border-t">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  className="text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* INPUT */}
            <div className="flex items-center gap-2 p-4 border-t">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about this product..."
                disabled={loading}
                className="flex-1 text-sm border rounded-md px-3 py-2 disabled:bg-gray-100"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBox;
