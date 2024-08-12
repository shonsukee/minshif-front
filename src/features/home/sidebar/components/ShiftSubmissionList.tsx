import { useContext } from "react";
import { ShiftSubmissionContext,  } from "@/features/context/ShiftSubmissionContext";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/features/home/sidebar/components/select";
import { useRouter } from "next/navigation";
import { ShiftSubmissionRequest } from "@/features/auth/types";

export function SelectScrollable() {
	const shiftSubmission = useContext(ShiftSubmissionContext);
	const router = useRouter();

	const handleSelect = (value: string) => {
		router.push(`/shift/preferredShift/${value}`);
	};

	const formatDate = (dateStr: Date): string => {
		const date = new Date(dateStr);
		const today = new Date();
		const isSameYear = date.getFullYear() === today.getFullYear();
		const formattedDate = isSameYear
			? `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
			: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
		return formattedDate;
	};

	const formatLabel = (submission: ShiftSubmissionRequest): JSX.Element => {
		const deadline = submission.deadline_date ? `${formatDate(submission.deadline_date)} 〆` : "締切日なし";
		const notes = submission.notes ? submission.notes : "";

		return (
			<>
				<span className="text-red-600 font-bold text-xs">{deadline}</span>
				{notes && <span className="font-bold">   |  {notes}</span>}
			</>
		);
	};


	return (
		<Select onValueChange={handleSelect}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="シフト提出" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>一覧</SelectLabel>
					{shiftSubmission && shiftSubmission.shiftSubmissionRequest.map((submission) => (
						<SelectItem key={submission.id} value={submission.id.toString()}>
							{formatLabel(submission)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
