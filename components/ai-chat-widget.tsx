"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, X, Send, User, Bot, Loader2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PopupModal } from "react-calendly";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

export function AiChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Welcome to Java Global Access! How can I help you today?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // Scroll visibility handler
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsOpen(false); // Close chat if we scroll back to top
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return;

        setError(null);

        // Add user message
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: trimmedInput,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            // Prepare API payload
            const apiMessages = [...messages, userMessage].map(msg => ({
                role: msg.role,
                content: msg.content,
            }));

            // Call API
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}`);
            }

            // Add assistant message
            setMessages(prev => [...prev, {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: data.content,
            }]);

        } catch (err) {
            console.error("Chat error:", err);
            setError(err instanceof Error ? err.message : "Failed to send message");
        } finally {
            setIsLoading(false);
        }
    };

    // Content renderer with Markdown support
    const renderContent = (content: string) => {
        // ... (existing renderContent implementation remains unchanged) ...
        // 1. Split by newlines to handle paragraphs
        return content.split('\n').map((line, lineIndex) => {
            if (!line.trim()) return <br key={lineIndex} />;

            // 2. Parse Markdown links: [text](url)
            const parts = [];
            let lastIndex = 0;
            const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
            let match;

            while ((match = linkRegex.exec(line)) !== null) {
                // Push text before link
                if (match.index > lastIndex) {
                    parts.push({
                        type: 'text',
                        content: line.slice(lastIndex, match.index)
                    });
                }

                // Push link
                parts.push({
                    type: 'link',
                    text: match[1],
                    url: match[2]
                });

                lastIndex = linkRegex.lastIndex;
            }

            // Push remaining text
            if (lastIndex < line.length) {
                parts.push({
                    type: 'text',
                    content: line.slice(lastIndex)
                });
            }

            return (
                <p key={lineIndex} className="mb-1 last:mb-0">
                    {parts.map((part, partIndex) => {
                        if (part.type === 'link') {
                            return (
                                <a
                                    key={partIndex}
                                    href={part.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#00AEEF] hover:underline font-medium"
                                >
                                    {part.text}
                                </a>
                            );
                        }

                        // 3. Parse Bold: **text**
                        const textContent = part.content || '';
                        const boldParts = textContent.split(/(\*\*[^*]+\*\*)/g);

                        return boldParts.map((subPart, subIndex) => {
                            if (subPart.startsWith('**') && subPart.endsWith('**')) {
                                return <strong key={subIndex} className="font-semibold">{subPart.slice(2, -2)}</strong>;
                            }
                            return subPart;
                        });
                    })}
                </p>
            );
        });
    };

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Wait for the component to be mounted before setting the root element
        if (typeof window !== "undefined") {
            setRootElement(document.getElementById("root"));
        }
    }, []);

    const handleCalendarClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsCalendarOpen(true);
    };

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 perspective-[1000px]"
                    >
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 20, rotateX: 10 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="w-[330px] sm:w-[380px] h-[450px] sm:h-[550px] bg-white/90 dark:bg-black/90 backdrop-blur-2xl border border-white/40 dark:border-white/20 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform-gpu relative"
                                    style={{
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)"
                                    }}
                                >
                                    {/* 3D Header */}
                                    <div className="relative p-4 bg-gradient-to-br from-[#00AEEF] via-[#0077A3] to-[#005495] text-white flex items-center justify-between z-10 overflow-hidden">
                                        {/* Glossy overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                                        <div className="flex items-center gap-3 relative z-10">
                                            <div className="relative group">
                                                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.2)] border border-white/30 transform transition-transform group-hover:scale-105 duration-300">
                                                    <Bot className="w-6 h-6 text-white drop-shadow-md" />
                                                </div>
                                                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#00ff88] border-[2px] border-[#005495] rounded-full shadow-lg animate-pulse"></span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg drop-shadow-sm tracking-tight text-white">JavaGAP AI</h3>
                                                <p className="text-[10px] text-blue-100 font-medium tracking-wide opacity-90">Premium Support Agent</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-white hover:bg-white/20 hover:text-white rounded-full relative z-10 transition-all active:scale-95 h-8 w-8"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <X className="w-5 h-5 drop-shadow-sm" />
                                        </Button>
                                    </div>

                                    {/* Messages Area - with subtle depth pattern */}
                                    <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-slate-50 to-white dark:from-zinc-900 dark:to-black" ref={scrollRef}>
                                        <div className="space-y-6 pb-4">
                                            {messages.length === 0 && (
                                                <div className="flex flex-col items-center justify-center h-full pt-6 px-4">
                                                    <div className="w-20 h-20 bg-gradient-to-tr from-[#00AEEF] to-[#005495] rounded-[2rem] flex items-center justify-center mb-5 shadow-[0_10px_30px_rgba(0,174,239,0.3),inset_0_2px_10px_rgba(255,255,255,0.3)] transform rotate-3">
                                                        <MessageCircle className="w-10 h-10 text-white drop-shadow-lg" />
                                                    </div>
                                                    <h4 className="text-lg font-bold text-foreground mb-2 text-center">Hello there! 👋</h4>
                                                    <p className="text-muted-foreground text-center mb-6 max-w-[250px] leading-relaxed text-sm">
                                                        I'm your JavaGAP assistant. I can help with services, locations, or general inquiries.
                                                    </p>
                                                    <div className="flex flex-wrap gap-2.5 justify-center">
                                                        {[
                                                            { label: "Our Services", query: "Tell me about your services" },
                                                            { label: "Locations", query: "Where are you located?" },
                                                            { label: "Contact Info", query: "How can I contact you?" }
                                                        ].map((item, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => setInputValue(item.query)}
                                                                className="text-xs font-medium bg-white dark:bg-zinc-800 text-foreground px-3.5 py-2 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_15px_rgba(0,174,239,0.15)] hover:-translate-y-0.5 border border-slate-100 dark:border-zinc-700 transition-all duration-300 active:scale-95 active:shadow-none"
                                                            >
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {messages.map((m) => (
                                                <div
                                                    key={m.id}
                                                    className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                                >
                                                    <div className="flex-shrink-0 mt-2">
                                                        {m.role === "user" ? (
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center shadow-md border border-white/50">
                                                                <User className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#005495] flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/20">
                                                                <Bot className="w-4 h-4 text-white" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div
                                                        className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm shadow-md transition-all duration-300 ${m.role === "user"
                                                            ? "bg-gradient-to-br from-[#00AEEF] to-[#0077A3] text-white rounded-tr-sm shadow-blue-500/10"
                                                            : "bg-white dark:bg-zinc-800 text-foreground rounded-tl-sm border border-slate-100 dark:border-zinc-700/50 shadow-slate-200/50 dark:shadow-black/20"
                                                            }`}
                                                    >
                                                        <div className={`leading-relaxed ${m.role === "user" ? "text-white/95" : "text-slate-700 dark:text-slate-200"}`}>
                                                            {renderContent(m.content)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {isLoading && (
                                                <div className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#005495] flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/20 mt-2">
                                                        <Bot className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md border border-slate-100 dark:border-zinc-700/50 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                        <span className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                        <span className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full animate-bounce"></span>
                                                    </div>
                                                </div>
                                            )}

                                            {error && (
                                                <div className="p-3 rounded-xl bg-red-50 border-l-4 border-red-500 text-red-600 text-sm shadow-sm mx-4 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                    {error}
                                                </div>
                                            )}

                                            <div ref={scrollRef} className="h-px" />
                                        </div>
                                    </ScrollArea>

                                    {/* Input Area - 3D Floating Bar Style */}
                                    <div className="p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-white/50 dark:border-white/10 relative z-20">
                                        <form onSubmit={handleSubmit} className="relative group">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00AEEF] to-[#005495] rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur opacity-20 group-focus-within:opacity-50"></div>
                                            <div className="relative flex items-center bg-white dark:bg-zinc-950 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-slate-200 dark:border-zinc-800 focus-within:border-[#00AEEF]/50 transition-all duration-300">
                                                <Input
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    placeholder="Type a message..."
                                                    className="border-0 bg-transparent focus-visible:ring-0 px-4 py-5 h-12 text-sm placeholder:text-slate-400"
                                                    disabled={isLoading}
                                                />
                                                <div className="pr-1.5">
                                                    <Button
                                                        type="submit"
                                                        size="icon"
                                                        disabled={isLoading || !inputValue.trim()}
                                                        className="h-9 w-9 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0077A3] text-white shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                                                    >
                                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="text-center mt-2">
                                            <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 dark:text-zinc-600 flex items-center justify-center gap-1.5">
                                                <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
                                                Powered by ARC AI
                                                <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {!isOpen && (
                                <>
                                    {/* Calendar Button */}
                                    <motion.div
                                        key="calendar-btn"
                                        initial={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
                                        animate={{ opacity: 1, y: 0, height: "auto", marginBottom: 12, transition: { delay: 0.1 } }}
                                        exit={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
                                        className="relative group perspective-[500px]"
                                    >
                                        <motion.button
                                            onClick={handleCalendarClick}
                                            whileHover={{ scale: 1.1, rotateY: 10, rotateX: -10 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center transition-all duration-500 relative overflow-hidden group border-2 border-white/20 shadow-lg"
                                            style={{
                                                boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.5), inset 0 4px 10px rgba(255, 255, 255, 0.4), inset 0 -4px 10px rgba(0, 0, 0, 0.2)"
                                            }}
                                        >
                                            {/* Shine effect */}
                                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />
                                            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-black/10 to-transparent rounded-br-full pointer-events-none" />

                                            <Calendar className="w-7 h-7 md:w-8 md:h-8 drop-shadow-md text-white" />
                                        </motion.button>

                                        {/* Tooltip */}
                                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                            Book a Meeting
                                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
                                        </div>
                                    </motion.div>

                                    {/* WhatsApp Button */}
                                    <motion.div
                                        key="whatsapp-btn"
                                        initial={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
                                        animate={{ opacity: 1, y: 0, height: "auto", marginBottom: 12 }}
                                        exit={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
                                        className="relative group perspective-[500px]"
                                    >
                                        <motion.a
                                            href="https://wa.me/971565439655"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, rotateY: 10, rotateX: -10 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#25D366] via-[#128C7E] to-[#075E54] text-white flex items-center justify-center transition-all duration-500 relative overflow-hidden group border-2 border-white/20 shadow-lg"
                                            style={{
                                                boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.5), inset 0 4px 10px rgba(255, 255, 255, 0.4), inset 0 -4px 10px rgba(0, 0, 0, 0.2)"
                                            }}
                                        >
                                            {/* Shine effect */}
                                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />
                                            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-black/10 to-transparent rounded-br-full pointer-events-none" />

                                            <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 drop-shadow-md text-white fill-current" />
                                        </motion.a>

                                        {/* Tooltip */}
                                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                            Chat on WhatsApp
                                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>

                        {/* 3D Floating Toggle Button */}
                        <div className="relative group perspective-[500px]">
                            <AnimatePresence>
                                {!isOpen && (
                                    <>
                                        {/* Pulse rings */}
                                        <motion.div
                                            className="absolute -inset-4 bg-[#00AEEF]/20 rounded-full z-[-1]"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.4, 1.6] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                                        />
                                        <motion.div
                                            className="absolute -inset-2 bg-[#00AEEF]/40 rounded-full z-[-1]"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: [0, 0.4, 0], scale: [0.9, 1.2, 1.3] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                        />
                                    </>
                                )}
                            </AnimatePresence>

                            <motion.button
                                whileHover={{ scale: 1.1, rotateY: 10, rotateX: -10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsOpen(!isOpen)}
                                className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#00AEEF] via-[#0088CC] to-[#005495] text-white flex items-center justify-center transition-all duration-500 relative overflow-hidden group border-4 border-white/20 active:shadow-inner"
                                style={{
                                    boxShadow: "0 20px 40px -10px rgba(0, 174, 239, 0.6), inset 0 4px 10px rgba(255, 255, 255, 0.4), inset 0 -4px 10px rgba(0, 0, 0, 0.2)"
                                }}
                            >
                                {/* Shine effect */}
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />
                                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-black/10 to-transparent rounded-br-full pointer-events-none" />

                                <AnimatePresence mode="wait">
                                    {isOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                                            transition={{ duration: 0.4, type: "spring" }}
                                        >
                                            <X className="w-7 h-7 md:w-8 md:h-8 drop-shadow-md" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="open"
                                            initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
                                            transition={{ duration: 0.4, type: "spring" }}
                                            className="relative"
                                        >
                                            <MessageCircle className="w-7 h-7 md:w-8 md:h-8 drop-shadow-md" />
                                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#005495] shadow-sm animate-bounce" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isCalendarOpen && rootElement && (
                <PopupModal
                    url="https://calendly.com/javagap-info/30min"
                    onModalClose={() => setIsCalendarOpen(false)}
                    open={isCalendarOpen}
                    rootElement={rootElement}
                />
            )}
        </>
    );
}
