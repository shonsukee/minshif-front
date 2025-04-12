import { ShiftSubmissionRequest } from '@/features/auth/types/index';
import { Result } from '.';

const FetchPreferredShiftPeriod = async ( email: string ): Promise<Result<ShiftSubmissionRequest[]>> => {
	try{
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/shift-submission-requests?email=${email}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		});

		const data = await response.json();

		if (!response.ok) {
			return { error: data.error || '不明なエラーが発生しました' };
		}

		return data;
	} catch(error) {
		return { error: '不明なエラーが発生しました' };
	}
}

export default FetchPreferredShiftPeriod;
