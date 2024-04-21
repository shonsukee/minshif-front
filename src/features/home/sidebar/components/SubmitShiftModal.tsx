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
			{/** TODO: 既に提出済みなら無効に */}
			<button className="submitShift" onClick={() => setSubmitShiftModal(true)}>
				シフト提出依頼
			</button>
			{submitShiftModal && (
				<div id="overlay" className="submitShiftOverlay" onClick={handleOverlayClick}>
					<div id="content" onClick={(e) => e.stopPropagation()}>
						<SubmitShiftModalContent setSubmitShiftModal={setSubmitShiftModal} />
					</div>
				</div>
			)}
		</div>
	)
};