const SwitchStore = async (user_id: string | undefined, store_id: string | undefined ) => {
	if (!user_id) throw new Error('user_id is required');
	if (!store_id) throw new Error('store_id is required');
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

		if (!response.ok) {
			throw new Error('再ログインしてください');
		}

		const data = await response.json();
		return data;
	} catch(error) {
		console.error(error);
		return error;
	}
}

export default SwitchStore;
