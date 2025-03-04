import { Avatar, Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { IoChevronDown } from 'react-icons/io5';

import { useUser } from './providers/user-provider';

export default function UserMenu() {
	const { user } = useUser();

	return (
		<Box>
			<Button variant='ghost' display='flex' alignItems='center' gap={2} p={2}>
				<Flex alignItems='center' gap={7}>
					<Avatar.Root size='md'>
						<Avatar.Image src={user.avatar} />
						<Avatar.Fallback name={`${user.firstName} ${user.lastName}`} />
					</Avatar.Root>
					<Text fontSize='18px' fontWeight='600' color='gray.600'>
						{user.firstName}
					</Text>
				</Flex>
				<Icon as={IoChevronDown} color='gray.600' />
			</Button>
		</Box>
	);
}
