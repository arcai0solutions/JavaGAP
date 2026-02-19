'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
    videoReady: boolean;
}

const text = "Your vision executed without boundaries.";

export default function Preloader({ onComplete, videoReady }: PreloaderProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [textComplete, setTextComplete] = useState(false);
    const [shouldExit, setShouldExit] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setTextComplete(true);
            }
        }, 40); // Typing speed

        return () => clearInterval(typingInterval);
    }, []);

    useEffect(() => {
        if (textComplete && videoReady) {
            const timer = setTimeout(() => {
                setShouldExit(true);
                setTimeout(onComplete, 800);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [textComplete, videoReady, onComplete]);

    return (
        <AnimatePresence>
            {!shouldExit && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wide text-center px-4">
                        {displayedText}
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            className="inline-block w-[2px] h-[1em] bg-white ml-1 align-middle"
                        />
                    </h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
