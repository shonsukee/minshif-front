"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import FetchPreferredShiftPeriod from '../home/api/FetchPreferredShiftPeriod';

interface ShiftSubmissionRequest {
	id: number;
	date: Date;
	startTime: string;
	endTime: string;
	notes: string;
}

interface ShiftSubmissionContextType {
	shiftSubmissionRequest: ShiftSubmissionRequest[];
	setShiftSubmissionRequest: React.Dispatch<React.SetStateAction<ShiftSubmissionRequest[]>>;
}

export const ShiftSubmissionContext = createContext<ShiftSubmissionContextType | undefined>(undefined);

export const ShiftSubmissionProvider = ({ children }: { children: ReactNode }) => {
	const [shiftSubmissionRequest, setShiftSubmissionRequest] = useState<ShiftSubmissionRequest[]>([]);
	const [cookies] = useCookies(['token']);

	useEffect(() => {
		(async () => {
			const token = cookies.token;
			if (!token) {
				return;
			}
			const result = await FetchPreferredShiftPeriod(token);
			if (result['status'] === 200 && result['data'].length > 0) {
				setShiftSubmissionRequest(result['data']);
			} else {
				setShiftSubmissionRequest([]);
			}
		})();
	}, [cookies.token]);

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
