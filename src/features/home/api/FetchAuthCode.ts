interface FetchAuthCodeProps {
    id: number;
    user_id: string;
    auth_code: number;
    created_at: string;
    updated_at: string;
}

const FetchAuthCode = async ( user_id: string ): Promise<FetchAuthCodeProps | null> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth_code?user_id=${user_id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});

		if (!response.ok) {
			throw new Error('再ログインしてください');
		}
		const data = await response.json();

		return data["message"];
	} catch(error) {
		console.error(error);
		return null;
	}
}

export default FetchAuthCode;
