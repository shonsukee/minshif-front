import { Result } from "@/features/home/api";
import { MembershipContextType } from "../types";

const FetchMembership = async (email: string): Promise<Result<MembershipContextType>> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/memberships?email=${encodeURIComponent(email)}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
			},
		});

		const data = await response.json();

		if (!response.ok && data.error) {
			return { error: data.error };
		}

		return { data: data };
	} catch(error) {
		return { error: '不明なエラーが発生しました' };
	}
};

export default FetchMembership;
