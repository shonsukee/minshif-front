const FetchShiftList = async ( token: string, start_date: string, end_date: string):
Promise<{
	id: number,
	user_name: string,
	date: string,
	start_time: string,
	end_time: string,
	notes: string,
	is_registered: boolean
}[][]> => {
	try{
		const query = new URLSearchParams({
			'fetch_shift[start_date]': start_date,
			'fetch_shift[end_date]': end_date
		}).toString();

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/shift/fetch_shifts?${query}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		});

		if (!response.ok) {
			throw new Error('再ログインしてください');
		}

		const data = await response.json();

		return data['staff_shift_list'];
	} catch(error) {
		console.error(error);
		return [];
	}
}

export default FetchShiftList;
