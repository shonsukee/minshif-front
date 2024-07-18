export const RegShiftModalContent = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

	async function registerShift(e: any) {
		e.preventDefault();
	};

	return (
		<>
			<div className="modalContent">
				シフト登録
			</div>
			<hr/>
			<form onSubmit={registerShift}>
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
							<input type="time" name="start_time" />
							〜
							<input type="time" name="end_time" />
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
					<button onClick={() => setIsOpen(false)}>閉じる</button>
					<button type="submit" className="bg-slate-900/5 px-5">スタッフに送信する</button>
				</div>
			</form>
		</>
	);
}