'use client';
import { system } from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { SidebarProvider } from './sidebar-provider';
import { UserProvider } from './user-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ChakraProvider value={system}>
			<UserProvider>
				<SidebarProvider>{children}</SidebarProvider>
			</UserProvider>
		</ChakraProvider>
	);
}
