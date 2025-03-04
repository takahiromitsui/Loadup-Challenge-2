'use client';

import {
	Box,
	Flex,
	IconButton,
	VStack,
	useDisclosure,
	Icon,
	Text,
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
import Image from 'next/image';
import { BsPersonSquare } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { LuHouse } from 'react-icons/lu';
import { GoPeople } from 'react-icons/go';
import { MdKeyboardCommandKey } from 'react-icons/md';

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
			w={isOpen ? '240px' : '96px'}
			bg='white'
			boxShadow='sm'
			transition='width 0.3s ease'
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<Flex direction='column' h='full' py='21px' px='22px'>
				<Flex
					px={4}
					align='center'
					mb={8}
					justify={isOpen ? 'flex-end' : 'center'}
				>
					{/* <IconButton
						aria-label='Toggle Sidebar'
						variant='ghost'
						onClick={() => setIsOpen(!isOpen)}
						size='sm'
					> */}
					{/* <Image src='/img/logo.svg' alt='logo' width={54} height={54} /> */}
					{isOpen ? (
						<Text fontSize='2xl' fontWeight='bold'>
							LoadUp Portal
						</Text>
					) : (
						<Image src='/img/logo.svg' alt='logo' width={54} height={54} />
					)}
					{/* </IconButton> */}
				</Flex>

				<VStack gap={2} align='stretch' flex={1}>
					<NavItem
						icon={BsPersonSquare}
						isActive={activeItem === 'Clients'}
						isExpanded={isOpen}
						label='Clients'
					/>
					<NavItem
						icon={LuTruck}
						isActive={false}
						isExpanded={isOpen}
						label='Campaigns'
					/>
					<NavItem
						icon={MdOutlineEmail}
						isActive={false}
						isExpanded={isOpen}
						label='Emails'
					/>
					<NavItem
						icon={LuHouse}
						isActive={false}
						isExpanded={isOpen}
						label='Properties'
					/>
					<NavItem
						icon={LuAward}
						isActive={false}
						isExpanded={isOpen}
						label='Talent Pool'
					/>
					<NavItem
						icon={LuSettings}
						isActive={false}
						isExpanded={isOpen}
						label='Settings'
					/>
					<NavItem
						icon={GoPeople}
						isActive={false}
						isExpanded={isOpen}
						label='Users'
					/>
					<NavItem
						icon={MdKeyboardCommandKey}
						isActive={false}
						isExpanded={isOpen}
						label='Control Tower'
					/>
					<NavItem
						icon={LuImage}
						isActive={false}
						isExpanded={isOpen}
						label='Image Generator'
					/>
				</VStack>
			</Flex>
		</Box>
	);
}
