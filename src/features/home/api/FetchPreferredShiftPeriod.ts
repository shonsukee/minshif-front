const FetchPreferredShiftPeriod = async ( token: string ) => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/shift/fetch_shift_request', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
		});

		if (!response.ok) {
			throw new Error('シフトの登録に失敗しました');
		}

		const data = await response.json();
		return data;
	} catch(error) {
		return error;
	}
}

export default FetchPreferredShiftPeriod;
