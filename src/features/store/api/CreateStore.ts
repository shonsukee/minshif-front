const CreateStore = async ({ storeName, location, token }: { storeName: string, location: string, token?: string }) => {
	let response: any;
	await fetch(process.env.NEXT_PUBLIC_API_URL + '/store/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			store_name: storeName,
			location: location,
		}),
	})
	.then((response) => response.json())
	.then((data) => {
		response = data;
	})
	.catch((error) => {
		response = error;
	});
	return response;
};

export default CreateStore;
