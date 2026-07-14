import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rakt Care | Verify OTP",
    description: "Verify your Rakt Care account",
};

export default function VerifyOtpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>{children}</div>
    );
}
