export type User = {
	id: string;
	name: string;
	email: string;
	picture: string;
}

export type UserContextType = {
	user: User | null;
}

export type ShiftSubmissionRequest = {
	id: number;
	store_id: string;
	start_date: Date;
	end_date: Date;
	deadline_date: Date;
	deadline_time: string;
	notes: string;
}

export type ShiftSubmissionContextType = {
	shiftSubmissionRequest: ShiftSubmissionRequest[];
	setShiftSubmissionRequest: React.Dispatch<React.SetStateAction<ShiftSubmissionRequest[]>>;
}
