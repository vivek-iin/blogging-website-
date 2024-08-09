import { HomeIcon, List, MessageCircleMore } from 'lucide-react';
import LoginButton from './LoginButton';
import AuthContextProvider from '@/lib/contexts/AuthContext';
import Link from 'next/link';
export default function Header() {
    return <nav className="flex justify-between items-center px-7 py-3 border-b">
        <Link href={'/'}>
            <img className="h-10" src="./favicon.ico" alt="" />
        </Link>
        <ul className="flex gap-6 items-center">
            <Link href={'/'}>
                <li className='flex items-center gsp-2'>
                    <HomeIcon /> Home</li>
            </Link>

            <Link href={'/categories'}>
                <li className='flex items-center gap-2'>
                    <List />
                    Categories
                </li>
            </Link>
            <Link href={'/'}>
                <li className='flex items-center gap-2'>
                    <MessageCircleMore />Contact</li>
            </Link>
        </ul>
        <AuthContextProvider >
            <LoginButton />
        </AuthContextProvider>
    </nav>
}