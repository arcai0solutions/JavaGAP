'use client';

import React from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'How We Work', ariaLabel: 'Our process', link: '/how-it-works' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function ContactHero() {
    return (
        <section className="h-[60vh] w-full p-[10px]">
            <div className="h-full w-full rounded-[2rem] bg-black overflow-hidden relative">

                {/* Staggered Menu */}
                <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
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
                            logoUrl="/java-logo.jpeg"
                            accentColor="#00AEEF"
                            onMenuOpen={() => console.log('Menu opened')}
                            onMenuClose={() => console.log('Menu closed')}
                            displayLogo={false}
                        />
                    </div>
                </div>

                {/* Logo Container */}
                <div className="absolute left-8 sm:left-12 top-8 bg-white rounded-2xl p-2 z-[60]">
                    <Link href="/" className="relative h-16 w-auto block">
                        <Image
                            src="/java-logo.jpeg"
                            alt="Java Gap Logo"
                            className="object-contain"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: 'auto', height: '100%' }}
                        />
                    </Link>
                </div>

                <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-16 sm:px-12 sm:pb-20 max-w-7xl">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-['Neospeed']">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-slate-200 max-w-2xl">
                        We'd love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>
            </div>
        </section>
    );
}
