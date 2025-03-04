'use client';

import { Flex, Text, Box, Switch, Button, VStack } from '@chakra-ui/react';
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
	rejected: {
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
	const [rejectedItems, setRejectedItems] = useState(
		initialData.rejected.items
	);

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

			<Flex gap='16px' flexWrap='wrap'>
				<EditableCard items={rejectedItems} onItemsChange={setRejectedItems} />
			</Flex>
		</VStack>
	);
}
