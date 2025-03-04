'use client';

import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useSidebar } from './providers/sidebar-provider';
import { useUser } from './providers/user-provider';
import { IoNotificationsOutline } from 'react-icons/io5';
import UserMenu from './user-menu';

export default function Navbar() {
	const { isOpen } = useSidebar();
	const pathname = usePathname();
	const { user } = useUser();

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
			as='header'
		>
			<Flex px='32px' h='full' align='center' justify='space-between'>
				<Text fontSize='26px' fontWeight='600' color='#1C170D'>
					Hi, {user.firstName} {user.lastName} 👋
				</Text>

				<Flex align='center' gap={4}>
					<IconButton
						aria-label='Notifications'
						variant='solid'
						fontSize='20px'
						bg='gray.200'
						color='black'
						_hover={{ bg: 'gray.100' }}
						rounded='full'
						w='42px'
						h='42px'
					>
						<IoNotificationsOutline className='font-size-[15px]' />
					</IconButton>
					<UserMenu />
				</Flex>
			</Flex>
		</Box>
	);
}
