import { Result } from '.';
import { Shift } from '../calendar/types';

const FetchShiftList = async ( id: string | undefined, start_date: string, end_date: string): Promise<Result<Shift[][]>> => {
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

		const data = await response.json();

		if (!response.ok && data.error) {
			return { error: data.error };
		}

		return { data: data };
	} catch(error) {
		return { error: '不明なエラーが発生しました' };
	}
}

export default FetchShiftList;
