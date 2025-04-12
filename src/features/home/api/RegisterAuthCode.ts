import { Result } from '.';

const RegisterAuthCode = async (authCode: number, user_id: string): Promise<Result<string>> => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/bots/code', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'user_id': user_id,
				'auth_code': authCode
			})
		});

		const data = await response.json();

		if (!response.ok) {
			return { error: data.error || '不明なエラーが発生しました' };
		}

		return { data: data.message };
	} catch (error) {
		return { error: '不明なエラーが発生しました' };
	}
}

export default RegisterAuthCode;
