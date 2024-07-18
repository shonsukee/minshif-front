export type Staff = {
	id: number;
	privilege: string;
	user_name: string;
};

export type StaffList = Staff[];

export type Shift = {
	id: number;
	user_name: string;
	date: string;
	start_time: string;
	end_time: string;
	notes: string;
	is_registered: boolean;
};

export type ShiftList = Shift[][];

export type WeekAxisCalendarProps = {
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
	draftShifts: Shift[],
	setDraftShifts: setDraftShifts;
}

export type setDraftShifts = React.Dispatch<React.SetStateAction<Array<{
	id: number,
	user_name: string,
	date: string,
	start_time: string,
	end_time: string,
	notes: string,
	is_registered: boolean
}>>>;

export type Day = {
	day: number;
	date: string;
};

export type DayList = Day[];

export type ViewModeButtonProps = {
	viewMode: string;
	setViewMode: React.Dispatch<React.SetStateAction<string>>;
};
