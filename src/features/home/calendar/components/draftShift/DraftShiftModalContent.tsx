import React, { useRef } from "react";
import { Staff, Shift, setDraftShifts } from "../../types";
import { formatTimeToISO, format_jp_date, format_time, isStartTimeBeforeEndTime } from "@/features/util/datetime";
import { Button } from "@/features/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/features/components/ui/dialog";
import { Input } from "@/features/components/ui/input"
import { Label } from "@/features/components/ui/label"
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
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]" onOpenAutoFocus={(e) => {e.preventDefault()}} >
				<DialogHeader>
					<DialogTitle>シフト登録</DialogTitle>
					<DialogDescription>
						シフトの仮登録を行います。
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-3 items-center gap-4">
						<Label className="text-right">対象スタッフ</Label>
						<div className="col-span-2">{staff.user_name}</div>
					</div>
					<div className="grid grid-cols-3 items-center gap-4">
						<Label className="text-right">勤務日時</Label>
						<div className="col-span-2">{format_jp_date(date)}</div>
					</div>
					<div className="grid grid-cols-3 items-center gap-4">
						<Label className="text-right">希望時間</Label>
						<div className="col-span-2">
							{shift && _end_time !== '00:00' ? `${_start_time}〜${_end_time}` : "-"}
						</div>
					</div>
					<div className="grid grid-cols-3 items-center gap-4">
						<Label className="text-right">備考</Label>
						<div className="col-span-2 max-h-24 overflow-y-auto">
							{_notes ? _notes : "-"}
						</div>
					</div>

					<div className="grid grid-cols-12 items-center gap-4">
						<hr className="col-span-10 col-start-2 border-gray-100" />
					</div>

					<div className="grid grid-cols-3 items-center gap-4">
						<Label className="text-right">開始時間</Label>
						<div className="col-span-2">
							<Input type="time" defaultValue={_start_time} ref={startTimeRef} className="w-25" />
						</div>
						<Label className="text-right">終了時間</Label>
						<div className="col-span-2">
							<Input type="time" defaultValue={_end_time} ref={endTimeRef} className="w-25" />
						</div>
					</div>
					<div className="grid grid-cols-3 items-center gap-4">
						<Label className="text-right">伝言</Label>
						<div className="col-span-2">
							<Input type="text" placeholder={"任意"} ref={notesRef} />
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>閉じる</Button>
					<Button variant="orange" onClick={handleDraftRegister}>仮登録</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}