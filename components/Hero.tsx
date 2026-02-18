'use client';

import React, { useState, useEffect } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import Image from 'next/image';
import Link from 'next/link';
import Preloader from './Preloader';

const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'How We Work', ariaLabel: 'Our process', link: '/how-it-works' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
    { label: 'Instagram', link: '#' },
    { label: 'Facebook', link: '#' },
    { label: 'Youtube', link: '#' },
    { label: 'Linkedin', link: '#' }
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
        <section className="h-screen w-full p-[10px] relative z-[100]">
            {showPreloader && (
                <Preloader
                    onComplete={handlePreloaderComplete}
                    videoReady={videoReady}
                />
            )}

            {/* Staggered Menu - Moved outside to prevent clipping */}
            <div className="absolute inset-[10px] z-50 pointer-events-none">
                <div className="w-full h-full">
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
                        logoUrl="/java-global-access-logo.png"
                        accentColor="#00AEEF"
                        onMenuOpen={() => console.log('Menu opened')}
                        onMenuClose={() => console.log('Menu closed')}
                        displayLogo={false}
                    />
                </div>
            </div>

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
                    aria-hidden="true"
                >
                    <source src="/heo.mp4?v=2" type="video/mp4" />
                </video>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />

                {/* Logo Container */}
                <div className="absolute left-8 sm:left-12 top-8 lg:top-8 h-14 lg:h-auto bg-white rounded-xl lg:rounded-2xl p-2 z-[60] flex items-center">
                    <Link href="/" className="relative h-10 lg:h-16 w-auto block">
                        <Image
                            src="/java-global-access-logo.png"
                            alt="Java Gap Logo"
                            className="object-contain"
                            width={0}
                            height={0}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ width: 'auto', height: '100%' }}
                            priority
                        />
                    </Link>
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
