import React, { useContext, useRef } from "react";
import { Staff, Shift, setPendingShifts } from "../../types";
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
import { MembershipContext } from "@/features/context/MembershipContext";

export const ShiftModalContent = ({
	date,
	staff,
	shift,
	setPendingShifts,
	onClose
}: {
	date: string,
	staff: Staff,
	shift: Shift | null,
	setPendingShifts: setPendingShifts,
	onClose: () => void
}) => {
	const membership = useContext(MembershipContext);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const notesRef = useRef<HTMLInputElement>(null);

	const _start_time = shift ? format_time(shift.start_time) : "00:00";
	const _end_time = shift ? format_time(shift.end_time) : "00:00";
	const _notes = shift ? shift.notes : "";

	const handleShiftsRegister = () => {
		const start_time = startTimeRef.current ? startTimeRef.current.value : "";
		const end_time = endTimeRef.current ? endTimeRef.current.value : "";
		const notes = notesRef.current ? notesRef.current.value : "";

		if (!isStartTimeBeforeEndTime(start_time, end_time)) {
			alert("開始時間が終了時間と同じか，過去の時間を選択しています。");
			return;
		}

		console.log("開始！");
		setPendingShifts((prev) => {
			const newShifts = prev.filter((shifts) => new Date(shifts.date).getTime() !== new Date(date).getTime());
			console.log(newShifts);
			newShifts.push({
				id: shift ? shift.id : null,
				email: staff.email,
				date: date,
				start_time: formatTimeToISO(start_time),
				end_time: formatTimeToISO(end_time),
				notes: notes,
				is_registered: true,
				shift_submission_request_id: shift && shift != undefined ? shift.shift_submission_request_id : null
			});
			return newShifts;
		});

		onClose();
	}

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]" onOpenAutoFocus={(e) => {e.preventDefault()}} >
				<DialogHeader>
					{membership && membership.membership?.privilege === "staff" ? (
						<DialogTitle>シフト詳細</DialogTitle>
					) : (
						<>
							<DialogTitle>シフト登録</DialogTitle>
							<DialogDescription>
								シフトの仮登録を行います。
							</DialogDescription>
						</>
					)}
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

					{/* 管理者のみシフトの登録ができる */}
					{membership && membership.membership?.privilege === "manager" &&
						<>
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
						</>
					}
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>閉じる</Button>
					{
						membership && membership.membership?.privilege === "manager" &&
						<Button variant="orange" onClick={handleShiftsRegister}>仮登録</Button>
					}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}