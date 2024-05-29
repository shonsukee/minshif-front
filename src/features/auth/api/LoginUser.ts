const LoginUser = async (code: string, invitation_id: string | null) => {
	let res;

	await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/create', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
		code: code,
		invitation_id: invitation_id,
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

export default LoginUser;
