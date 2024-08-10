import { Shift } from '../calendar/types';

const RegisterPreferredShifts = async ( preferredShifts: Shift[], token: string ) => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/shift/preferred_shifts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify({
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
