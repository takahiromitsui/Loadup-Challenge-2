'use client';

import { Box, Flex, Text, VStack, Button } from '@chakra-ui/react';
import { useState } from 'react';

interface EditableItem {
	name: string;
	date: string;
	attempts?: number;
}

interface EditableCardProps {
	title: string;
	color: string;
	items: EditableItem[];
	onItemsChange?: (
		sourceTitle: string,
		item: EditableItem,
		sourceIndex: number
	) => void;
}

export default function EditableCard({
	title,
	color,
	items = [],
	onItemsChange,
}: EditableCardProps) {
	const [isDraggingOver, setIsDraggingOver] = useState(false);
	const [selectedItem, setSelectedItem] = useState<{
		item: EditableItem;
		index: number;
	} | null>(null);

	const handleDragStart = (e: React.DragEvent, index: number) => {
		e.dataTransfer.setData(
			'application/json',
			JSON.stringify({
				sourceTitle: title,
				itemIndex: index,
				item: items[index],
			})
		);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDraggingOver(false);

		try {
			const data = JSON.parse(e.dataTransfer.getData('application/json'));

			if (data.sourceTitle !== title) {
				onItemsChange?.(data.sourceTitle, data.item, data.itemIndex);
				e.dataTransfer.dropEffect = 'move';
			}
		} catch (error) {
			console.error('Error processing drop:', error);
		}
	};

	const handleDelete = (index: number) => {
		onItemsChange?.(title, items[index], index);
		setSelectedItem(null);
	};

	return (
		<>
			<Box
				bg='white'
				borderRadius='10px'
				p='16px'
				width='300px'
				boxShadow='sm'
				border='1px solid'
				borderColor='gray.200'
				height='400px'
				display='flex'
				flexDirection='column'
				position='relative'
			>
				<Flex align='center' mb='16px' flexShrink={0}>
					<Box w='3px' h='20px' bg={color} borderRadius='full' mr='8px' />
					<Text fontSize='16px' fontWeight='600' color='#1C170D' flex={1}>
						{title}
					</Text>
					<Text fontSize='14px' fontWeight='500' color='gray.500'>
						{items.length}
					</Text>
				</Flex>

				<VStack
					gap='8px'
					align='stretch'
					minH='100px'
					flex={1}
					overflowY='auto'
					css={{
						'&::-webkit-scrollbar': {
							width: '4px',
						},
						'&::-webkit-scrollbar-track': {
							background: '#f1f1f1',
							borderRadius: '2px',
						},
						'&::-webkit-scrollbar-thumb': {
							background: '#888',
							borderRadius: '2px',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							background: '#555',
						},
					}}
					bg={isDraggingOver ? 'gray.50' : 'transparent'}
					borderRadius='8px'
					transition='background-color 0.2s'
					onDragOver={e => {
						e.preventDefault();
						setIsDraggingOver(true);
					}}
					onDragLeave={() => setIsDraggingOver(false)}
					onDrop={handleDrop}
				>
					<Flex
						align='center'
						justify='center'
						h='100px'
						borderRadius='8px'
						border='2px dashed'
						borderColor={isDraggingOver ? 'blue.300' : 'gray.200'}
						bg={isDraggingOver ? 'blue.50' : 'transparent'}
						transition='all 0.2s'
					>
						<Text
							color={isDraggingOver ? 'blue.500' : 'gray.400'}
							fontSize='14px'
						>
							Hier hin ziehen
						</Text>
					</Flex>
					{items.map((item, index) => (
						<Box
							key={index}
							p='12px'
							bg='white'
							borderRadius='8px'
							border='1px solid'
							borderColor={
								selectedItem?.index === index ? 'blue.300' : 'gray.200'
							}
							cursor='pointer'
							_hover={{ borderColor: 'gray.300' }}
							draggable
							onDragStart={e => handleDragStart(e, index)}
							onClick={() => setSelectedItem({ item, index })}
						>
							<Text fontWeight='500' mb='4px'>
								{item.name}
							</Text>
							<Flex justify='space-between' align='center'>
								<Text fontSize='14px' color='gray.500'>
									{item.date}
								</Text>
								{item.attempts && (
									<Box bg='purple.100' px='8px' py='4px' borderRadius='4px'>
										<Text fontSize='12px' color='purple.400'>
											{item.attempts}. Anmeldeversuch
										</Text>
									</Box>
								)}
							</Flex>
						</Box>
					))}
				</VStack>
			</Box>

			{selectedItem && (
				<Box
					position='fixed'
					top='0'
					right='0'
					height='100vh'
					width='300px'
					bg='white'
					boxShadow='-4px 0 10px rgba(0, 0, 0, 0.1)'
					p='24px'
					zIndex={1000}
				>
					<Flex justify='space-between' align='center' mb='24px'>
						<Text fontSize='lg' fontWeight='600'>
							{selectedItem.item.name}
						</Text>
						<Button
							size='sm'
							variant='ghost'
							onClick={() => setSelectedItem(null)}
						>
							×
						</Button>
					</Flex>
					<Flex>
						<Button
							size='sm'
							bg='red.50'
							color='red.600'
							_hover={{ bg: 'red.100' }}
							onClick={() => handleDelete(selectedItem.index)}
							display='flex'
							gap='8px'
							alignItems='center'
							padding='8px'
						>
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M3 6h18' />
								<path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
								<path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
							</svg>
							Delete
						</Button>
					</Flex>
					<VStack
						align='stretch'
						gap={4}
						border='1px solid #E9EBED'
						rounded='16px'
						py='8px'
						px='16px'
					>
						<Box>
							<Text fontSize='sm' color='gray.500'>
								Name
							</Text>
							<Text fontWeight='500'>{selectedItem.item.name}</Text>
						</Box>
						<Box>
							<Text fontSize='sm' color='gray.500'>
								Datum
							</Text>
							<Text fontWeight='500'>{selectedItem.item.date}</Text>
						</Box>
						{selectedItem.item.attempts && (
							<Box>
								<Text fontSize='sm' color='gray.500'>
									Anmeldeversuche
								</Text>
								<Text fontWeight='500'>{selectedItem.item.attempts}</Text>
							</Box>
						)}
					</VStack>
				</Box>
			)}
		</>
	);
}
