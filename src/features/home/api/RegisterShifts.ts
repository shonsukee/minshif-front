import { Shift } from '../calendar/types';

const RegisterShifts = async (email: string, shifts: Shift[]) => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/shifts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'email': email,
				'shifts': shifts
			})
		});
		if (!response.ok) {
			throw new Error('再ログインしてください');
		}
		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Failed to register shifts", error);
		return {'error': error};
	}
}

export default RegisterShifts;
