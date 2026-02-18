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
    { label: 'Instagram', link: 'https://www.instagram.com/javagap.ae/' },
    { label: 'Facebook', link: 'https://www.facebook.com/share/1DJprGDKoM/?mibextid=wwXIfr' },
    { label: 'Youtube', link: '#' },
    { label: 'Linkedin', link: 'https://www.linkedin.com/in/java-global-access-platform-fz-llc-bb392a3b1/' }
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
        <section className="h-screen w-full px-[4px] pt-[4px] pb-[10px] sm:p-[10px] relative z-[100]">
            {showPreloader && (
                <Preloader
                    onComplete={handlePreloaderComplete}
                    videoReady={videoReady}
                />
            )}

            {/* Staggered Menu - Moved outside to prevent clipping */}
            <div className="absolute inset-x-[4px] top-[4px] bottom-[10px] sm:inset-[10px] z-50 pointer-events-none">
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
                <div className="absolute inset-0 bg-black/70 sm:bg-black/60 pointer-events-none" />

                {/* Logo Container */}
                <div className="absolute left-8 sm:left-12 top-8 lg:top-8 h-14 lg:h-auto bg-white rounded-xl lg:rounded-2xl p-2 z-[60] hidden lg:flex items-center">
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

                <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-72 sm:px-12 sm:pb-40 max-w-7xl items-center sm:items-start">
                    <h1 className="text-[2.6rem] sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-10 font-['Neospeed'] text-center sm:text-left leading-tight">
                        Your Global <br /> <span className="whitespace-nowrap">Delivery Partner</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-200 max-w-2xl text-justify sm:text-left">
                        We help overseas clients scale their tech and professional services <br className="hidden sm:inline" /> operations with the right people, processes, and support.
                    </p>
                </div>
            </div>
        </section>
    );
}
