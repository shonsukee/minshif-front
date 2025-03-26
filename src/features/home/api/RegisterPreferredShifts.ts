import { Shift } from '../calendar/types';

const RegisterPreferredShifts = async ( preferredShifts: Shift[], email: string | undefined ) => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/preferred-shifts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				preferredShifts: preferredShifts
			}),
		});

		if (!response.ok) {
			throw new Error('シフトの登録に失敗しました');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		return { error: "シフトの登録に失敗しました" };
	}
}

export default RegisterPreferredShifts;
