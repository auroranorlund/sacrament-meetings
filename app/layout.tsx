import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const quicksand = Quicksand({
  weight: ['400', '500', '600', '700'],
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-screen">
        <Header />
        <Nav />
        {children}
          <Footer />
      </body>
    </html>
  );
}
