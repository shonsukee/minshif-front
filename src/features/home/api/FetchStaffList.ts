import { StaffList } from "@/features/home/calendar/types";


const FetchStaffList = async ( store_id: string ): Promise<StaffList> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/stores/${store_id}/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('再ログインしてください');
		}

		const data = await response.json();

		return data;
	} catch(error) {
		console.error(error);
		return [];
	}
}

export default FetchStaffList;
