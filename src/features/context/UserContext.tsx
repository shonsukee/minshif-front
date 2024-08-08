"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import FetchUserInfo from '@/features/auth/api/FetchUserInfo';
import { User, UserContextType } from '@/features/auth/types/index';
import { useSession } from 'next-auth/react';

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const { data: session } = useSession();

	// ログイン状態のユーザ情報を取得
	useEffect(() => {
		if (!session?.user || !session?.user.email) {
			setUser(null);
			return;
		}

		const fetchUserInfo = async (email: string) => {
			const response = await FetchUserInfo(email) ?? null;

			if (response === null || response['error'] || response['user'] === null) {
				setUser(null);
			} else {
				setUser({
					id: response['user']['id'],
					name: response['user']['user_name'],
					email: response['user']['email'],
					picture: response['user']['picture'],
				});
			}
		};

		fetchUserInfo(session.user.email);
	}, [session]);

	return (
		<UserContext.Provider value={{user}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserはUserProviderの中でのみ使用できます');
	}
	return context;
};
