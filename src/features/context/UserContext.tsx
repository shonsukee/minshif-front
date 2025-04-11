"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';
import FetchUserInfo from '@/features/auth/api/FetchUserInfo';
import { User, UserContextType } from '@/features/auth/types/index';
import { useSession } from 'next-auth/react';
import { Spinner } from '../components/ui/spinner';
import { notifyError } from '../components/ui/toast';

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

	const fetchUserInfo = useCallback(async (email: string) => {
		if (!user) {
			setLoading(true);
		}
		try {
			const response = await FetchUserInfo(email);

			if (!response || 'error' in response) {
				setUser(null);
				notifyError('ユーザ情報の取得中にエラーが発生しました11');
				return;
			}

			const userData = response.data;
			if (!userData) {
				setUser(null);
				notifyError('ユーザ情報の取得中にエラーが発生しました22');
				return;
			}

			setUser({
				id: userData.id,
				user_name: userData.user_name,
				email: userData.email,
				picture: userData.picture,
			});
		} catch (error) {
			notifyError('ユーザ情報の取得中にエラーが発生しました33');
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	const startTimeout = useCallback(() => {
		if (session?.user?.email && session.expires) {
			const expiresAt = new Date(session.expires).getTime();
			const now = new Date().getTime();
			const remainingTime = expiresAt - now;
			const email = session.user.email;
			if (remainingTime > 0) {
				timeoutIdRef.current = setTimeout(() => {
					fetchUserInfo(email);
				}, remainingTime);
			} else {
				fetchUserInfo(email);
			}
		}
	}, [session, fetchUserInfo]);

	const clearCurrentTimeout = () => {
		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
			timeoutIdRef.current = null;
		}
	};

	useEffect(() => {
		const email = session?.user?.email;
		if (!email) {
			setUser(null);
			setLoading(false);
			return;
		}
		if (user?.email !== email) {
			fetchUserInfo(email);
		}
		clearCurrentTimeout();
		startTimeout();
		return () => clearCurrentTimeout();
	}, [session, user?.email, fetchUserInfo, startTimeout]);

	if (loading && !user) return <Spinner size="large">Loading...</Spinner>;

	return (
		<UserContext.Provider value={{ user }}>
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
