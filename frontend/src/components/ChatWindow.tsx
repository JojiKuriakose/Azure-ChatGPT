import React, { useEffect, useState} from 'react'
import type { Message, Mode } from '../types'
import { ModeSelector } from './ModeSelector'
import { sendMessage } from '../services/chatService'
import { MessageBubble } from './MessageBubble'

export const ChatWindow = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [mode, setMode] = useState<Mode>("global")
    const [isTyping, setIsTyping] = useState(false)
    const chatContainerRef = React.useRef<HTMLDivElement>(null)

    const handleSendMessage = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            role: 'user',
            content: input.trim(),
        }
        setMessages((prev) => [...prev, userMessage]);
        setInput("")
        setIsTyping(true)

        const data = await sendMessage(userMessage.content, mode);
        const assistantMessage: Message = {
            role: 'assistant',
            content: data.answer,
        }
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false)

        //Simulate assistant response
        //setTimeout(() => {
        //     const assistantMessage: Message = {
        //         role: 'assistant',
        //         content: `You said: "${userMessage.content}" in ${mode} mode.`
        //     }
        //    setMessages((prev) => [...prev, assistantMessage]);
        //    setIsTyping(false)
        //}, 1000)
    }

    // Auto scroll to bottom on new messages
    useEffect(() => {
        chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
        });
    }, [messages, isTyping]);

    return (
        <div className="flex flex-col h-[calc(100vh-3rem)] bg-gray-100 text-gray-900">
                {/* Header */}
                <header className="sticky top-0 bg-white shadow z-10 p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            🤖 Azure ChatGPT
                        </h1>
                        <ModeSelector mode={mode} onChange={setMode} />
                    </div>
                </header>

                {/* Messages */}
                <main ref={chatContainerRef} className='flex-1 overflow-y-auto px-4 py-6 space-y-4'>
                    {messages.map((message, index) =>
                        <MessageBubble key={index} message={message} />
                        // <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`} key={index}>
                        //     <div className={`relative px-4 py-3 rounded-xl max-w-[85%] ${message.role === "user"? "bg-blue-600 text-white"
                        //     : "bg-gray-200 text-gray-800"}`}>
                        //         {message.content}
                        //     </div>
                        // </div>
                    )}

                    {
                    isTyping && (
                        <div className='flex justify-start mb-4'>
                            <div className='relative px-4 py-3 rounded-xl max-w-[85%] bg-gray-200 text-gray-800'>
                                <TypingDots />
                            </div>
                        </div>
                    )
                    }
                </main>

                {/* Footer */}
                <footer className="bg-white p-4 border-t shadow-md">
                    <div className="relative mt-4">
                        <input
                            className="w-full border border-gray-300 rounded-full px-4 pr-12 py-3 text-sm shadow focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Ask anything..."
                            // disabled={isTyping}
                        />
                        <button
                            onClick={handleSendMessage}
                            //disabled={isTyping}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm disabled:opacity-50"
                        >
                            ⮝
                        </button>
                    </div>
                </footer>
            </div>
        )
}

const TypingDots = () => (
  <div className="flex gap-1 text-lg">
    <span className="animate-bounce delay-0">.</span>
    <span className="animate-bounce delay-100">.</span>
    <span className="animate-bounce delay-200">.</span>
  </div>
);
