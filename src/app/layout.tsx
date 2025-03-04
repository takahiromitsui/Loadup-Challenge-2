import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/providers';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Loadup App',
	description: 'Loadup App',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={plusJakartaSans.className}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
