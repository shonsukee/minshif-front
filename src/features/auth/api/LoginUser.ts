import { User } from '@/features/auth/types';

const LoginUser = async (code: string, invitation_id: string | null, user: User): Promise<{message: string, is_affiliated: boolean}> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/create', {
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

		if (!response.ok) {
			throw new Error('ログインに失敗しました');
		}

		const data = await response.json();
		return data;
	} catch(error) {
		console.error(error);
		return { message: 'ログインに失敗しました', is_affiliated: false };
	}
};

export default LoginUser;
