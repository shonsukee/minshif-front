import SubmitShiftRequest from "../api/SubmitShiftRequest";
import { setSubmitShiftModalProps } from "../types";
import { useCookies } from 'react-cookie';

export const SubmitShiftModalContent = ({ setSubmitShiftModal }: setSubmitShiftModalProps) => {
	const [cookies] = useCookies(['token']);

	async function submitShiftInfo (e: any) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		const shiftRequest = {
			// TODO: ユーザが所属するstore_idを指定
			store_id: "be4a56d6-aab6-424c-8f1f-4ca68aadd7eb",
			start_date: data.start_date,
			end_date: data.end_date,
			deadline_date: data.deadline_date,
			deadline_time: data.deadline_time,
			notes: data.notes
		};
		const token = cookies.token;
		const response: string[] | undefined = await SubmitShiftRequest(shiftRequest, token);
		if (!response || response['error']) {
			alert("シフト提出依頼に失敗しました。");
		} else {
			alert(response['msg']);
		}
	};

	return (
		<>
			<div className="modalContent">
				シフト提出依頼
			</div>
			<hr/>
			<form onSubmit={submitShiftInfo}>
				<div>
					<div className="modalTarget">
						<div className="font-bold">
							対象スタッフ
						</div>
						<div>
							全てのスタッフ
						</div>
					</div>
					<div className="modalTarget">
						<div className="font-bold">
							対象期間
						</div>
						<div>
							<input type="date" name="start_date" />
							〜
							<input type="date" name="end_date" />
						</div>
					</div>
					<div className="modalTarget">
						<div className="font-bold">
							提出期限
						</div>
						<div>
							<input type="date" name="deadline_date" />
							<input type="time" name="deadline_time" />
						</div>
					</div>
					<div className="modalTarget">
						<div className="font-bold">
							備考
						</div>
						<div>
							<input type="text" name="notes" />
						</div>
					</div>
				</div>
				<hr/>
				<div>
					<button onClick={() => setSubmitShiftModal(false)}>閉じる</button>
					<button type="submit" className="bg-slate-900/5 px-5">スタッフに送信する</button>
				</div>
			</form>
		</>
	);
}