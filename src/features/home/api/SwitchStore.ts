import { Result } from ".";
import { Store } from "../sidebar/types";

const SwitchStore = async (user_id: string | undefined, store_id: string | undefined ): Promise<Result<Store[]>> => {
	if (!user_id || !store_id) throw new Error('再ログインしてください');

	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/stores/switch', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: user_id,
				store_id: store_id
			})
		});

		const data = await response.json();

		if (!response.ok && data.error) {
			return { error: data.error };
		}

		return data;
	} catch(error) {
		return { error: '不明なエラーが発生しました' };
	}
}

export default SwitchStore;
