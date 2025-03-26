const CreateStore = async ({ name, location, id }: { name: string, location: string, id: string }) => {
	let response: any;
	await fetch(process.env.NEXT_PUBLIC_API_URL + '/stores', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			created_by_user_id: id,
			store_name: name,
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
