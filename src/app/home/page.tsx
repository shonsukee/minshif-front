"use client"
import React, { useState, useContext } from "react";
import RegisterDraftShiftsButton from "@/features/home/calendar/components/draftShift/RegisterDraftShiftsButton";
import { WeekAxisCalendar } from "@/features/home/calendar/components/weekAxis/WeekAxisCalendar";
import { SubmitShiftModal } from "@/features/home/sidebar/components/SubmitShiftModal";
import { ViewModeButton } from "@/features/home/calendar/components/ViewModeButton";
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from "date-fns";
import "@/features/home/Home.css";
import { Shift } from "@/features/home/calendar/types";
import { SelectScrollable } from "@/features/home/sidebar/components/ShiftSubmissionList";

export default function Home() {
	const [date, setDate] = useState(new Date());
	const [viewMode, setViewMode] = useState('week');

	// 登録予定シフト
	const [draftShifts, setDraftShifts] = useState<Shift[]>([]);

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
					<WeekAxisCalendar draftShifts={draftShifts} setDraftShifts={setDraftShifts} date={date} setDate={setDate} />
				);
			case 'day':
				return (
					// <DayAxisCalendar date={date} setDate={setDate} />
					<></>
				);
			default:
				return (
					<WeekAxisCalendar draftShifts={draftShifts} setDraftShifts={setDraftShifts} date={date} setDate={setDate} />
				);
		}
	};

	return (
		<div>
			<div className="calendar-root">
				<div className="flex">
					<SubmitShiftModal />
					<SelectScrollable />
					<ViewModeButton viewMode={viewMode} setViewMode={setViewMode} />
					<button className="dateAdjustBtn" onClick={handleDecrement}> {"<"} </button>
					<button className="dateAdjustBtn" onClick={handleIncrement}> {">"} </button>
					<div className="text-xl flex items-center">
						<span>{ _start_date === _end_date ? _start_date : _start_date + "〜" + _end_date }</span>
					</div>
				</div>
				{CalendarMode()}
				{draftShifts.length > 0 && (
					<RegisterDraftShiftsButton draftShifts={draftShifts} />
				)}
			</div>
		</div>
	);
}
