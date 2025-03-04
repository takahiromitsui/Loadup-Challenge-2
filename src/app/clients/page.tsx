'use client';

import {
	Box,
	Heading,
	Table,
	Text,
	Input,
	Button,
	HStack,
	IconButton,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import {
	PaginationRoot,
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
} from '@/components/ui/pagination';
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
			<Box mb='6'>
				<Heading size='lg' mb='2'>
					Clients
				</Heading>
				<Text color='gray.600'>Manage your client relationships</Text>
			</Box>

			<Box mb='4'>
				<Box position='relative'>
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
						placeholder='Search clients...'
						value={searchQuery}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setSearchQuery(e.target.value)
						}
					/>
				</Box>
			</Box>

			<Box bg='white' borderRadius='lg' shadow='sm' overflow='hidden' mb='4'>
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
