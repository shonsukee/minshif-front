const RegisterAuthCode = async (authCode: number, user_id: string) => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth_code', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'user_id': user_id,
				'auth_code': authCode
			})
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || '再ログインしてください');
		}
		const data = await response.json();

		return { data: data["message"], error: null };
	} catch (error) {
		console.error("Failed to register shifts", error);
		return {'error': error};
	}
}

export default RegisterAuthCode;
