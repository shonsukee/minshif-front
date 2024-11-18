import { Shift } from '../calendar/types';

const FetchShiftList = async ( email: string | null, start_date: string, end_date: string): Promise<Shift[][]> => {
	try{
		const query = new URLSearchParams({
			'fetch_shift[email]': email || '',
			'fetch_shift[start_date]': start_date,
			'fetch_shift[end_date]': end_date
		}).toString();

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/shift/fetch_shifts?${query}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});

		if (!response.ok) {
			throw new Error('再ログインしてください');
		}

		const data = await response.json();

		return data['staff_shift_list'];
	} catch(error) {
		console.error(error);
		return [];
	}
}

export default FetchShiftList;
