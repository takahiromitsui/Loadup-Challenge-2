'use client';

import {
	Flex,
	Text,
	Box,
	Switch,
	Button,
	VStack,
	SimpleGrid,
} from '@chakra-ui/react';
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from '@/components/ui/select';
import { createListCollection } from '@chakra-ui/react';
import EditableCard from '@/components/cards/editable-card';
import { useState } from 'react';

const initialData = {
	company: {
		name: 'AXTRA',
		period: [
			'Kraftfahrer Axtra August 2023',
			'Kraftfahrer Axtra September 2023',
		],
	},
	new: {
		title: 'Neu',
		color: 'green.500',
		items: [
			{
				name: 'Ramon Reise',
				date: '31/07/2024',
				attempts: 2,
			},
		],
	},
	firstSpeech: {
		title: 'First Speech Given',
		color: 'purple.500',
		items: [
			{
				name: 'Ramon Reise',
				date: '31/07/2024',
				attempts: 2,
			},
		],
	},
	interview: {
		title: 'Bewerbungsgespräch',
		color: 'orange.500',
		items: [
			{
				name: 'Max Mustermann',
				date: '31/07/2024',
			},
		],
	},
	rejected: {
		title: 'Abgelehnt',
		color: 'red.500',
		items: [
			{
				name: 'Sam Krause',
				date: '31/07/2024',
				attempts: 2,
			},
			{
				name: 'Cantaro Concetto',
				date: '31/07/2024',
			},
		],
	},
};

export default function Home() {
	const [cardStates, setCardStates] = useState({
		new: initialData.new.items,
		rejected: initialData.rejected.items,
		firstSpeech: initialData.firstSpeech.items,
		interview: initialData.interview.items,
	});

	const handleItemsChange = (
		cardType: 'new' | 'rejected' | 'firstSpeech' | 'interview',
		newItems: any[]
	) => {
		setCardStates(prev => ({
			...prev,
			[cardType]: newItems,
		}));
	};

	const handleItemRemove = (
		cardType: 'new' | 'rejected' | 'firstSpeech' | 'interview',
		index: number
	) => {
		setCardStates(prev => ({
			...prev,
			[cardType]: prev[cardType].filter((_, i) => i !== index),
		}));
	};

	return (
		<VStack gap='24px' width='full'>
			<Flex justify='space-between' width='full'>
				<Flex align='center' gap='8px'>
					<Box
						px='20px'
						py='13.5px'
						borderRadius='10px'
						bg='#E9EBED'
						height='40px'
						display='flex'
						alignItems='center'
					>
						<Text>{initialData.company.name}</Text>
					</Box>

					<SelectRoot
						collection={createListCollection({
							items: initialData.company.period,
						})}
						size='sm'
						width='320px'
						border='1px solid #E9EBED'
						px='20px'
						height='40px'
					>
						<SelectTrigger>
							<SelectValueText placeholder={initialData.company.period[0]} />
						</SelectTrigger>
						<SelectContent>
							{initialData.company.period.map(period => (
								<SelectItem item={period} key={period}>
									{period}
								</SelectItem>
							))}
						</SelectContent>
					</SelectRoot>

					<Switch.Root display='flex' alignItems='center'>
						<Switch.HiddenInput />
						<Switch.Control>
							<Switch.Thumb />
						</Switch.Control>
						<Switch.Label>
							Ziege Bewerber, die nicht zu 100% passen
						</Switch.Label>
					</Switch.Root>
				</Flex>
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
					+ Als Excel Exportieren
				</Button>
			</Flex>

			<Flex justify='space-between' flexWrap='wrap' gap='16px'>
				<EditableCard
					title={initialData.new.title}
					color={initialData.new.color}
					items={cardStates.new}
					onItemsChange={items => handleItemsChange('new', items)}
					onItemRemove={index => handleItemRemove('new', index)}
				/>
				<EditableCard
					title={initialData.firstSpeech.title}
					color={initialData.firstSpeech.color}
					items={cardStates.firstSpeech}
					onItemsChange={items => handleItemsChange('firstSpeech', items)}
					onItemRemove={index => handleItemRemove('firstSpeech', index)}
				/>
				<EditableCard
					title={initialData.interview.title}
					color={initialData.interview.color}
					items={cardStates.interview}
					onItemsChange={items => handleItemsChange('interview', items)}
					onItemRemove={index => handleItemRemove('interview', index)}
				/>
				<EditableCard
					title={initialData.rejected.title}
					color={initialData.rejected.color}
					items={cardStates.rejected}
					onItemsChange={items => handleItemsChange('rejected', items)}
					onItemRemove={index => handleItemRemove('rejected', index)}
				/>
			</Flex>
		</VStack>
	);
}
