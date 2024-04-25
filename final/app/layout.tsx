import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Thread",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className}  min-h-screen`}>
                <div className="max-w-[430px] w-full h-full bg-black flex justify-center mx-auto border border-neutral-400 border-b-0 border-t-0 ">
                    {children}
                </div>
            </body>
        </html>
    );
}
