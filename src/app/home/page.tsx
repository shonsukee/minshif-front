"use client"
import React, { useState, useContext } from "react";
import RegisterShiftsButton from "@/features/home/calendar/components/shift/RegisterShiftsButton";
import { WeekAxisCalendar } from "@/features/home/calendar/components/weekAxis/WeekAxisCalendar";
import { SubmitShiftModal } from "@/features/home/sidebar/components/SubmitShiftModal";
import { ViewModeButton } from "@/features/home/calendar/components/ViewModeButton";
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from "date-fns";
import "@/features/home/Home.css";
import { Shift } from "@/features/home/calendar/types";
import { SelectScrollable } from "@/features/home/sidebar/components/ShiftSubmissionList";
import { MembershipContext } from "@/features/context/MembershipContext";
import Link from "next/link";
import { Button, buttonVariants } from "@/features/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { LINEBotButton } from "@/features/home/sidebar/components/line/LINEBotButton";
import { InviteButton } from "@/features/home/sidebar/components/invitation/InviteButton";

export default function Home() {
	const membership = useContext(MembershipContext);
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
		<div>
			<div className="calendar-root">
				<div className="flex justify-end">
					{/* シフト提出依頼 - without staff */}
					{(
						membership?.membership?.privilege === "manager" ||
						membership?.membership?.privilege === "developer"
					) && (
						<SubmitShiftModal />
					)}

					<Link href="/store/create" className={buttonVariants({ variant: "outline" })}>
						店舗作成
					</Link>

					<LINEBotButton />
                    <InviteButton />

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
		</div>
	);
}
