"use client"; 

import { HomeIcon, List, MessageCircleMore } from 'lucide-react';
import LoginButton from './LoginButton';
import AuthContextProvider from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex flex-wrap justify-between items-center px-7 py-3 border-b ">
            {/* Logo */}
            <Link href={'/'}>
                <img className="h-10" src="./favicon.ico" alt="Logo" />
            </Link>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden block focus:outline-none ml-auto"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <List className="w-6 h-6" />
            </button>

            {/* Navigation Links */}
            <ul
                className={`lg:flex gap-6 items-center ${
                    isMenuOpen ? 'block' : 'hidden'
                } w-full lg:w-auto lg:ml-auto`}
            >
                <Link href={'/'}>
                    <li className="flex items-center gap-2 py-2 lg:py-0 lg:justify-end">
                        <HomeIcon /> Home
                    </li>
                </Link>

                <Link href={'/categories'}>
                    <li className="flex items-center gap-2 py-2 lg:py-0 lg:justify-end">
                        <List /> Categories
                    </li>
                </Link>

                <Link href={'/'}>
                    <li className="flex items-center gap-2 py-2 lg:py-0 lg:justify-end">
                        <MessageCircleMore /> Contact
                    </li>
                </Link>
            </ul>

            {/* Authentication Button */}
            <AuthContextProvider>
                <div className="hidden lg:block ml-6">
                    <LoginButton />
                </div>
                {/* For mobile view */}
                {isMenuOpen && (
                    <div className="block lg:hidden mt-2">
                        <LoginButton />
                    </div>
                )}
            </AuthContextProvider>
        </nav>
    );
}
