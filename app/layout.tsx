import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: "Media Downloader",
    description: "A tool for downloading media files",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    <Toaster duration={2400} richColors position="top-center" />
                    <div className="">
                        <div className="w-full mx-auto h-dvh bg-white/60 dark:bg-primary-foreground/70 py-4 px-3 lg:px-6 relative backdrop-blur-sm border-border">
                            <div className="flex-1">
                                {children}
                            </div>
                            <Footer />
                        </div>
                    </div>
                    <ShootingStars />
                    <StarsBackground />
                </ThemeProvider>
            </body>
        </html>
    );
}
