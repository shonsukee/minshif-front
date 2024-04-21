"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import FetchUserInfo from '@/features/auth/api/FetchUserInfo';
import { useCookies } from 'react-cookie';
import { User, UserContextType } from '@/features/auth/types/index';

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [cookies] = useCookies(['user_id', 'token']);

	// ログイン状態のユーザ情報を取得
	useEffect(() => {
		if (!cookies.user_id || !cookies.token) {
			setUser(null);
			return;
		}

		(async () => {
			const response = await FetchUserInfo() ?? null;

			if (response === null || response['error']) {
				setUser(null);
			} else {
				setUser({
					id: response['user']['id'],
					name: response['user']['user_name'],
					email: response['user']['email'],
					picture: response['user']['picture'],
				});
			}
		})();
	}, [cookies.user_id, cookies.token]);

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
