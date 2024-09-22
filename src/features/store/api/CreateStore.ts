const CreateStore = async ({ storeName, location, email }: { storeName: string, location: string, email?: string }) => {
	let response: any;
	await fetch(process.env.NEXT_PUBLIC_API_URL + '/store/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
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
