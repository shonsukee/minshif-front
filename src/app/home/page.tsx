"use client"
import React, { useState } from "react";
import RegisterShiftsButton from "@/features/home/calendar/components/shift/RegisterShiftsButton";
import { WeekAxisCalendar } from "@/features/home/calendar/components/weekAxis/WeekAxisCalendar";
import { ViewModeButton } from "@/features/home/calendar/components/ViewModeButton";
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from "date-fns";
import "@/features/home/Home.css";
import { Shift } from "@/features/home/calendar/types";
import { SelectScrollable } from "@/features/home/sidebar/components/ShiftSubmissionList";
import { Button } from "@/features/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export default function Home() {
	const [date, setDate] = useState(new Date());
	const [viewMode, setViewMode] = useState('week');

	// 登録予定シフト
	const [shifts, setShifts] = useState<Shift[]>([]);

	const _start_date = format(startOfWeek(date), 'yyyy年MM月');
	const _end_date = format(endOfWeek(date), 'yyyy年MM月');

	const handleIncrement = () => {
		setDate(addWeeks(date, 1));
	};

	const handleDecrement = () => {
		setDate(subWeeks(date, 1));
	};

	const CalendarMode = () => {
		switch (viewMode) {
			case 'month':
				return (
					// <MonthAxisCalendar />
					<></>
				);
			case 'week':
				return (
					<WeekAxisCalendar shifts={shifts} setShifts={setShifts} date={date} setDate={setDate} />
				);
			case 'day':
				return (
					// <DayAxisCalendar date={date} setDate={setDate} />
					<></>
				);
			default:
				return (
					<WeekAxisCalendar shifts={shifts} setShifts={setShifts} date={date} setDate={setDate} />
				);
		}
	};

	return (
		<div className="calendar-root flex-1 py-6">
			<div className="flex justify-end">
				<SelectScrollable />
				<ViewModeButton viewMode={viewMode} setViewMode={setViewMode} />
				<Button variant="outline" size="icon" onClick={handleDecrement}>
					<ChevronLeftIcon className="h-4 w-4" />
				</Button>
				<Button variant="outline" size="icon" onClick={handleIncrement}>
					<ChevronRightIcon className="h-4 w-4" />
				</Button>
				<div className="text-xl flex items-center">
					<span>{ _start_date === _end_date ? _start_date : _start_date + "〜" + _end_date }</span>
				</div>
			</div>
			{CalendarMode()}
			{shifts.length > 0 && (
				<RegisterShiftsButton shifts={shifts} />
			)}
		</div>
	);
}
