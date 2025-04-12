import { Result, FetchAuthCodeProps } from ".";

const FetchAuthCode = async ( user_id: string ): Promise<Result<FetchAuthCodeProps>> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/bots/code?user_id=${user_id}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
			}
		});

		const data = await response.json();

		if (!response.ok) {
			return { error: '不明なエラーが発生しました' };
		}

		return data;
	} catch (error) {
		return { error: '不明なエラーが発生しました' };
	}
}

export default FetchAuthCode;
