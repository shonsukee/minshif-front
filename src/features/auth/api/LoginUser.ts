import { User } from '@/features/auth/types';
import { Result } from '@/features/home/api';

const LoginUser = async (code: string, invitation_id: string | null, user: User): Promise<Result<{message: string, is_affiliated: boolean}>> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				code: code,
				invitation_id: invitation_id,
				user: user,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error('不明なエラーが発生しました');
		}

		return { data: data };
	} catch(error) {
		return { error: '不明なエラーが発生しました' };
	}
};

export default LoginUser;
