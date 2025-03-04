'use client';
import { system } from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
export default function Providers({ children }: { children: React.ReactNode }) {
	// const [queryClient] = useState(() => new QueryClient());
	return (
		// <QueryClientProvider client={queryClient}>
		<ChakraProvider value={system}>{children}</ChakraProvider>
		// </QueryClientProvider>
	);
}
