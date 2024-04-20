const FetchUserInfo = async () => {
	let res;
	await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get_user_info', {
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  credentials: 'include',
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
