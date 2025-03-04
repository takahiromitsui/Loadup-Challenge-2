'use client';

import {
	Button,
	Flex,
	Badge,
	Text,
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Icon,
	Switch,
} from '@chakra-ui/react';
import {
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from '@/components/ui/select';
import { createListCollection } from '@chakra-ui/react';

const data = {
	company: {
		name: 'AXTRA',
		period: [
			'Kraftfahrer Axtra August 2023',
			'Kraftfahrer Axtra September 2023',
		],
	},
	new: {},
};

export default function Home() {
	return (
		<Flex align='center' gap='8px' mb={8}>
			<Box
				px='20px'
				py='13.5px'
				borderRadius='10px'
				bg='#E9EBED'
				height='40px'
				display='flex'
				alignItems='center'
			>
				<Text>{data.company.name}</Text>
			</Box>

			<SelectRoot
				collection={createListCollection({
					items: data.company.period,
				})}
				size='sm'
				width='320px'
				border='1px solid #E9EBED'
				px='20px'
				height='40px'
			>
				<SelectTrigger>
					<SelectValueText placeholder={data.company.period[0]} />
				</SelectTrigger>
				<SelectContent>
					{data.company.period.map(period => (
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
				<Switch.Label>Ziege Bewerber, die nicht zu 100% passen</Switch.Label>
			</Switch.Root>
		</Flex>
	);
}
