const AuthenticateUser = async (code: string) => {
	let res;
	await fetch(process.env.REACT_APP_API_URL + '/user/create', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(code),
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

export default AuthenticateUser;
