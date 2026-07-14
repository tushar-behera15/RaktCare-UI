import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rakt Care | Login",
    description: "Login to your Rakt Care account",
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>{children}</div>
    );
}
