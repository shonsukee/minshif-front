"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import { PreferredShiftForm } from "@/features/home/calendar/components/preferredShift/PreferredShiftForm";
import { PreferredShiftCalendar } from "@/features/home/calendar/components/preferredShift/PreferredShiftCalendar";
import { startOfDay } from "date-fns";
import { ShiftSubmissionContext } from "@/features/context/ShiftSubmissionContext";
import { Shift } from "@/features/home/calendar/types";
import { Spinner } from "@/features/components/ui/spinner";

export default function SubmitPreferredShift({ params }: { params: any }) {
	const ShiftSubmissionRequestContext = useContext(ShiftSubmissionContext);

	// 仮希望シフト
	const [shifts, setShifts] = useState<Array<Shift>>([]);

	// 参照している日付
	const [date, setDate] = useState(startOfDay(new Date()));
	const dateRef = useRef<Date>(startOfDay(new Date()));

	// 適する希望シフト提出依頼を取得
	const shiftSubmissionRequest = ShiftSubmissionRequestContext !== undefined
		? ShiftSubmissionRequestContext.shiftSubmissionRequest.filter((submission) => { return submission.id == params.id })
		: [];

	useEffect(() => {
		if (shiftSubmissionRequest.length > 0) {
			const startDate = startOfDay(new Date(shiftSubmissionRequest[0].start_date));
			setDate(startDate);
			dateRef.current = startDate;
		}
	}, []);

	if (shiftSubmissionRequest.length === 0) {
		return <Spinner size="large">Loading...</Spinner>;
	}

	// 希望シフトが存在する場合にのみ日付を更新
	const startDate = startOfDay(new Date(shiftSubmissionRequest[0].start_date));
	const endDate = startOfDay(new Date(shiftSubmissionRequest[0].end_date));

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
