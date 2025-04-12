import { Result } from '@/features/home/api';

const CreateStore = async ({ name, location, id }: { name: string, location: string, id: string }): Promise<Result<string>> => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/stores', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				created_by_user_id: id,
				store_name: name,
				location: location,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			return { error: data.error || '不明なエラーが発生しました' };
		}

		return data;
	} catch (error) {
		return { error: '不明なエラーが発生しました' };
	}
};

export default CreateStore;
