import React from "react";
import { format, addDays, subDays, getDay } from "date-fns";
import { ja } from "date-fns/locale";
import { WeekShift } from "./WeekShift";
import { WeekAxisCalendarProps } from "@/features/home/calendar/types";
import "./WeekAxis.css";

export const WeekAxisCalendar = ({ date, setDate }: WeekAxisCalendarProps) => {
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

	const factorList = [
		{id: 1, name: "労働時間合計"},
		{id: 2, name: "人件費"},
		{id: 3, name: "Aさん"},
		{id: 4, name: "Bさん"},
		{id: 5, name: "管理者S"}
	];

	return (
		<div role="grid" aria-readonly="true" className="weekCalendarContainer">
			<WeekShift dayList={dayList} factorList={factorList} />
		</div>
	);
}