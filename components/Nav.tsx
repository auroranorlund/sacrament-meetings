'use client';
import { usePathname } from 'next/navigation';

import Link from "next/link";

export default function Nav() {
    const pathname = usePathname();
    return (
        <nav className="max-w-4xl px-4 flex mx-auto text-2xl bg-primary text-background min-w-screen justify-center">
            <ul className="flex gap-4 flex-row justify-evenly min-w-screen">
                <li className="p-3 hover:bg-accent"><Link href="/" className={`[&.active]:underline ${pathname === '/' ? 'active' : ''}`}>Home</Link></li>
                <li className="p-3 hover:bg-accent"><Link href="/meetings" className={`[&.active]:underline ${pathname === '/meetings' ? 'active' : ''}`}>Meetings</Link></li>
            </ul>
        </nav>
    );
}