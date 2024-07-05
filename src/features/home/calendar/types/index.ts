export interface Staff {
	id: number;
	privilege: string;
	user_name: string;
};

export type StaffList = Staff[];

export interface Day {
	day: number;
	date: string;
};

export type DayList = Day[];

export interface ViewModeButtonProps {
	viewMode: string;
	setViewMode: React.Dispatch<React.SetStateAction<string>>;
};

export interface WeekAxisCalendarProps {
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
}