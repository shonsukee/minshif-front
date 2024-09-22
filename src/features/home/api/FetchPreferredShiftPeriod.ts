const FetchPreferredShiftPeriod = async ( email: string ) => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/shift/fetch_shift_request?email=${email}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
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
