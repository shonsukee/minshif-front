const SubmitShiftRequest = async (shiftRequest: object, token: string) => {
	let res;
	await fetch(process.env.NEXT_PUBLIC_API_URL + '/shift/submitShiftRequest', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify(shiftRequest)
	})
	.then((response) => response.json())
	.then((data) => {
		res = data;
	})
	.catch((error) => {
		res = error;
	});

	return res;
}

export default SubmitShiftRequest;
