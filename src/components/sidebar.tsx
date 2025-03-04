'use client';

import {
	Box,
	Flex,
	IconButton,
	VStack,
	useDisclosure,
	Icon,
} from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import { LuMenu } from 'react-icons/lu';
import {
	LuPackage,
	LuUsers,
	LuTruck,
	LuChevronDown,
	LuPlus,
	LuAward,
	LuUserPlus,
	LuSettings,
	LuLayoutGrid,
	LuImage,
} from 'react-icons/lu';
import { useState } from 'react';

interface NavItemProps {
	icon: any;
	isActive?: boolean;
	isExpanded: boolean;
	label: string;
}

const NavItem = ({ icon, isActive, isExpanded, label }: NavItemProps) => {
	return (
		<Tooltip content={!isExpanded ? label : undefined} showArrow>
			<Flex
				p={3}
				mx={2}
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'gray.100',
				}}
				bg={isActive ? 'blue.500' : 'transparent'}
				color={isActive ? 'white' : 'gray.600'}
				alignItems='center'
				w={isExpanded ? 'full' : 'auto'}
			>
				<Icon as={icon} boxSize={5} />
				{isExpanded && (
					<Box ml={4} display={{ base: 'none', md: 'block' }}>
						{label}
					</Box>
				)}
			</Flex>
		</Tooltip>
	);
};

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(true);
	const [activeItem, setActiveItem] = useState('Dashboard');

	return (
		<Box
			position='fixed'
			left={0}
			h='100vh'
			w={isOpen ? '240px' : '70px'}
			bg='white'
			boxShadow='sm'
			transition='width 0.3s ease'
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<Flex direction='column' h='full' py={4}>
				<Flex
					px={4}
					align='center'
					mb={8}
					justify={isOpen ? 'flex-end' : 'center'}
				>
					<IconButton
						aria-label='Toggle Sidebar'
						as={LuMenu}
						variant='ghost'
						onClick={() => setIsOpen(!isOpen)}
						size='sm'
					/>
				</Flex>

				<VStack gap={2} align='stretch' flex={1}>
					<NavItem
						icon={LuPackage}
						isActive={activeItem === 'Dashboard'}
						isExpanded={isOpen}
						label='Dashboard'
					/>
					<NavItem
						icon={LuUsers}
						isActive={activeItem === 'Team'}
						isExpanded={isOpen}
						label='Team'
					/>
					<NavItem
						icon={LuTruck}
						isActive={false}
						isExpanded={isOpen}
						label='Delivery'
					/>
					<NavItem
						icon={LuChevronDown}
						isActive={false}
						isExpanded={isOpen}
						label='More'
					/>
					<NavItem
						icon={LuPlus}
						isActive={false}
						isExpanded={isOpen}
						label='Add New'
					/>
					<NavItem
						icon={LuAward}
						isActive={false}
						isExpanded={isOpen}
						label='Awards'
					/>
					<NavItem
						icon={LuUserPlus}
						isActive={false}
						isExpanded={isOpen}
						label='Invite'
					/>
					<NavItem
						icon={LuSettings}
						isActive={false}
						isExpanded={isOpen}
						label='Settings'
					/>
					<NavItem
						icon={LuLayoutGrid}
						isActive={false}
						isExpanded={isOpen}
						label='Apps'
					/>
					<NavItem
						icon={LuImage}
						isActive={false}
						isExpanded={isOpen}
						label='Media'
					/>
				</VStack>
			</Flex>
		</Box>
	);
}
