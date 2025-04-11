"use client";
import { ShiftSubmissionContext } from '@/features/context/ShiftSubmissionContext';
import RegisterPreferredShifts from '@/features/home/api/RegisterPreferredShifts';
import { addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '@/features/context/UserContext';
import { Shift, ShiftHistory } from '@/features/home/calendar/types';
import { extractDate, extractYMD } from '@/features/util/datetime';
import Image from 'next/image';
import { notifyError } from '@/features/components/ui/toast';

const JP_LOCALE = 9 * 3600000;

export const PreferredShiftForm = (
{
	dateRef,
	endDate,
	shifts,
	setDate,
	setShifts
}: {
	dateRef: React.MutableRefObject<Date>,
	endDate: Date,
	date: Date,
	shifts: Array<Shift>,
	setDate: React.Dispatch<React.SetStateAction<Date>>,
	setShifts: React.Dispatch<React.SetStateAction<Array<Shift>>>
}) => {
	const user = useContext(UserContext);
	const router = useRouter();
	const shiftSubmission = useContext(ShiftSubmissionContext);

	const shiftRef = useRef<Array<Shift>>([]);

	const [startTime, setStartTime] = useState("09:00");
	const [endTime, setEndTime] = useState("18:00");
	const [notes, setNotes] = useState("");
	// 仮希望シフトの履歴を表示するJSX
	const [calHistory, setCalHistory] = useState<JSX.Element[]>([]);
	// シフト登録履歴
	const [shiftHistory, setShiftHistory] = useState<Array<ShiftHistory>>([]);

	// 仮希望シフトの初期値設定
	useEffect(() => {
		const matchingShift = shifts.find(shift => extractYMD(shift.date) === extractYMD(dateRef.current.toString()));
		if (matchingShift) {
			setStartTime(matchingShift.start_time);
			setEndTime(matchingShift.end_time);
			setNotes(matchingShift.notes);
		} else {
			setStartTime('09:00');
			setEndTime('18:00');
			setNotes('');
		}
	}, [shifts, dateRef]);

	// 仮希望シフトの履歴を更新
	useEffect(() => {
		const updatedCalHistory: React.JSX.Element[] = shiftHistory.map((shift, index) => (
			<button
				key={index}
				onClick={(e) => {registerFromHistory(e, shift.start_time, shift.end_time, shift.notes)}}
				className="p-2 rounded-md w-full my-1 border-slate-300 border"
			>
				<div className="flex">
					<div className="mr-1">
						{shift.start_time}
					</div>
					-
					<div className="ml-1">
						{shift.end_time}
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
		if (errorMessage) {
			notifyError(errorMessage);
		}
	};

	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotes(e.target.value);
	};

	const handleClear = (e: React.FormEvent) => {
		e.preventDefault();
		shiftRef.current = shifts.filter(shift => shift.date !== dateRef.current.toDateString());
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
		const newShift: Shift = {
			id: null,
			email:		user?.user?.email || "",
			date:		new Date(dateRef.current.getTime() + JP_LOCALE).toDateString(),
			start_time:	startTime,
			end_time:	endTime,
			notes:		notes,
			is_registered: false,
			shift_submission_request_id: shiftSubmission?.shiftSubmissionRequest[0].id || null
		};

		if (extractDate(newShift.date) < endDate.getDate()) {
			dateRef.current = addDays(dateRef.current, 1);
			setDate(dateRef.current);
		}

		// 仮希望シフトリストに登録済みなら更新
		if (shifts.some(shift => extractYMD(shift.date) === extractYMD(newShift.date))) {
			shifts.forEach((shift, index) => {
				if (extractYMD(shift.date) === extractYMD(newShift.date)) {
					shifts[index] = newShift;
				}
			});
		} else {
			shiftRef.current = [...shifts, newShift];
			setShifts(shiftRef.current);
		}
		setShiftHistory(prevHistory => {
			const existingIndex = prevHistory.findIndex(history => history.start_time === startTime && history.end_time === endTime && history.notes === notes);
			if (existingIndex !== -1) {
				const updatedHistory = [...prevHistory];
				const [existingItem] = updatedHistory.splice(existingIndex, 1);
				return [existingItem, ...updatedHistory];
			} else {
				return [{ start_time: startTime, end_time: endTime, notes: notes }, ...prevHistory];
			}
		});
	};

	// 希望シフトを提出
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await RegisterPreferredShifts(shifts, user?.user?.email);

		if (response && 'data' in response) {
			router.push('/home');
		}
	}

	return (
		<div
			className="col-start-7 col-span-4 border border-slate-300 p-5"
			style={{ minWidth: '320px', maxWidth: '650px' }}
		>
			<form onSubmit={handleSubmit}>
				<div className="registerShift grid grid-cols-12 gap-4">
					<div className="col-span-7 font-bold text-left flex items-center">
						■ シフトを追加する
					</div>

					<div
						className="col-span-5 text-right flex items-center justify-end"
					>
						{dateRef.current.toLocaleDateString('ja-JP', {
							month: 'long',
							day: 'numeric',
						})}
					</div>

					<div className="col-span-12 flex flex-col gap-2">
						<div className="flex justify-end flex-col items-end">
							<input
								type="time"
								value={startTime}
								onChange={(e) => handleTimeChange(e.target.value, endTime)}
								className="rounded-md border border-black p-1 mb-1"
								style={{ width: '100px' }}
							/>
							<input
								type="time"
								value={endTime}
								onChange={(e) => handleTimeChange(startTime, e.target.value)}
								className="rounded-md border border-black p-1"
								style={{ width: '100px' }}
							/>
						</div>
						<textarea
							name="notes"
							id="notes"
							cols={30}
							rows={2}
							value={notes}
							className="border border-gray-300 rounded-md p-2"
							placeholder="備考"
							onChange={handleNotesChange}
							style={{ width: '100%' }}
						></textarea>
					</div>

					<div className="col-span-12 flex justify-between items-center my-3">
						<Image src="/trash.svg" alt="trash" width={25} height={25} onClick={handleClear} />
						<button
							onClick={handleRegister}
							className="bg-orange-500 text-white font-bold p-2 rounded-md"
							type="button"
							style={{ height: '40px' }}
						>
							追加
						</button>
					</div>
				</div>

				<hr />

				{calHistory.length !== 0 && (
					<div className="registerHistory pt-2">
						■ 履歴から追加
						<div className="overflow-y-auto overflow-x-hidden h-40 border p-2">
							{calHistory}
						</div>
					</div>
				)}

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
	);
}