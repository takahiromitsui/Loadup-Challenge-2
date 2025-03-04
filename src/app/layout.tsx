import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Box } from '@chakra-ui/react';
import Providers from '@/components/providers';
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
				<Providers>
					<Box minH='100vh' bg='gray.50'>
						<Sidebar />
						<Navbar />
						<Box
							as='main'
							ml={{ base: '96px', lg: '240px' }}
							transition='margin-left 0.3s'
							pt='80px'
						>
							{children}
						</Box>
					</Box>
				</Providers>
			</body>
		</html>
	);
}
