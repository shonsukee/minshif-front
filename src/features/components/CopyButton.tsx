
import { useState } from 'react';

const CopyButton = ({ textToCopy }: { textToCopy: string}) => {
	const [showMessage, setShowMessage] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(textToCopy).then(() => {
			setShowMessage(true);

			// 2秒後にメッセージを非表示にする
			setTimeout(() => {
				setShowMessage(false);
			}, 2000);
		}).catch((err) => {
			console.error('コピーに失敗しました:', err);
		});
	};

	return (
		<div className="relative inline-block">
			<button
				onClick={handleCopy}
				className="text-white px-4 py-2 rounded"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-gray-500 hover:text-gray-700"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M8 7h10M8 11h6m-6 4h10M5 7h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
					/>
				</svg>
			</button>
			{showMessage && (
				<div
					className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-100 transition-opacity duration-300 min-w-4 w-max"
				>
					コピーしました！
				</div>
			)}
		</div>
	);
};

export default CopyButton;
