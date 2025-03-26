import React from "react";
import { ShiftModalContent } from "@/features/home/calendar/components/shift/ShiftModalContent";
import { Staff, Shift, setShifts } from "../../types";

const ShiftModal = ({
	isOpen,
	date,
	staff,
	shift,
	setShifts,
	onClose
}: {
	isOpen: boolean,
	date: string,
	staff: Staff,
	shift: Shift | null,
	setShifts: setShifts,
	onClose: () => void
}) => {
	if (!isOpen) return null;

	return (
		<div className="overlay modalColor" onClick={onClose}>
			<div className="content" onClick={(e) => e.stopPropagation()}>
				<ShiftModalContent
					date={date}
					staff={staff}
					shift={shift}
					setShifts={setShifts}
					onClose={onClose}
				/>
			</div>
		</div>
	);
};

export default ShiftModal;
