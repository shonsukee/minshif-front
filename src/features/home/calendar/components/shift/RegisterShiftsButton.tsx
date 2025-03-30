import React from "react";
import RegisterShifts from "@/features/home/api/RegisterShifts";
import { Shift } from "../../types";
import { useSession } from "next-auth/react";

const RegisterShiftsButton = ({pendingShifts}: {pendingShifts: Shift[]}) => {
	const { data: session } = useSession();
	const handleRegisterShifts = async () => {
		if (!session?.user?.email) {
			alert('再ログインしてください');
			return;
		}

		const data = await RegisterShifts(session.user.email, pendingShifts);
		if (data.error) {
			alert(data.error);
		} else {
			alert(data.message);
		}
	};

	return (
		<div className="flex justify-center">
			<button className="bg-sky-500" onClick={handleRegisterShifts}>シフト確定</button>
		</div>
	);
}

export default RegisterShiftsButton;