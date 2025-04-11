import { notifyError, notifySuccess } from '@/features/components/ui/toast';
import React, { useState } from 'react';

interface InviteModalProps {
	closeModal: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ closeModal }) => {
	const [email, setEmail] = useState('');

	const handleSubmit = async () => {
		try {
			const response = await fetch('/api/invitation', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			if (response.ok) {
				notifySuccess('招待を送信しました');
			} else {
				notifyError('招待の送信に失敗しました');
			}
		} catch (error) {
			notifyError('エラーが発生しました');
		} finally {
			closeModal();
		}
	};

	return (
		<div>
			<div>
				<label>
					メールアドレス:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
			</div>
			<button onClick={handleSubmit}>送信</button>
			<button onClick={closeModal}>キャンセル</button>
		</div>
	);
};

export default InviteModal;
