import React from "react";
import RegisterDraftShifts from "@/features/home/api/RegisterDraftShifts";
import { Shift } from "../../types";
import { useSession } from "next-auth/react";

const RegisterDraftShiftsButton = ({draftShifts}: {draftShifts: Shift[]}) => {
	const { data: session } = useSession();
	const handleRegisterDraftShifts = async () => {
		if (!session?.user?.email) {
			alert('再ログインしてください');
			return;
		}

		const data = await RegisterDraftShifts(session.user.email, draftShifts);
		if (data.error) {
			alert(data.error);
		} else {
			alert(data.message);
		}
	};

	return (
		<div className="flex justify-center">
			<button className="bg-sky-500" onClick={handleRegisterDraftShifts}>シフト確定</button>
		</div>
	);
}

export default RegisterDraftShiftsButton;