import RegisterDraftShifts from "@/features/home/api/RegisterDraftShifts";
import { Shift } from "../../types";

const RegisterDraftShiftsButton = ({draftShifts}: {draftShifts: Shift[]}) => {
	const handleRegisterDraftShifts = async () => {
		const data = await RegisterDraftShifts(draftShifts);
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