export type Staff = {
	id: number;
	privilege: string;
	user_name: string;
	email: string;
	picture: string;
};

export type StaffList = Staff[];

export type Shift = {
	id: number | null;
	email: string;
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
	pendingShifts: Shift[],
	setPendingShifts: setPendingShifts;
}

export type setPendingShifts = React.Dispatch<React.SetStateAction<Array<Shift>>>;

export type Day = {
	day: number;
	date: string;
};

export type DayList = Day[];

export type ViewModeButtonProps = {
	viewMode: string;
	setViewMode: React.Dispatch<React.SetStateAction<string>>;
};
