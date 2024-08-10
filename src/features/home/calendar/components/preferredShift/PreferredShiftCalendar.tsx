import React from 'react';
import { DAY_LIST } from "@/features/home/calendar/components/constant/index";
import { fetchSixWeekDay } from '../constant/fetchSixWeekDay';
import { Shift } from '../../types';
import { extractYMD } from '@/features/util/datetime';

// 標準時刻を取得
const stripTime = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

// 希望シフトカレンダー作成
export const PreferredShiftCalendar = (
{
	dateRef,
	selectedDate,
	startDate,
	endDate,
	shifts,
	setDate
}:
{
	dateRef: React.MutableRefObject<Date>,
	selectedDate: Date,
	startDate: Date,
	endDate: Date,
	shifts: Array<Shift>,
	setDate: React.Dispatch<React.SetStateAction<Date>>
}) => {
	const weeks = fetchSixWeekDay(stripTime(startDate));

	// 参照している日付を変更
	const handlePreferredShift = (date: Date) => {
		const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		dateRef.current = newDate;
		setDate(newDate);
	};

	return (
		<div className="root max-w-2xl col-start-2 col-span-4">
			<div className="month px-4 min-w-fit">
				<div className="dayOfWeek flex justify-around">
					{DAY_LIST.map(({ id, day }) => (
						<div key={id} className="day flex justify-center flex-auto">
							{day}
						</div>
					))}
				</div>
				{weeks.map((week, weekIndex) => (
					<div key={weekIndex} className="week flex justify-around">
						{week.map((date, dateIndex) => (
							<div
								onClick={() => {if (startDate <= date && date <= endDate) handlePreferredShift(date)}}
								key={weekIndex.toString() + '-' + dateIndex.toString()}
								className="text-2xl h-16 w-full flex items-center justify-center flex-auto"
							>
								<div className="w-10 h-10">
									{/* カレンダーの日付表示 */}
									{(startDate <= date && date <= endDate) ?
										(
											<button
												className={
													`flex justify-center items-center rounded-full w-full h-full
													${selectedDate && selectedDate.toString() === date.toString() ? "bg-red-500 text-white" : "hover:bg-neutral-200"}`
												}
												disabled={date < startDate || endDate < date}
											>
												{date.getDate().toString()}
											</button>

										) : (
											<div className={`flex justify-center items-center rounded-full w-full h-full
											${date < startDate || endDate < date ? "text-slate-300" : ""}`}>
												{date.getDate().toString()}
											</div>
										)
									}
									{/* 予定がある場合，その日付に ● マークをつける */}
									{shifts.map((shift, shiftIndex) => {
										if (extractYMD(shift.date) === extractYMD(date.toString())) {
											return (
												<div key={`shift-${weekIndex}-${dateIndex}-${shiftIndex}`} className="w-full flex justify-center">
													<div className="w-2 h-2 rounded-full bg-slate-300 mt-1" />
												</div>
											);
										}
										return null;
									})}
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};
