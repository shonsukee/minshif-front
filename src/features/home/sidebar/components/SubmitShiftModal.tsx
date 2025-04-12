import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/features/components/ui/dialog";
import { Button } from "@/features/components/ui/button";
import { Label } from "@/features/components/ui/label";
import { Input } from "@/features/components/ui/input";
import { DateTimePicker } from "@/features/components/ui/datetime-picker";
import { extractTime, formatDateToISO } from "@/features/util/datetime";
import SubmitShiftRequest from "../api/SubmitShiftRequest";
import { useSession } from 'next-auth/react';
import { notifyError, notifySuccess } from "@/features/components/ui/toast";

export const SubmitShiftModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
	const { data: session } = useSession();
	const [deadline, setDeadline] = useState<Date | undefined>(undefined);
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	async function handleSubmitShiftInfo (e: any) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		if (!startDate || !endDate || !deadline) {
			notifyError("日付を選択してください。");
			return;
		}

		if (startDate.getTime() > endDate.getTime()) {
			notifyError("開始日付が終了日付より後の日付を選択しています。");
			return;
		}

		if (deadline.getTime() > startDate.getTime()) {
			notifyError("締切が開始日付より後の日付です。");
			return;
		}

		const shiftRequest = {
			start_date: formatDateToISO(startDate),
			end_date: formatDateToISO(endDate),
			deadline_date: formatDateToISO(deadline),
			deadline_time: extractTime(deadline),
			notes: data.notes
		};

		const response: string[] | undefined = await SubmitShiftRequest(shiftRequest, session?.user?.email);
		if (!response || response['error']) {
			notifyError("シフト提出依頼に失敗しました。");
		} else {
			notifySuccess(response['message']);
			onOpenChange(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]" onOpenAutoFocus={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>シフト提出依頼</DialogTitle>
					<DialogDescription>
						スタッフに対してシフト提出を依頼します。
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmitShiftInfo}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="name" className="text-right">対象スタッフ</Label>
							<div className="col-span-2">全てのスタッフ</div>
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="shift_submission_period" className="text-right">シフト提出期間</Label>
							<DateTimePicker hourCycle={12} granularity="day" placeholder="開始日付を選択" value={startDate} onChange={setStartDate} />
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label className="text-right" />
							<DateTimePicker hourCycle={12} granularity="day" placeholder="終了日付を選択" value={endDate} onChange={setEndDate} />
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="deadline" className="text-right">締切</Label>
							<DateTimePicker placeholder="日付を選択" value={deadline} onChange={setDeadline} />
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="notes" className="text-right">備考</Label>
							<Input name="notes" id="notes" placeholder={"推奨"} className="col-span-2" />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">登録</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};