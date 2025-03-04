'use client';

import {
	Box,
	Flex,
	IconButton,
	VStack,
	Icon,
	Text,
	Link,
} from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import { LuChevronRight, LuChevronLeft } from 'react-icons/lu';
import { LuTruck, LuAward, LuSettings, LuImage } from 'react-icons/lu';
import Image from 'next/image';
import { BsPersonSquare } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { LuHouse } from 'react-icons/lu';
import { GoPeople } from 'react-icons/go';
import { MdKeyboardCommandKey } from 'react-icons/md';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './providers/sidebar-provider';

interface NavItemProps {
	icon: any;
	isActive?: boolean;
	isExpanded: boolean;
	label: string;
	href: string;
}

const NavItem = ({ icon, isActive, isExpanded, label, href }: NavItemProps) => {
	const pathname = usePathname();
	const isCurrentPath = pathname === href;

	return (
		<Tooltip content={!isExpanded ? label : undefined} showArrow>
			<Link
				as={NextLink}
				href={href}
				_hover={{ textDecoration: 'none' }}
				_focus={{ outline: 'none', boxShadow: 'none' }}
				width={isExpanded ? 'full' : 'auto'}
				style={{ textDecoration: 'none' }}
				display='block'
			>
				<Flex
					p={3}
					mx={isExpanded ? 2 : 0}
					borderRadius='lg'
					role='group'
					cursor='pointer'
					_hover={{
						bg: 'loadUpBlue',
						color: 'white',
					}}
					_focus={{ outline: 'none' }}
					bg={isCurrentPath ? 'loadUpBlue' : 'transparent'}
					color={isCurrentPath ? 'white' : 'gray.600'}
					alignItems='center'
					justifyContent={isExpanded ? 'flex-start' : 'center'}
					w='full'
				>
					<Icon as={icon} boxSize={5} />
					{isExpanded && (
						<Box ml={4} display={{ base: 'none', md: 'block' }}>
							{label}
						</Box>
					)}
				</Flex>
			</Link>
		</Tooltip>
	);
};

export default function Sidebar() {
	const { isOpen, setIsOpen } = useSidebar();

	return (
		<Box
			position='fixed'
			left={0}
			h='100vh'
			w={isOpen ? '240px' : '96px'}
			bg='white'
			boxShadow='sm'
			transition='width 0.3s ease'
			zIndex={10}
		>
			<Flex direction='column' h='full' py='21px'>
				<Flex align='center' justify='center' mb='55px' h='54px'>
					{isOpen ? (
						<Link
							as={NextLink}
							href='/'
							_hover={{ textDecoration: 'none' }}
							_focus={{ outline: 'none', boxShadow: 'none' }}
							width='full'
						>
							<Text
								textAlign='center'
								width='full'
								fontSize='26px'
								fontWeight='700'
								lineHeight='29.62px'
								letterSpacing='0px'
								color='#1C170D'
								px='22px'
								cursor='pointer'
								_hover={{ color: 'loadUpBlue' }}
							>
								LoadUp Portal
							</Text>
						</Link>
					) : (
						<Link
							as={NextLink}
							href='/'
							_hover={{ textDecoration: 'none' }}
							_focus={{ outline: 'none', boxShadow: 'none' }}
						>
							<Box w='54px' h='54px' cursor='pointer'>
								<Image
									src='/img/logo.svg'
									alt='logo'
									width={54}
									height={54}
									style={{ width: '54px', height: '54px' }}
								/>
							</Box>
						</Link>
					)}
				</Flex>

				{/* Toggle Button */}
				<Box
					position='absolute'
					right='-16px'
					top='53px'
					transition='all 0.3s ease'
					zIndex={11}
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
						{isOpen ? <LuChevronLeft /> : <LuChevronRight />}
					</IconButton>
				</Box>

				<VStack gap={2} align='stretch' flex={1} px={isOpen ? '22px' : '21px'}>
					<NavItem
						icon={BsPersonSquare}
						isExpanded={isOpen}
						label='Clients'
						href='/clients'
					/>
					<NavItem
						icon={LuTruck}
						isExpanded={isOpen}
						label='Campaigns'
						href='/campaigns'
					/>
					<NavItem
						icon={MdOutlineEmail}
						isExpanded={isOpen}
						label='Emails'
						href='/emails'
					/>
					<NavItem
						icon={LuHouse}
						isExpanded={isOpen}
						label='Properties'
						href='/properties'
					/>
					<NavItem
						icon={LuAward}
						isExpanded={isOpen}
						label='Talent Pool'
						href='/talent-pool'
					/>
					<NavItem
						icon={LuSettings}
						isExpanded={isOpen}
						label='Settings'
						href='/settings'
					/>
					<NavItem
						icon={GoPeople}
						isExpanded={isOpen}
						label='Users'
						href='/users'
					/>
					<NavItem
						icon={MdKeyboardCommandKey}
						isExpanded={isOpen}
						label='Control Tower'
						href='/control-tower'
					/>
					<NavItem
						icon={LuImage}
						isExpanded={isOpen}
						label='Image Generator'
						href='/image-generator'
					/>
				</VStack>
			</Flex>
		</Box>
	);
}
