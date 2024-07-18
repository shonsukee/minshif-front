import React, { useState } from "react";
import { SubmitShiftModalContent } from "@/features/home/sidebar/components/SubmitShiftModalContent";

export const SubmitShiftModal = () => {
	const [submitShiftModal, setSubmitShiftModal] = useState(false);

	const handleOverlayClick = (e: any) => {
		e.stopPropagation();
		setSubmitShiftModal(false);
	};

	return (
		<div>
			<button className="submitShift" onClick={() => setSubmitShiftModal(true)}>
				シフト提出依頼
			</button>
			{submitShiftModal && (
				<div className="overlay modalSubmitColor" onClick={handleOverlayClick}>
					<div className="content" onClick={(e) => e.stopPropagation()}>
						<SubmitShiftModalContent setSubmitShiftModal={setSubmitShiftModal} />
					</div>
				</div>
			)}
		</div>
	)
};