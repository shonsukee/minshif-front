import { Shift } from '../calendar/types';

const FetchShiftList = async ( id: string | undefined, start_date: string, end_date: string): Promise<Shift[][]> => {
	try{
		const query = new URLSearchParams({
			'fetch_shift[start_date]': start_date,
			'fetch_shift[end_date]': end_date
		}).toString();

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${id}/store-shifts?${query}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
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

export default FetchShiftList;
