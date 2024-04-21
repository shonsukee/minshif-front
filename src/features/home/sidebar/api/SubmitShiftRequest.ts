const SubmitShiftRequest = async (req: object) => {
	let res;
	await fetch(process.env.NEXT_PUBLIC_API_URL + '/shift/submitShiftRequest', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req)
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
