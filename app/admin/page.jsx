"use client"

import { List, PersonStanding, SidebarIcon, StickyNote } from "lucide-react";
import CountCard from "./components/CountCard";

export default function Page() {
    return (
        <main className="p-4 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CountCard name={'Posts'} path={'posts'} icon={<StickyNote />} />
                <CountCard name={'Authors'} path={'authors'} icon={<SidebarIcon />} />
                <CountCard name={'Categories'} path={'categories'} icon={<PersonStanding />} />
            </div>
        </main>
    );
}
