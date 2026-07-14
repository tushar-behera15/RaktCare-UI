import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Rakt Care | Create Account",
  description:
    "Create your Rakt Care account. Register as a blood donor or a hospital to join a life-saving network.",
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`${geistSans.className} ${geistMono.className} flex items-center justify-center min-h-screen bg-background-secondary antialiased`}>
    {children}
  </div>;
}
