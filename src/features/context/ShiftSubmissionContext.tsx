"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import FetchPreferredShiftPeriod from '../home/api/FetchPreferredShiftPeriod';
import { ShiftSubmissionRequest, ShiftSubmissionContextType } from '@/features/auth/types/index';
import { useSession } from 'next-auth/react';

export const ShiftSubmissionContext = createContext<ShiftSubmissionContextType | undefined>(undefined);

export const ShiftSubmissionProvider = ({ children }: { children: ReactNode }) => {
	const [shiftSubmissionRequest, setShiftSubmissionRequest] = useState<ShiftSubmissionRequest[]>([]);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();

	useEffect(() => {
		if (!session?.user || !session?.user.email) {
			setShiftSubmissionRequest([]);
			setLoading(false);
			return;
		}

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

		fetchSubmissionInfo(session.user.email);
	}, [session]);

	if (loading) {
		return <div>Loading...</div>;
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
