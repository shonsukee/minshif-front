"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import FetchMembership from '@/features/auth/api/FetchMembership';
import { Membership, MembershipContextType } from '@/features/auth/types/index';
import { useSession } from 'next-auth/react';
import { Spinner } from '../components/ui/spinner';

export const MembershipContext = createContext<MembershipContextType | null>(null);

export const MembershipProvider = ({ children }: { children: ReactNode }) => {
	const [membership, setMembership] = useState<Membership | null>(null);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

	const fetchMembershipInfo = async (email: string) => {
		setLoading(true);
		try {
			const response = await FetchMembership(email) ?? null;

			if (response === null || response['membership'] === null) {
				setMembership(null);
			} else {
				setMembership({
					id: response['membership']['id'],
					user_id: response['membership']['user_id'],
					store_id: response['membership']['store_id'],
					current_store: response['membership']['current_store'],
					privilege: response['membership']['privilege'],
					calendar_id: response['membership']['calendar_id'],
				});
			}
		} catch (error) {
			console.error('ユーザ情報の取得中にエラーが発生しました:', error);
			setMembership(null);
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
					fetchMembershipInfo(email);
				}, remainingTime);
			} else {
				fetchMembershipInfo(email);
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
		if (session?.user?.email && !membership) {
			setLoading(true);
			fetchMembershipInfo(session.user.email);
		} else if (!session?.user?.email) {
			setMembership(null);
			setLoading(false);
			return
		}

		// セッションが変更されたらタイムアウトを再設定
		clearCurrentTimeout();
		startTimeout();
		return () => clearCurrentTimeout();
	}, [session]);

	if (loading && !membership) {
		return <Spinner size="large">Loading...</Spinner>;
	}

	return (
		<MembershipContext.Provider value={{membership}}>
			{children}
		</MembershipContext.Provider>
	);
};

export const useMembership = () => {
	const context = useContext(MembershipContext);
	if (!context) {
		throw new Error('useMembershipはMembershipProviderの中でのみ使用できます');
	}
	return context;
};
