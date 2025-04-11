import { Result } from '.';
import { Shift } from '../calendar/types';

const RegisterPreferredShifts = async ( preferredShifts: Shift[], email: string | undefined ): Promise<Result<string>> => {
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

		const data = await response.json();

		if (!response.ok) {
			return { error: data.error };
		}

		return { data: data.message };
	} catch (error) {
		return { error: "シフトの登録に失敗しました" };
	}
}

export default RegisterPreferredShifts;
