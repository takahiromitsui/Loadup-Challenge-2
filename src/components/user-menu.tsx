import {
	Box,
	Button,
	Icon,
	Menu,
	// MenuButton,
	// MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { IoChevronDown } from 'react-icons/io5';
import { LuSettings, LuLogOut } from 'react-icons/lu';
import Image from 'next/image';
import { useUser } from './providers/user-provider';

export default function UserMenu() {
	const { user } = useUser();

	return (
		<Box>
			<Button
				// as={MenuButton}
				variant='ghost'
				display='flex'
				alignItems='center'
				gap={2}
				p={2}
			>
				<Box
					position='relative'
					width='32px'
					height='32px'
					borderRadius='full'
					overflow='hidden'
				>
					<Image
						src={user.avatar}
						alt={`${user.firstName} ${user.lastName}`}
						fill
						style={{ objectFit: 'cover' }}
					/>
				</Box>
				<Icon as={IoChevronDown} color='gray.600' />
			</Button>
			{/* <MenuList>
				<MenuItem>
					<Icon as={LuSettings} mr={2} />
					Settings
				</MenuItem>
				<MenuItem>
					<Icon as={LuLogOut} mr={2} />
					Logout
				</MenuItem>
			</MenuList> */}
		</Box>
	);
}
