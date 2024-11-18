"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import FetchPreferredShiftPeriod from '../home/api/FetchPreferredShiftPeriod';
import { ShiftSubmissionRequest, ShiftSubmissionContextType } from '@/features/auth/types/index';
import { useSession } from 'next-auth/react';
import { Spinner } from '../components/ui/spinner';

export const ShiftSubmissionContext = createContext<ShiftSubmissionContextType | undefined>(undefined);

export const ShiftSubmissionProvider = ({ children }: { children: ReactNode }) => {
	const [shiftSubmissionRequest, setShiftSubmissionRequest] = useState<ShiftSubmissionRequest[]>([]);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

	const fetchSubmissionInfo = async (email: string) => {
		setLoading(true);
		try {
			const result = await FetchPreferredShiftPeriod(email);
			if (result['data'].length > 0) {
				setShiftSubmissionRequest(result['data']);
			} else {
				setShiftSubmissionRequest([]);
			}
		} catch (error) {
			console.error('シフト情報の取得中にエラーが発生しました:', error);
			setShiftSubmissionRequest([]);
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
					fetchSubmissionInfo(email);
				}, remainingTime);
			} else {
				fetchSubmissionInfo(email);
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
		if (session?.user?.email && !shiftSubmissionRequest) {
			setLoading(true);
			fetchSubmissionInfo(session.user.email);
		} else if (!session?.user?.email) {
			setShiftSubmissionRequest([]);
			setLoading(false);
			return
		}

		// セッションが変更されたらタイムアウトを再設定
		clearCurrentTimeout();
		startTimeout();
		return () => clearCurrentTimeout();
	}, [session]);

	if (loading && !shiftSubmissionRequest) {
		return <Spinner size="large">Loading...</Spinner>;
	}

	return (
		<ShiftSubmissionContext.Provider value={{ shiftSubmissionRequest, setShiftSubmissionRequest }}>
			{children}
		</ShiftSubmissionContext.Provider>
	);
};


export const useShiftSubmission = () => {
	const context = useContext(ShiftSubmissionContext);
	if (!context) {
		throw new Error('useShiftSubmissionはShiftSubmissionProviderの中でのみ使用できます');
	}
	return context;
};
