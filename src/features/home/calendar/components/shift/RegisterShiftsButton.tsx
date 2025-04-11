import React from "react";
import RegisterShifts from "@/features/home/api/RegisterShifts";
import { Shift } from "../../types";
import { useSession } from "next-auth/react";
import { notifyError, notifySuccess } from "@/features/components/ui/toast";

const RegisterShiftsButton = ({pendingShifts}: {pendingShifts: Shift[]}) => {
	const { data: session } = useSession();
	const handleRegisterShifts = async () => {
		if (!session?.user?.email) {
			notifyError('再ログインしてください');
			return;
		}

		const response = await RegisterShifts(session.user.email, pendingShifts);

		if ('error' in response || !response ) {
			notifyError(response.error);
		} else {
			notifySuccess(response.data);
		}
	};

	return (
		<div className="flex justify-center">
			<button className="bg-sky-500" onClick={handleRegisterShifts}>シフト確定</button>
		</div>
	);
}

export default RegisterShiftsButton;