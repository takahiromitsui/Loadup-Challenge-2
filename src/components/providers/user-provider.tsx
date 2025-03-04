'use client';

import { createContext, useContext, useState } from 'react';

interface User {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	avatar: string;
}

const defaultUser = {
	firstName: 'João',
	lastName: 'Campello',
	email: 'joaocampello@loadup.com',
	role: 'Admin',
	avatar: '',
};

interface UserContextType {
	user: User;
	setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User>(defaultUser);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}
