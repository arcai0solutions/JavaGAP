"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

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
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

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

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="w-[350px] sm:w-[400px] h-[500px] sm:h-[600px] bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-[#00AEEF] to-[#0077A3] text-white flex items-center justify-between shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0077A3] rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">JavaGAP Support</h3>
                                    <p className="text-xs text-white/80">Premium AI Assistant</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20 hover:text-white rounded-full"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <ScrollArea className="flex-1 p-4 bg-transparent" ref={scrollRef}>
                            <div className="space-y-4 pb-4">
                                {messages.length === 0 && (
                                    <div className="text-center p-6 text-muted-foreground text-sm">
                                        <div className="w-16 h-16 bg-[#00AEEF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <MessageCircle className="w-8 h-8 text-[#00AEEF]" />
                                        </div>
                                        <p className="font-medium text-foreground mb-1">Welcome to Java Global Access!</p>
                                        <p>How can we assist you today?</p>
                                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                            <button onClick={() => setInputValue("Tell me about your services")}
                                                className="text-xs bg-secondary/50 hover:bg-secondary px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-border">
                                                Services
                                            </button>
                                            <button onClick={() => setInputValue("Where are you located?")}
                                                className="text-xs bg-secondary/50 hover:bg-secondary px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-border">
                                                Location
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"
                                            }`}
                                    >
                                        <Avatar className="w-8 h-8 border border-white/10 shadow-sm mt-1">
                                            {m.role === "user" ? (
                                                <>
                                                    <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800"><User className="w-4 h-4" /></AvatarFallback>
                                                </>
                                            ) : (
                                                <AvatarFallback className="bg-[#00AEEF] text-white"><Bot className="w-4 h-4" /></AvatarFallback>
                                            )}
                                        </Avatar>

                                        <div
                                            className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm shadow-sm ${m.role === "user"
                                                ? "bg-[#00AEEF] text-white"
                                                : "bg-zinc-100 dark:bg-zinc-800/80 text-foreground border border-white/10 dark:border-white/5 backdrop-blur-sm"
                                                }`}
                                        >
                                            <div className="leading-relaxed text-sm">
                                                {renderContent(m.content)}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Loading Indicator */}
                                {isLoading && (
                                    <div className="flex gap-3">
                                        <Avatar className="w-8 h-8 border border-white/10 shadow-sm mt-1">
                                            <AvatarFallback className="bg-[#00AEEF] text-white"><Bot className="w-4 h-4" /></AvatarFallback>
                                        </Avatar>
                                        <div className="bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center mx-4">
                                        {error}
                                    </div>
                                )}

                                <div ref={scrollRef} className="h-px" />
                            </div>
                        </ScrollArea>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-white/50 dark:bg-black/20 border-t border-white/20 dark:border-white/10 backdrop-blur-md">
                            <div className="flex gap-2 relative">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message..."
                                    className="rounded-full bg-white/50 dark:bg-zinc-900/50 border-white/20 focus-visible:ring-[#00AEEF] pr-12 backdrop-blur-sm"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="absolute right-1 top-1 h-8 w-8 rounded-full bg-[#00AEEF] hover:bg-[#0095CC] text-white transition-all shadow-md"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </Button>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider opacity-70">
                                    Powered by ARC AI
                                </p>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <div className="relative">
                <AnimatePresence>
                    {!isOpen && (
                        <>
                            <motion.div
                                className="absolute -inset-2 bg-[#00AEEF]/50 rounded-full z-[-1]"
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 1.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            />
                            <motion.div
                                className="absolute -inset-2 bg-[#00AEEF]/30 rounded-full z-[-1]"
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 1.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                            />
                        </>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-16 w-16 rounded-full bg-[#00AEEF] hover:bg-[#0095CC] text-white shadow-xl shadow-blue-500/30 flex items-center justify-center transition-all duration-300 relative group overflow-hidden"
                >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-8 h-8" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0, rotate: 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: -90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <MessageCircle className="w-8 h-8" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
}
