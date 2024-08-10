"use client"
import React, { useState, useRef, useContext, useEffect } from "react";
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

	useEffect(() => {
		console.log("submission",shiftSubmission);
		console.log("request",shiftSubmission?.shiftSubmissionRequest);
		console.log("start",startDate);
	},[date]);
	// 仮希望シフト
	const [shifts, setShifts] = useState<Array<Shift>>([]);

	return (
		<div>
			<div className='md:flex flex-row'>
				<div className='basis-1/2'>
					<PreferredShiftCalendar
						dateRef={dateRef}
						selectedDate={date}
						startDate={startDate}
						endDate={endDate}
						shifts={shifts}
						setDate={setDate}
					/>
				</div>
				<div className='basis-1/2 text-center'>
					<PreferredShiftForm
						dateRef={dateRef}
						endDate={endDate}
						date={date}
						shifts={shifts}
						setShifts={setShifts}
						setDate={setDate}
					/>
				</div>
			</div>
		</div>
	);
};

