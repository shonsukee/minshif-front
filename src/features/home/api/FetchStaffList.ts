const FetchStaffList = async ( token: string ): Promise<{id: number, privilege: string, user_name: string}[]> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/store/staff_list', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
		});

		if (!response.ok) {
			throw new Error('再ログインしてください');
		}

		const data = await response.json();

		return data['staff_list'];
	} catch(error) {
		console.error(error);
		return [];
	}
}

export default FetchStaffList;
