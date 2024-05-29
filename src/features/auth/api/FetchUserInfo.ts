const FetchUserInfo = async ({ token }: { token?: string }) => {
	let res;
	await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get_user_info', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
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
