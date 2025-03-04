'use client';

import {
	Box,
	Flex,
	Heading,
	Table,
	Text,
	Input,
	Button,
	HStack,
	IconButton,
	VStack,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
	SelectContent,
	createListCollection,
	SelectItem,
	Avatar,
} from '@chakra-ui/react';
import { LuFilter, LuSearch, LuChevronDown } from 'react-icons/lu';
import {
	PaginationRoot,
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
} from '@/components/ui/pagination';
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from '@/components/ui/menu';
import { RiDeleteBinLine } from 'react-icons/ri';
import { VscSettings } from 'react-icons/vsc';
import { useState, ChangeEvent } from 'react';
import { statusAnatomy } from '@chakra-ui/react/anatomy';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface Client {
	id: number;
	name: string;
	mainContact: {
		name: string;
		type: 'client' | 'attendee' | 'interview';
	};
	lastPosition: string;
	status: string;
}

const clients: Client[] = [
	{
		id: 1,
		name: 'Annette Black',
		mainContact: {
			name: 'John Doe',
			type: 'client',
		},
		lastPosition: 'Senior Developer',
		status: 'Active',
	},
	{
		id: 2,
		name: 'Jerome Bell',
		mainContact: {
			name: 'Jane Smith',
			type: 'interview',
		},
		lastPosition: 'UI/UX Designer',
		status: 'Inactive',
	},
	{
		id: 3,
		name: 'Jacob Jones',
		mainContact: {
			name: 'Mike Johnson',
			type: 'attendee',
		},
		lastPosition: 'Marketing Manager',
		status: 'Active',
	},
	{
		id: 4,
		name: 'Jane Cooper',
		mainContact: {
			name: 'Sarah Williams',
			type: 'client',
		},
		lastPosition: 'Creative Director',
		status: 'Inactive',
	},
	{
		id: 5,
		name: 'Annette Black',
		mainContact: {
			name: 'David Brown',
			type: 'interview',
		},
		lastPosition: 'Product Manager',
		status: 'Active',
	},
];

const status = ['All', 'Active', 'Inactive'];
const professions = ['All', 'Developer', 'Designer', 'Manager', 'Director'];
const clientTypes = ['All', 'Client', 'Attendee', 'Interview'];

export default function ClientsPage() {
	const [selectedClients, setSelectedClients] = useState<number[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('All');
	const [selectedProfession, setSelectedProfession] = useState('All');
	const [selectedClientType, setSelectedClientType] = useState('All');

	const filteredClients = clients.filter(client => {
		const matchesSearch =
			client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.mainContact.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			client.lastPosition.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			selectedStatus === 'All' || client.status === selectedStatus;

		const matchesProfession =
			selectedProfession === 'All' ||
			client.lastPosition
				.toLowerCase()
				.includes(selectedProfession.toLowerCase());

		const matchesClientType =
			selectedClientType === 'All' ||
			client.mainContact.type === selectedClientType.toLowerCase();

		return (
			matchesSearch && matchesStatus && matchesProfession && matchesClientType
		);
	});

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedClients(filteredClients.map(client => client.id));
		} else {
			setSelectedClients([]);
		}
	};

	const handleSelectClient = (clientId: number, checked: boolean) => {
		if (checked) {
			setSelectedClients(prev => [...prev, clientId]);
		} else {
			setSelectedClients(prev => prev.filter(id => id !== clientId));
		}
	};

	return (
		<Box>
			<Flex mb='6' justify='space-between'>
				<VStack align='flex-start'>
					<Text fontSize='2xl' fontWeight='bold'>
						Clients
					</Text>
					<Text fontWeight='bold' color='gray.500'>
						{filteredClients.length} Clients
					</Text>
				</VStack>
				<Button
					bg='loadUpBlue'
					color='white'
					borderRadius='10px'
					px='10px'
					fontWeight='500'
					fontSize='16px'
					lineHeight='24px'
					letterSpacing='0.4px'
					textAlign='center'
				>
					+ Add New
				</Button>
			</Flex>

			<VStack gap='4' align='stretch'>
				<Flex justify='space-between'>
					<Box
						position='relative'
						width='350px'
						borderRadius='10px'
						border='1px solid #E2E8F0'
					>
						<Box
							position='absolute'
							left='3'
							top='50%'
							transform='translateY(-50%)'
						>
							<LuSearch color='gray.400' />
						</Box>
						<Input
							pl='10'
							placeholder='Search'
							value={searchQuery}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setSearchQuery(e.target.value)
							}
						/>
					</Box>
					<HStack gap={4}>
						<IconButton
							className='text-red-400 bg-red-100'
							variant='ghost'
							size='sm'
							aria-label='Delete selected'
						>
							<RiDeleteBinLine />
						</IconButton>
						<Button
							bg='white'
							borderRadius='10px'
							px='10px'
							fontWeight='500'
							fontSize='16px'
							lineHeight='24px'
							letterSpacing='0.4px'
							onClick={() => setShowFilters(!showFilters)}
						>
							<VscSettings /> {showFilters ? 'Hide Filters' : 'Show Filters'}
						</Button>
					</HStack>
				</Flex>

				{/* {showFilters && (
					<HStack gap='4'>
						<SelectRoot
							collection={createListCollection({
								items: status,
							})}
							size='sm'
							width='114px'
							border='1px solid #E9EBED'
							// bg='white'
							px='15px'
							// height='40px'
							borderRadius='10px'
						>
							<SelectTrigger>
								<SelectValueText placeholder={status[0]} />
							</SelectTrigger>
							<SelectContent>
								{status.map(item => (
									<SelectItem item={item} key={item}>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</SelectRoot>

						<Button
							size='sm'
							variant='ghost'
							onClick={() => {
								setSelectedStatus('All');
								setSelectedProfession('All');
								setSelectedClientType('All');
							}}
						>
							Reset
						</Button>
					</HStack>
				)} */}
			</VStack>

			<Box
				bg='white'
				borderRadius='lg'
				shadow='sm'
				overflow='hidden'
				my='4'
				border='1px'
				borderColor='gray.200'
				w='full'
			>
				<Table.Root size='md'>
					<Table.Header bg='gray.50'>
						<Table.Row>
							<Table.ColumnHeader width='40px' py='4' textAlign='center'>
								<Box
									as='label'
									display='flex'
									alignItems='center'
									justifyContent='center'
									height='full'
								>
									<input
										type='checkbox'
										checked={
											selectedClients.length === filteredClients.length &&
											filteredClients.length > 0
										}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleSelectAll(e.target.checked)
										}
										style={{
											margin: 0,
											width: '16px',
											height: '16px',
											borderRadius: '4px',
											accentColor: '#3182CE',
										}}
									/>
								</Box>
							</Table.ColumnHeader>
							<Table.ColumnHeader
								py='4'
								textAlign='left'
								fontWeight='600'
								pl='4'
							>
								Client Name
							</Table.ColumnHeader>
							<Table.ColumnHeader
								py='4'
								textAlign='left'
								fontWeight='600'
								pl='4'
							>
								Main Contact
							</Table.ColumnHeader>
							<Table.ColumnHeader
								py='4'
								textAlign='left'
								fontWeight='600'
								pl='4'
							>
								Last Position
							</Table.ColumnHeader>
							<Table.ColumnHeader
								py='4'
								textAlign='left'
								fontWeight='600'
								pl='4'
							>
								Status
							</Table.ColumnHeader>
							<Table.ColumnHeader
								py='4'
								textAlign='left'
								fontWeight='600'
								pl='4'
							>
								Action
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{filteredClients.map(client => (
							<Table.Row
								key={client.id}
								_hover={{ bg: 'gray.50' }}
								borderBottom='1px'
								borderColor='gray.100'
							>
								<Table.Cell py='4' textAlign='center'>
									<Box
										as='label'
										display='flex'
										alignItems='center'
										justifyContent='center'
										height='full'
									>
										<input
											type='checkbox'
											checked={selectedClients.includes(client.id)}
											onChange={(e: ChangeEvent<HTMLInputElement>) =>
												handleSelectClient(client.id, e.target.checked)
											}
											style={{
												margin: 0,
												width: '16px',
												height: '16px',
												borderRadius: '4px',
												accentColor: '#3182CE',
											}}
										/>
									</Box>
								</Table.Cell>
								<Table.Cell py='4' pl='4'>
									<Flex align='center' gap='3'>
										<Avatar.Root size='sm'>
											<Avatar.Image src={''} />
											<Avatar.Fallback
												bg='blue.100'
												color='blue.600'
												name={`${client.name}`}
											/>
										</Avatar.Root>
										<Text fontWeight='500'>{client.name}</Text>
									</Flex>
								</Table.Cell>
								<Table.Cell py='4' pl='4'>
									<Text
										textTransform='capitalize'
										fontSize='sm'
										color='gray.700'
									>
										{client.mainContact.type}
									</Text>
								</Table.Cell>
								<Table.Cell py='4' pl='4'>
									<Text fontSize='sm' color='gray.600'>
										{client.lastPosition}
									</Text>
								</Table.Cell>
								<Table.Cell py='4' pl='4'>
									<Box
										display='inline-flex'
										px='3'
										py='1'
										borderRadius='full'
										fontSize='sm'
										fontWeight='500'
										{...getStatusStyles(client.status)}
									>
										{client.status}
									</Box>
								</Table.Cell>
								<Table.Cell py='4' textAlign='center'>
									<MenuRoot>
										<MenuTrigger asChild>
											<IconButton
												variant='ghost'
												size='sm'
												aria-label='More options'
											>
												<HiOutlineDotsVertical />
											</IconButton>
										</MenuTrigger>
										<MenuContent>
											<MenuItem value='delete' color='red.500'>
												<RiDeleteBinLine /> Delete
											</MenuItem>
										</MenuContent>
									</MenuRoot>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
				<Box borderTop='1px' borderColor='gray.200' p='4'>
					<PaginationRoot count={20} pageSize={5} defaultPage={1} size='sm'>
						<Flex justify='space-between' align='center' w='full'>
							<Box>
								<PaginationPrevTrigger />
							</Box>
							<HStack gap='2'>
								<PaginationItems />
							</HStack>
							<Box>
								<PaginationNextTrigger />
							</Box>
						</Flex>
					</PaginationRoot>
				</Box>
			</Box>
		</Box>
	);
}

function getStatusStyles(status: string) {
	switch (status) {
		case 'Active':
			return {
				bg: 'green.50',
				color: 'green.600',
			};
		case 'Ina':
			return {
				bg: 'yellow.50',
				color: 'yellow.600',
			};
		case 'Inactive':
			return {
				bg: 'gray.50',
				color: 'gray.600',
			};
		default:
			return {
				bg: 'gray.50',
				color: 'gray.600',
			};
	}
}
