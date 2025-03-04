'use client';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';
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
		sourceType: string,
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

	const handleDragStart = (e: React.DragEvent, index: number) => {
		// Store both the source card title and the item index
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

			// Only process if the item is coming from a different card
			if (data.sourceTitle !== title) {
				onItemsChange?.(data.sourceTitle, data.item, data.itemIndex);
				e.dataTransfer.dropEffect = 'move';
			}
		} catch (error) {
			console.error('Error processing drop:', error);
		}
	};

	return (
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
						borderColor='gray.200'
						cursor='move'
						_hover={{ borderColor: 'gray.300' }}
						draggable
						onDragStart={e => handleDragStart(e, index)}
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
	);
}
