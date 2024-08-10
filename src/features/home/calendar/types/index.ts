export type Staff = {
	id: number;
	privilege: string;
	user_name: string;
};

export type StaffList = Staff[];

export type Shift = {
	id: number | null;
	user_name: string;
	date: string;
	start_time: string;
	end_time: string;
	notes: string;
	is_registered: boolean;
	shift_submission_request_id: number | null;
};

export type ShiftList = Shift[][];

export type ShiftHistory = {
	start_time: string;
	end_time: string;
	notes: string;
};

export type WeekAxisCalendarProps = {
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
	draftShifts: Shift[],
	setDraftShifts: setDraftShifts;
}

export type setDraftShifts = React.Dispatch<React.SetStateAction<Array<Shift>>>;

export type Day = {
	day: number;
	date: string;
};

export type DayList = Day[];

export type ViewModeButtonProps = {
	viewMode: string;
	setViewMode: React.Dispatch<React.SetStateAction<string>>;
};

export type Token = {
	token: string;
}