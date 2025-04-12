import { Result } from ".";
import { Store } from "../sidebar/types";

const FetchStores = async ( id: string | undefined): Promise<Result<Store[]>> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/stores?id=${id}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
			}
		});

		const data = await response.json();

		if (!response.ok) {
			return { error: data.error || '不明なエラーが発生しました' };
		}

		return { data: data };
	} catch(error) {
		return { error: '不明なエラーが発生しました' };
	}
}

export default FetchStores;
