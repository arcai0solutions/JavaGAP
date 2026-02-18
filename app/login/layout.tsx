import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Login | Java Global Access Platform FZ-LLC',
    description: 'Secure login for Java Global Access Platform administrators.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
