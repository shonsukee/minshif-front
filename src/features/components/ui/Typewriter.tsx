"use client";
import { useState, useEffect } from "react";
import { TypewriterProps } from "../index";

const Typewriter: React.FC<TypewriterProps> = ({
	texts,
	typingSpeed = 100,
	deletingSpeed = 50,
	delayBetweenTexts = 2000,
}) => {
	const [currentTextIndex, setCurrentTextIndex] = useState(0);	// 現在表示しているテキストのインデックス
	const [currentCharIndex, setCurrentCharIndex] = useState(0);	// 現在表示している文字のインデックス
	const [isDeleting, setIsDeleting] = useState(false);			// 削除のフラグ
	const [displayedText, setDisplayedText] = useState("");			// 表示するテキスト

	useEffect(() => {
		const currentText = texts[currentTextIndex];

		const handleTyping = () => {
			if (isDeleting) {
				// テキストが残っている場合
				if (currentCharIndex > 0) {
					setDisplayedText(currentText.slice(0, currentCharIndex - 1));
					setCurrentCharIndex((prev) => prev - 1);

				// 削除が終わった場合
				} else {
					setIsDeleting(false);
					setCurrentTextIndex((prev) => (prev + 1) % texts.length);
				}
			} else {
				// 未入力の文字がある場合
				if (currentCharIndex < currentText.length) {
					setDisplayedText(currentText.slice(0, currentCharIndex + 1));
					setCurrentCharIndex((prev) => prev + 1);

				// 入力が終わった場合
				} else {
					setTimeout(() => setIsDeleting(true), delayBetweenTexts);
				}
			}
		};

		// タイピングの速度を設定
		const timeout = setTimeout(
			handleTyping,
			isDeleting ? deletingSpeed : typingSpeed
		);

		return () => clearTimeout(timeout);
	}, [currentCharIndex, isDeleting, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

	return (
		<span className="overflow-hidden inline-flex items-center whitespace-nowrap mb-1">
			{displayedText}
			<span className="animate-[blink_0.7s_step-start_infinite]">|</span>
		</span>
	);
};

export default Typewriter;
