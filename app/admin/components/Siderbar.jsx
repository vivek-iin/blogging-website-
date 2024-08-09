import { Castle, ScanFace, ScrollText, SmilePlus } from "lucide-react";
import Link from 'next/link';

export default function Sidebar() {
    const links = [
        {
            name: 'Dashboard',
            link: '/admin',
            icon: <ScanFace />
        },
        {
            name: 'Post',
            link: '/admin/posts',
            icon: <ScrollText />
        },
        {
            name: 'Categories',
            link: '/admin/categories',
            icon: <Castle />
        },
        {
            name: 'Authors',
            link: '/admin/authors',
            icon: <SmilePlus />
        },
    ];

    return (
        <section className="w-[200px] border-r h-screen p-6">
            <ul className="w-full flex flex-col gap-6">
                {links.map((item, index) => (
                    <Link href={item.link} key={index}>
                        <li className="flex gap-3 items-center bg-blue-50 rounded-full px-5 py-2">
                            {item.icon}
                            <span className="font-bold">{item.name}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </section>
    );
}
