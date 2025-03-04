import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			fonts: {
				heading: { value: 'Plus Jakarta Sans' },
				body: { value: 'Plus Jakarta Sans' },
			},
		},
	},
});
