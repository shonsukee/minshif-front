import { Result } from '@/features/home/api';

const InviteUser = async (email: string, managerId: string | undefined): Promise<Result<string>> => {
	try {
		if (!managerId) {
			throw new Error('管理者IDが指定されていません');
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				invitee_email: email,
				manager_id: managerId,
			}),
		});

		const data = await response.json();

		if (!response.ok || data.error) {
			return { error: data.error };
		}

		return { data: data.message };
	} catch (error) {
		return { error: '不明なエラーが発生しました' };
	}
};

export default InviteUser;
