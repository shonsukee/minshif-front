"use client";
import RegisterPreferredShifts from '@/features/home/api/RegisterPreferredShifts';
import { add, addDays, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

const JP_LOCALE = 9 * 3600000;

export const PreferredShiftForm = (
{
	dateRef,
	endDate,
	date,
	shifts,
	setDate,
	setShifts
}: {
	dateRef: React.MutableRefObject<Date>,
	endDate: Date,
	date: Date,
	shifts: Array<{ date: Date, startTime: string, endTime: string, notes: string }>,
	setDate: React.Dispatch<React.SetStateAction<Date>>,
	setShifts: React.Dispatch<React.SetStateAction<Array<{ date: Date, startTime: string, endTime: string, notes: string }>>>
}) => {
	const [cookies] = useCookies(['token']);
	const router = useRouter();

	const shiftRef = useRef<Array<{ date: Date, startTime: string, endTime: string, notes: string }>>([]);

	const [startTime, setStartTime] = useState("09:00");
	const [endTime, setEndTime] = useState("18:00");
	const [notes, setNotes] = useState("");
	const [error, setError] = useState<string | null>(null);
	// 仮希望シフトの履歴を表示するJSX
	const [calHistory, setCalHistory] = useState<JSX.Element[]>([]);
	// シフト登録履歴
	const [shiftHistory, setShiftHistory] = useState<Array<{ startTime: string, endTime: string, notes: string }>>([]);

	// 仮希望シフトの初期値設定
	useEffect(() => {
		const matchingShift = shifts.find(shift => shift.date.toDateString() === dateRef.current.toDateString());
		if (matchingShift) {
		  setStartTime(matchingShift.startTime);
		  setEndTime(matchingShift.endTime);
		  setNotes(matchingShift.notes);
		} else {
			setStartTime('09:00');
			setEndTime('18:00');
			setNotes('');
		}
	}, [dateRef.current, shifts]);

	// 仮希望シフトの履歴を更新
	useEffect(() => {
		const updatedCalHistory: React.JSX.Element[] = shiftHistory.map((shift, index) => (
			<button
				key={index}
				onClick={(e) => {registerFromHistory(e, shift.startTime, shift.endTime, shift.notes)}}
				className="p-2 rounded-md w-full my-1 border-slate-300 border"
			>
				<div className="flex">
					<div className="mr-1">
						{shift.startTime}
					</div>
					-
					<div className="ml-1">
						{shift.endTime}
					</div>
					<div className="ml-2">
						{shift.notes}
					</div>
				</div>
			</button>
		));
		setCalHistory(updatedCalHistory);
	}, [shiftHistory]);

	const validateTimeRange = (newStart: string, newEnd: string) => {
		if (newStart < newEnd) {
			setStartTime(newStart);
			setEndTime(newEnd);
			return null;
		} else {
			return "開始時間は終了時間よりも前に設定してください";
		}
	};

	const handleTimeChange = (newStart: string, newEnd: string) => {
		const errorMessage = validateTimeRange(newStart, newEnd);
		setError(errorMessage);
	};

	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotes(e.target.value);
	};

	const handleClear = (e: React.FormEvent) => {
		e.preventDefault();
		shiftRef.current = shifts.filter(shift => shift.date.toDateString() !== dateRef.current.toDateString());
		setShifts(shiftRef.current);
	}

	// 履歴からの登録
	const registerFromHistory = (e: React.FormEvent, startTime: string, endTime: string, notes: string) => {
		setStartTime(startTime);
		setEndTime(endTime);
		setNotes(notes);
		handleRegister(e);
	}

	// 仮希望シフトを登録
	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault();
		if (error) {
			console.log(error);
			return;
		}
		const newShift = {
			date:		new Date(dateRef.current.getTime() + JP_LOCALE),
			startTime:	startTime,
			endTime:	endTime,
			notes:		notes
		};

		if (newShift.date.getDate() < endDate.getDate()) {
			dateRef.current = addDays(dateRef.current, 1);
			setDate(dateRef.current);
		}

		// 仮希望シフトリストに登録済みなら更新
		if (shifts.some(shift => shift.date.toString() === new Date(newShift.date.getTime()).toString())){
			shifts.forEach((shift, index) => {
				if (shift.date.toString() === new Date(newShift.date.getTime()).toString()) {
					shifts[index] = newShift;
				}
			});
		} else {
			shiftRef.current = [...shifts, newShift];
			setShifts(shiftRef.current);
		}
		setShiftHistory(prevHistory => {
			const existingIndex = prevHistory.findIndex(history => history.startTime === startTime && history.endTime === endTime && history.notes === notes);
			if (existingIndex !== -1) {
				const updatedHistory = [...prevHistory];
				const [existingItem] = updatedHistory.splice(existingIndex, 1);
				return [existingItem, ...updatedHistory];
			} else {
				return [{ startTime, endTime, notes }, ...prevHistory];
			}
		});
	};

	// 希望シフトを提出
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const token = cookies.token;

		const response = await RegisterPreferredShifts(shifts, token);
		if (response.status === 200) {
			router.push('/home');
			return;
		}
		setError(response.error);
	}

	return (
		<div className="col-start-7 col-span-3 border border-slate-300 p-5 min-w-80">
			<div className="content">
				<form onSubmit={handleSubmit}>
					<div className="registerShift grid grid-cols-12">
						<div className="col-start-1 col-span-7">
							■ シフトを追加する
						</div>
						<div className="col-start-1 col-span-5">
							{dateRef.current.toLocaleDateString('ja-JP', {
								month: 'long',
								day: 'numeric',
							})}
						</div>
						<div className="col-start-7 col-span-6">
							<input
								type="time"
								value={startTime}
								onChange={(e) => handleTimeChange(e.target.value, endTime)}
								className="rounded-md border border-black p-2 mb-1"
							/>
							<input
								type="time"
								value={endTime}
								onChange={(e)=>handleTimeChange(startTime, e.target.value)}
								className="rounded-md border border-black p-2"
							/>
						</div>
						<div className="col-start-1 col-span-12">
							<textarea
								name="notes"
								id="notes"
								cols={30}
								rows={1}
								value={notes}
								className="mt-2 w-full border border-gray-300 rounded-md p-2"
								placeholder="備考"
								onChange={handleNotesChange}
							></textarea>
						</div>
						<div className="flex justify-between my-3 col-start-1 col-span-12">
							<button onClick={handleClear}>
								<img src="/trash.svg" alt="trash" width={25} />
							</button>
							<button
								onClick={handleRegister}
								className="bg-orange-500 text-white font-bold p-2 rounded-md"
							>
								追加
							</button>
						</div>
					</div>

					<hr />
					{calHistory.length !== 0 ? (
						<div className="registerHistory pt-2">
							■ 履歴から追加
							<div className="overflow-y-auto overflow-x-hidden h-40 border p-2">
								{calHistory}
							</div>
						</div>
					): ""
					}
					<div className="flex justify-end mt-3">
						<button
							type="submit"
							className="bg-blue-500 text-white font-bold p-2 rounded-md"
						>
							提出
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}