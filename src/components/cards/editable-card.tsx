'use client';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface EditableItem {
	name: string;
	date: string;
	attempts?: number;
}

interface EditableCardProps {
	items: EditableItem[];
	onItemsChange?: (items: EditableItem[]) => void;
}

export default function EditableCard({
	items = [],
	onItemsChange,
}: EditableCardProps) {
	const [isDraggingOver, setIsDraggingOver] = useState(false);

	const handleDragStart = (e: React.DragEvent, index: number) => {
		e.dataTransfer.setData('text/plain', index.toString());
	};

	const handleDragEnd = (e: React.DragEvent, index: number) => {
		// If the item was dropped outside of a valid drop target
		if (e.dataTransfer.dropEffect === 'none') {
			const newItems = [...items];
			newItems.splice(index, 1);
			onItemsChange?.(newItems);
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
		>
			<Flex align='center' mb='16px'>
				<Box w='3px' h='20px' bg='red.500' borderRadius='full' mr='8px' />
				<Text fontSize='16px' fontWeight='600' color='#1C170D' flex={1}>
					Abgelehnt
				</Text>
				<Text fontSize='14px' fontWeight='500' color='gray.500'>
					{items.length}
				</Text>
			</Flex>

			<VStack
				spacing='8px'
				align='stretch'
				minH='100px'
				bg={isDraggingOver ? 'gray.50' : 'transparent'}
				borderRadius='8px'
				transition='background-color 0.2s'
				onDragOver={e => {
					e.preventDefault();
					setIsDraggingOver(true);
				}}
				onDragLeave={() => setIsDraggingOver(false)}
				onDrop={e => {
					e.preventDefault();
					setIsDraggingOver(false);
				}}
			>
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
						onDragEnd={e => handleDragEnd(e, index)}
					>
						<Text fontWeight='500' mb='4px'>
							{item.name}
						</Text>
						<Flex justify='space-between' align='center'>
							<Text fontSize='14px' color='gray.500'>
								{item.date}
							</Text>
							{item.attempts && (
								<Text fontSize='12px' color='gray.400'>
									{item.attempts}. Anmeldeversuch
								</Text>
							)}
						</Flex>
					</Box>
				))}
				{items.length === 0 && (
					<Flex
						align='center'
						justify='center'
						h='100px'
						borderRadius='8px'
						border='2px dashed'
						borderColor='gray.200'
					>
						<Text color='gray.400' fontSize='14px'>
							Hier hin Ziehen
						</Text>
					</Flex>
				)}
			</VStack>
		</Box>
	);
}
