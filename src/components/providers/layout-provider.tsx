'use client';

import { Box } from '@chakra-ui/react';
import { useSidebar } from './sidebar-provider';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';

export function LayoutProvider({ children }: { children: React.ReactNode }) {
	const { isOpen } = useSidebar();

	return (
		<Box minH='100vh' bg='gray.50'>
			<Sidebar />
			<Navbar />
			<Box
				as='main'
				ml={isOpen ? '260px' : '116px'}
				transition='margin-left 0.3s ease'
				pt='116px'
				pr='20px'
				width={`calc(100% - ${isOpen ? '260px' : '116px'} )`}
			>
				{children}
			</Box>
		</Box>
	);
}
