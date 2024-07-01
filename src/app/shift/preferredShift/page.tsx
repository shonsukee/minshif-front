"use client"
import React, { useState, useRef } from "react";
import { PreferredShiftForm } from "@/features/home/calendar/components/preferredShift/PreferredShiftForm";
import { PreferredShiftCalendar } from "@/features/home/calendar/components/preferredShift/PreferredShiftCalendar";
import { startOfDay } from "date-fns";

interface ShiftSubmissionRequest {
	date: Date;
	startTime: string;
	endTime: string;
	notes: string;
}

interface SubmitPreferredShiftProps {
	shiftSubmissionRequest: ShiftSubmissionRequest[];
}

const SubmitPreferredShift: React.FC<SubmitPreferredShiftProps> = ({ shiftSubmissionRequest }) => {
	const startDate = startOfDay(new Date("2024-07-01"));
	const endDate = startOfDay(new Date("2024-07-30"));
	// 参照している日付
	const [date, setDate] = useState(startDate);
	const dateRef = useRef<Date>(startDate);

	// 仮希望シフト
	const [shifts, setShifts] = useState<Array<{ date: Date, startTime: string, endTime: string, notes: string }>>([]);

	return (
		<div className="grid grid-cols-12">
			<PreferredShiftCalendar
				dateRef={dateRef}
				selectedDate={date}
				startDate={startDate}
				endDate={endDate}
				shifts={shifts}
				setDate={setDate}
			/>
			<PreferredShiftForm
				dateRef={dateRef}
				endDate={endDate}
				date={date}
				shifts={shifts}
				setShifts={setShifts}
				setDate={setDate}
			/>
		</div>
	);
};

export default SubmitPreferredShift;
