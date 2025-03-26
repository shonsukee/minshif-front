const FetchUserInfo = async (email: string) => {
	let res;
	await fetch(process.env.NEXT_PUBLIC_API_URL + `/users?email=${email}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
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

export default FetchUserInfo;
