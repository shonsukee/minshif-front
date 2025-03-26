import { MembershipContextType } from "../types";

const FetchMembership = async (email: string): Promise<MembershipContextType> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/memberships?email=${encodeURIComponent(email)}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('ログインに失敗しました');
		}

		const data = await response.json();
		return data;
	} catch(error) {
		console.error(error);
		return { membership: null };
	}
};

export default FetchMembership;
