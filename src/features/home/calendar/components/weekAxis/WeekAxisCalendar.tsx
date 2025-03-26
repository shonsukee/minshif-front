import React from "react";
import { format, addDays, subDays, getDay } from "date-fns";
import { ja } from "date-fns/locale";
import { WeekShift } from "./WeekShift";
import { WeekAxisCalendarProps } from "@/features/home/calendar/types";
import "./WeekAxis.css";

export const WeekAxisCalendar = ({ date, setDate, shifts, setShifts }: WeekAxisCalendarProps) => {
	const _day = getDay(date);
	const _start_date = subDays(date, _day);

	const dayList = Array(7)
		.fill(0)
		.map((_, idx) => {
			const day = idx;
			const dateFormat = format(
				addDays(_start_date, idx),
				"yyyy-MM-dd",
				{ locale: ja }
			);

			return { day: day, date: dateFormat };
		});

	return (
		<div role="grid" aria-readonly="true" className="weekCalendarContainer">
			<WeekShift dayList={dayList} shifts={shifts} setShifts={setShifts} />
		</div>
	);
}