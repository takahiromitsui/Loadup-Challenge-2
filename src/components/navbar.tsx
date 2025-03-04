'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useSidebar } from './providers/sidebar-provider';

export default function Navbar() {
	const { isOpen } = useSidebar();
	const pathname = usePathname();
	const pageName = pathname.split('/').pop() || 'Dashboard';
	const formattedPageName =
		pageName.charAt(0).toUpperCase() + pageName.slice(1);

	return (
		<Box
			position='fixed'
			top={0}
			right={0}
			left={isOpen ? '240px' : '96px'}
			height='80px'
			bg='white'
			transition='left 0.3s ease'
			borderBottom='1px'
			borderColor='gray.200'
			zIndex={10}
			as='header'
		>
			<Flex px='32px' h='full' align='center' justify='space-between'>
				<Text
					fontSize='24px'
					fontWeight='600'
					color='#1C170D'
					fontFamily='Plus Jakarta Sans'
				>
					{formattedPageName}
				</Text>

				{/* Placeholder for user profile - will be replaced with actual user data later */}
				<Flex align='center' gap={4}>
					{/* Add user profile components here */}
				</Flex>
			</Flex>
		</Box>
	);
}
