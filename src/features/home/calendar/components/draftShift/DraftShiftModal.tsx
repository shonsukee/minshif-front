import React from "react";
import { DraftShiftModalContent } from "@/features/home/calendar/components/draftShift/DraftShiftModalContent";
import { Staff, Shift, setDraftShifts } from "../../types";

const DraftShiftModal = ({
	isOpen,
	date,
	staff,
	shift,
	setDraftShifts,
	onClose
}: {
	isOpen: boolean,
	date: string,
	staff: Staff,
	shift: Shift | null,
	setDraftShifts: setDraftShifts,
	onClose: () => void
}) => {
	if (!isOpen) return null;

	return (
		<div className="overlay modalDraftColor" onClick={onClose}>
			<div className="content" onClick={(e) => e.stopPropagation()}>
				<DraftShiftModalContent
					date={date}
					staff={staff}
					shift={shift}
					setDraftShifts={setDraftShifts}
					onClose={onClose}
				/>
			</div>
		</div>
	);
};

export default DraftShiftModal;
