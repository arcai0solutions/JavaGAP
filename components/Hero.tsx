'use client';

import React, { useState, useEffect } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import Image from 'next/image';
import Preloader from './Preloader';

const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'How We Work', ariaLabel: 'Our process', link: '/how-we-work' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function Hero() {
    const [videoReady, setVideoReady] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);

    const handlePreloaderComplete = () => {
        setAnimationComplete(true);
    };

    useEffect(() => {
        if (videoReady && animationComplete) {
            setShowPreloader(false);
        }
    }, [videoReady, animationComplete]);

    // Fallback timeout in case video takes too long (e.g., 5 seconds)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setVideoReady(true);
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="h-screen w-full p-[10px]">
            {showPreloader && (
                <Preloader
                    onComplete={handlePreloaderComplete}
                    videoReady={videoReady}
                />
            )}
            <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden relative">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    onCanPlayThrough={() => setVideoReady(true)}
                    onEnded={(e) => {
                        e.currentTarget.currentTime = 0;
                    }}
                >
                    <source src="/heo.mp4?v=2" type="video/mp4" />
                </video>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />

                {/* Staggered Menu */}
                <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
                    <div className="w-full h-full pointer-events-auto">
                        <StaggeredMenu
                            position="right"
                            items={menuItems}
                            socialItems={socialItems}
                            displaySocials
                            displayItemNumbering={false}
                            menuButtonColor="#000000"
                            openMenuButtonColor="#000"
                            changeMenuColorOnOpen={true}
                            colors={['#005495', '#00AEEF']}
                            logoUrl="/java-logo.jpeg"
                            accentColor="#00AEEF"
                            onMenuOpen={() => console.log('Menu opened')}
                            onMenuClose={() => console.log('Menu closed')}
                            displayLogo={false}
                        />
                    </div>
                </div>

                {/* Logo Container */}
                <div className="absolute left-8 sm:left-12 top-8 bg-white rounded-2xl p-2 z-20">
                    <div className="relative h-16 w-auto">
                        <Image
                            src="/java-logo.jpeg"
                            alt="Java Gap Logo"
                            className="object-contain"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: 'auto', height: '100%' }}
                        />
                    </div>
                </div>

                <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-32 sm:px-12 sm:pb-40 max-w-7xl">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-10 font-['Neospeed']">
                        Global Delivery for Tech <br /> & Professional Services.
                    </h1>
                    <p className="text-lg text-slate-200 max-w-4xl">
                        Java Global Access Platform (JavaGAP) provides structured professional services and managed operational support for overseas clients, backed by disciplined governance, standardized workflows, <br /> and scalable delivery teams.
                    </p>
                </div>
            </div>
        </section>
    );
}
