import { Result } from '.';
import { Shift } from '../calendar/types';

const RegisterShifts = async (email: string, shifts: Shift[]): Promise<Result<string>> => {
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

		const data = await response.json();

		if (!response.ok || data.error) {
			return { error: data.error || 'シフトの登録に失敗しました' };
		}

		return { data: data.message };
	} catch (error) {
		return { error: '不明なエラーが発生しました' };
	}
}

export default RegisterShifts;
