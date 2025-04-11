import { StaffList } from "@/features/home/calendar/types";
import { Result } from ".";

const FetchStaffList = async ( store_id: string ): Promise<Result<StaffList>> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/stores/${store_id}/users`, {
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
}

export default FetchStaffList;
