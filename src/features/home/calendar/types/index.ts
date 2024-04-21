export interface Factor {
	id: number;
	name: string;
};

export type FactorList = Factor[];

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