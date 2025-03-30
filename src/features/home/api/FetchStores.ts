const FetchStores = async ( id: string | undefined) => {
	if (!id) return [];

	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/stores?id=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});

		if (!response.ok) {
			throw new Error('再ログインしてください');
		}

		const data = await response.json();

		return data;
	} catch(error) {
		console.error(error);
		return [];
	}
}

export default FetchStores;
