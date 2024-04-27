const CreateStore = async ({ storeName }: { storeName: string, location: string }) => {
	let res: any;
	await fetch(process.env.NEXT_PUBLIC_API_URL + '/store/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			store_name: storeName,
			location: location,
		}),
	})
	.then((response) => response.json())
	.then((data) => {
		res = data;
	})
	.catch((error) => {
		res = error;
	});
	return res;
};

export default CreateStore;
