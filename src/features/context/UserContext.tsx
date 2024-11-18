"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import FetchUserInfo from '@/features/auth/api/FetchUserInfo';
import { User, UserContextType } from '@/features/auth/types/index';
import { useSession } from 'next-auth/react';
import { Spinner } from '../components/ui/spinner';

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

	const fetchUserInfo = async (email: string) => {
		if (!user) {
			setLoading(true);
		}
		try {
			const response = await FetchUserInfo(email) ?? null;

			if (response === null || response['error'] || response['user'] === null) {
				setUser(null);
			} else {
				setUser({
					id: response['user']['id'],
					user_name: response['user']['user_name'],
					email: response['user']['email'],
					picture: response['user']['picture'],
				});
			}
		} catch (error) {
			console.error('ユーザ情報の取得中にエラーが発生しました:', error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	// セッションの有効期限が来たらユーザ情報を再取得
	const startTimeout = () => {
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
	};

	// タイムアウトをクリア
	const clearCurrentTimeout = () => {
		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
			timeoutIdRef.current = null;
		}
	};

	useEffect(() => {
		// 初回ロード時にユーザ情報を取得
		if (session?.user?.email && !user) {
			setLoading(true);
			fetchUserInfo(session.user.email);
		} else if (!session?.user?.email) {
			setUser(null);
			setLoading(false);
			return
		}
		// セッションが変更されたらタイムアウトを再設定
		clearCurrentTimeout();
		startTimeout();
		return () => clearCurrentTimeout();
	}, [session]);

	if (loading && !user) {
		return <Spinner size="large">Loading...</Spinner>;
	}

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
