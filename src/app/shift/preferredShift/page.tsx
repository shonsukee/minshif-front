"use client"
import React, { useState, useRef, useContext } from "react";
import { PreferredShiftForm } from "@/features/home/calendar/components/preferredShift/PreferredShiftForm";
import { PreferredShiftCalendar } from "@/features/home/calendar/components/preferredShift/PreferredShiftCalendar";
import { startOfDay } from "date-fns";
import { ShiftSubmissionContext } from "@/features/context/ShiftSubmissionContext";
import { Shift } from "@/features/home/calendar/types";

export default function SubmitPreferredShift() {
	const shiftSubmission = useContext(ShiftSubmissionContext);

	const startDate = shiftSubmission && shiftSubmission?.shiftSubmissionRequest.length > 0 ? startOfDay(new Date(shiftSubmission.shiftSubmissionRequest[0].start_date)) : startOfDay(new Date());
	const endDate = shiftSubmission && shiftSubmission?.shiftSubmissionRequest.length > 0 ? startOfDay(new Date(shiftSubmission.shiftSubmissionRequest[0].end_date)) : startOfDay(new Date());
	// 参照している日付
	const [date, setDate] = useState(startDate);
	const dateRef = useRef<Date>(startDate);

	// 仮希望シフト
	const [shifts, setShifts] = useState<Array<Shift>>([]);

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

