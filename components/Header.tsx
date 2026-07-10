export default function Header() {
    return (
        <header className="bg-secondary text-foreground p-3 mx-auto px-4 flex text-xl min-w-screen">
            <div id="header-title" className="text-2xl min-w-full font-bold">Santa Barbara Ward <br /> <span className="text-lg font-normal">{new Date().toLocaleDateString('en-US')}</span></div>
        </header>
    );
}