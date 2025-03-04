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
import { VscSettings } from "react-icons/vsc";
import { useState, ChangeEvent } from 'react';

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
		name: 'Tech Solutions GmbH',
		mainContact: {
			name: 'John Doe',
			type: 'client',
		},
		lastPosition: 'Senior Developer',
		status: 'Active',
	},
	{
		id: 2,
		name: 'Design Studio Berlin',
		mainContact: {
			name: 'Jane Smith',
			type: 'interview',
		},
		lastPosition: 'UI/UX Designer',
		status: 'Pending',
	},
	{
		id: 3,
		name: 'Marketing Pro AG',
		mainContact: {
			name: 'Mike Johnson',
			type: 'attendee',
		},
		lastPosition: 'Marketing Manager',
		status: 'Active',
	},
	{
		id: 4,
		name: 'Creative Labs Ltd',
		mainContact: {
			name: 'Sarah Williams',
			type: 'client',
		},
		lastPosition: 'Creative Director',
		status: 'Inactive',
	},
	{
		id: 5,
		name: 'Solutions Inc',
		mainContact: {
			name: 'David Brown',
			type: 'interview',
		},
		lastPosition: 'Product Manager',
		status: 'Active',
	},
];

export default function ClientsPage() {
	const [selectedClients, setSelectedClients] = useState<number[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	const [activeFilter, setActiveFilter] = useState<string>('all');
	const [professionFilter, setProfessionFilter] = useState<string>('all');
	const [clientFilter, setClientFilter] = useState<string>('all');

	const filteredClients = clients.filter(
		client =>
			client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.mainContact.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			client.lastPosition.toLowerCase().includes(searchQuery.toLowerCase())
	);

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
					<HStack
           gap={4}
          >
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
							<VscSettings /> Show Filters
						</Button>
					</HStack>
				</Flex>

				{showFilters && (
					<HStack gap='4'>
						<MenuRoot>
							<Button
								as={Button}
								size='sm'
								variant='outline'
								// rightIcon={<LuChevronDown />}
							>
								Active: {activeFilter === 'all' ? 'All' : activeFilter}
							</Button>
							<MenuContent>
								<MenuItem value='all' onClick={() => setActiveFilter('all')}>
									All
								</MenuItem>
								<MenuItem
									value='active'
									onClick={() => setActiveFilter('active')}
								>
									Active
								</MenuItem>
								<MenuItem
									value='inactive'
									onClick={() => setActiveFilter('inactive')}
								>
									Inactive
								</MenuItem>
								<MenuItem
									value='pending'
									onClick={() => setActiveFilter('pending')}
								>
									Pending
								</MenuItem>
							</MenuContent>
						</MenuRoot>

						<MenuRoot>
							<Button
								as={Button}
								size='sm'
								variant='outline'
								// rightIcon={<LuChevronDown />}
							>
								Profession:{' '}
								{professionFilter === 'all' ? 'All' : professionFilter}
							</Button>
							<MenuContent>
								<MenuItem
									value='all'
									onClick={() => setProfessionFilter('all')}
								>
									All
								</MenuItem>
								<MenuItem
									value='developer'
									onClick={() => setProfessionFilter('developer')}
								>
									Developer
								</MenuItem>
								<MenuItem
									value='designer'
									onClick={() => setProfessionFilter('designer')}
								>
									Designer
								</MenuItem>
								<MenuItem
									value='manager'
									onClick={() => setProfessionFilter('manager')}
								>
									Manager
								</MenuItem>
							</MenuContent>
						</MenuRoot>

						<MenuRoot>
							<Button
								as={Button}
								size='sm'
								variant='outline'
								// rightIcon={<LuChevronDown />}
							>
								Client: {clientFilter === 'all' ? 'All' : clientFilter}
							</Button>
							<MenuContent>
								<MenuItem value='all' onClick={() => setClientFilter('all')}>
									All
								</MenuItem>
								<MenuItem
									value='client'
									onClick={() => setClientFilter('client')}
								>
									Client
								</MenuItem>
								<MenuItem
									value='attendee'
									onClick={() => setClientFilter('attendee')}
								>
									Attendee
								</MenuItem>
								<MenuItem
									value='interview'
									onClick={() => setClientFilter('interview')}
								>
									Interview
								</MenuItem>
							</MenuContent>
						</MenuRoot>

						<Button
							size='sm'
							variant='ghost'
							onClick={() => {
								setActiveFilter('all');
								setProfessionFilter('all');
								setClientFilter('all');
							}}
						>
							Reset
						</Button>
					</HStack>
				)}
			</VStack>

			<Box bg='white' borderRadius='lg' shadow='sm' overflow='hidden' my='4'>
				<Table.Root size='md'>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader width='40px' padding='0' textAlign='center'>
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
										style={{ margin: 0 }}
									/>
								</Box>
							</Table.ColumnHeader>
							<Table.ColumnHeader>Client Name</Table.ColumnHeader>
							<Table.ColumnHeader>Main Contact</Table.ColumnHeader>
							<Table.ColumnHeader>Last Position</Table.ColumnHeader>
							<Table.ColumnHeader>Status</Table.ColumnHeader>
							<Table.ColumnHeader width='40px'></Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{filteredClients.map(client => (
							<Table.Row key={client.id} _hover={{ bg: 'gray.50' }}>
								<Table.Cell padding='0' textAlign='center'>
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
											style={{ margin: 0 }}
										/>
									</Box>
								</Table.Cell>
								<Table.Cell fontWeight='500'>{client.name}</Table.Cell>
								<Table.Cell>
									<Box>
										<Text>{client.mainContact.name}</Text>
										<Text
											fontSize='sm'
											color='gray.500'
											textTransform='capitalize'
										>
											{client.mainContact.type}
										</Text>
									</Box>
								</Table.Cell>
								<Table.Cell color='gray.600'>{client.lastPosition}</Table.Cell>
								<Table.Cell>
									<Box
										display='inline-flex'
										px='2'
										py='1'
										borderRadius='full'
										fontSize='sm'
										fontWeight='500'
										{...getStatusStyles(client.status)}
									>
										{client.status}
									</Box>
								</Table.Cell>
								<Table.Cell padding='0'>
									<Box position='relative'>
										<IconButton
											// icon={<LuMoreHorizontal />}
											variant='ghost'
											size='sm'
											aria-label='More options'
											onClick={() => {}}
										/>
									</Box>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</Box>

			<Box display='flex' justifyContent='center'>
				<PaginationRoot count={20} pageSize={5} defaultPage={1}>
					<HStack gap='2'>
						<PaginationPrevTrigger />
						<PaginationItems />
						<PaginationNextTrigger />
					</HStack>
				</PaginationRoot>
			</Box>
		</Box>
	);
}

function getStatusStyles(status: string) {
	switch (status) {
		case 'Active':
			return {
				bg: 'green.100',
				color: 'green.700',
			};
		case 'Pending':
			return {
				bg: 'yellow.100',
				color: 'yellow.700',
			};
		case 'Inactive':
			return {
				bg: 'gray.100',
				color: 'gray.700',
			};
		default:
			return {
				bg: 'gray.100',
				color: 'gray.700',
			};
	}
}
