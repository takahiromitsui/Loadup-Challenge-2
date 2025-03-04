import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Box } from '@chakra-ui/react';
import Providers from '@/components/providers';
import Sidebar from '@/components/sidebar';

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
						<Box ml={{ base: 0, lg: '240px' }} transition='margin-left 0.3s'>
							{/* <Navbar />
							<Box
								as='main'
								pt='80px' // 60px navbar height + 20px spacing
								px={{ base: '6', lg: '10' }}
							> */}
							{children}
						</Box>
					</Box>
				</Providers>
			</body>
		</html>
	);
}
