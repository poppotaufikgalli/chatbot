"use client";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export default function ChatPage() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [chat]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    if (!msg.trim()) return;

    const userMsg = msg;
    setMsg("");
    setChat((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMsg, sessionId })
      });
      const data = await res.json();

      setSessionId(data.sessionId);
      setChat((prev) => [...prev, { role: 'bot', text: data.reply }]);
    } catch (err) {
      console.error("Error sending message:", err);
      setChat((prev) => [...prev, { role: 'bot', text: "Maaf, terjadi kesalahan. Silakan coba lagi." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[85vh] border border-gray-200 dark:border-gray-700">

        {/* Header */}
        <div className="bg-blue-600 p-4 shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">AI Assistant</h2>
              <div className="flex items-center gap-1.5 opacity-90">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-blue-50 text-xs font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
          {chat.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-3 opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              <p className="text-sm font-medium">Mulai percakapan dengan AI</p>
            </div>
          )}

          {chat.map((c, i) => (
            <div
              key={i}
              className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${c.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed ${c.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-600'
                  }`}
              >
                {c.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-white dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-600 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <form onSubmit={send} className="flex gap-2">
            <input
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Ketik pesan anda..."
              className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white border-0 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400"
              disabled={isLoading}
              ref={inputRef}
            />
            <button
              type="submit"
              disabled={isLoading || !msg.trim()}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white p-3 rounded-full shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none bg-gradient-to-r from-blue-600 to-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isLoading ? "opacity-0" : ""}>
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
