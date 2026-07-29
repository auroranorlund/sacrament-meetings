import { auth } from '@/auth';
import { SignOutButton } from './SignOutButton';
import Link from "next/link";

export default async function Header() {
    const session = await auth();
    if (!session) {
        return (
            <header className="bg-secondary text-foreground p-3 mx-auto px-4 flex text-xl min-w-screen">
                <div id="header-title" className="text-2xl min-w-full font-bold">Santa Barbara Ward <br />
                <span className="text-lg font-normal">{new Date().toLocaleDateString('en-US')}</span>
                <div><Link href="/login">Log In</Link></div>
                </div>
            </header>
        );
    }
    else {
        return (
            <header className="bg-secondary text-foreground p-3 mx-auto px-4 flex text-xl min-w-screen">
                <div id="header-title" className="text-2xl min-w-full font-bold">
                    Santa Barbara Ward <br /> <span className="text-lg font-normal">{new Date().toLocaleDateString('en-US')}</span>
                    <div><SignOutButton /></div>
                </div>
            </header>
        )
    }
}