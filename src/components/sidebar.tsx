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
import { LuMenu, LuChevronRight, LuChevronLeft } from 'react-icons/lu';
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
		>
			<Flex direction='column' h='full' py='21px' px='22px'>
				<Flex align='center' justify='center' mb='55px'>
					{isOpen ? (
						<Text
							textAlign='center'
							width='full'
							fontSize='26px'
							fontWeight='700'
							lineHeight='29.62px'
							letterSpacing='0px'
							color='#1C170D'
						>
							LoadUp Portal
						</Text>
					) : (
						<Image src='/img/logo.svg' alt='logo' width={54} height={54} />
					)}
				</Flex>

				{/* Toggle Button */}
				<Box
					position='absolute'
					left={isOpen ? '208px' : '64px'}
					top='89px'
					transition='left 0.3s ease'
				>
					<IconButton
						aria-label='Toggle Sidebar'
						variant='ghost'
						onClick={() => setIsOpen(!isOpen)}
						size='sm'
						borderRadius='full'
						bg='white'
						boxShadow='md'
						_hover={{ bg: 'gray.100' }}
					>
						{isOpen ? (
							<LuChevronLeft onClick={() => setIsOpen(!isOpen)} />
						) : (
							<LuChevronRight onClick={() => setIsOpen(!isOpen)} />
						)}
					</IconButton>
				</Box>

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
