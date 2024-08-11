import React, { useRef } from "react";
import { Staff, Shift, setDraftShifts } from "../../types";
import { formatTimeToISO, format_jp_date, format_time, isStartTimeBeforeEndTime } from "@/features/util/datetime";

export const DraftShiftModalContent = ({
	date,
	staff,
	shift,
	setDraftShifts,
	onClose
}: {
	date: string,
	staff: Staff,
	shift: Shift | null,
	setDraftShifts: setDraftShifts,
	onClose: () => void
}) => {
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const notesRef = useRef<HTMLInputElement>(null);

	const _start_time = shift ? format_time(shift.start_time) : "00:00";
	const _end_time = shift ? format_time(shift.end_time) : "00:00";
	const _notes = shift ? shift.notes : "";

	/**
	 * 仮登録
	 */
	const handleDraftRegister = () => {
		const start_time = startTimeRef.current ? startTimeRef.current.value : "";
		const end_time = endTimeRef.current ? endTimeRef.current.value : "";
		const notes = notesRef.current ? notesRef.current.value : "";

		if (!isStartTimeBeforeEndTime(start_time, end_time)) {
			alert("開始時間が終了時間と同じか，過去の時間を選択しています。");
			return;
		}

		setDraftShifts((prev) => {
			const newDraftShifts = prev.filter((draft) => new Date(draft.date).getTime() !== new Date(date).getTime());
			newDraftShifts.push({
				id: shift ? shift.id : null,
				email: staff.email,
				date: date,
				start_time: formatTimeToISO(start_time),
				end_time: formatTimeToISO(end_time),
				notes: notes,
				is_registered: true,
				shift_submission_request_id: shift && shift != undefined ? shift.shift_submission_request_id : null
			});
			return newDraftShifts;
		});

		onClose();
	}

	return (
		<>
			<div className="modalContent">
				シフト登録
			</div>
			<hr/>
			<div>
				<div className="modalTarget">
					<div className="font-bold">
						対象スタッフ
					</div>
					<div>
						{staff.user_name}
					</div>
				</div>
				<div className="modalTarget">
					<div className="font-bold">
						勤務日時
					</div>
					<div>
						{format_jp_date(date)}
					</div>
				</div>
				<div className="modalTarget">
					<div className="font-bold">
						希望シフト時間
					</div>
					<div>
						{shift && _end_time !== '00:00' ? _start_time + "〜" + _end_time : "未登録"}
					</div>
				</div>
				<div className="modalTarget">
					<div className="font-bold">
						シフト時間
					</div>
					<div>
						<input type="time" name="start_time" defaultValue={_start_time} ref={startTimeRef} />
						〜
						<input type="time" name="end_time" defaultValue={_end_time} ref={endTimeRef} />
					</div>
				</div>
				<div className="modalTarget">
					<div className="font-bold">
						備考
					</div>
					<div>
						<input type="text" name="notes" defaultValue={_notes} ref={notesRef} />
					</div>
				</div>
			</div>
			<hr/>
			<div className="flex justify-between">
				<button onClick={onClose}>閉じる</button>
				<button type="button" className="bg-amber-500 px-5" onClick={handleDraftRegister}>仮登録</button>
			</div>
		</>
	);
}
