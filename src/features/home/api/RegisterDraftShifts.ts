import { Shift } from '../calendar/types';

const RegisterDraftShifts = async (draftShifts: Shift[]) => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/shift/register_draft_shifts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'draft_shifts': draftShifts
			})
		});
		if (!response.ok) {
			throw new Error('再ログインしてください');
		}
		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Failed to register draft shifts", error);
		return {'error': error};
	}
}

export default RegisterDraftShifts;
