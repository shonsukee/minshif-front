"use client"
import React, { useState } from "react";
import "../style/style.css";
import { TextBoxProps } from "../types";

export default function TextBox({ name, setStoreName }: TextBoxProps) {
	const [isFocused, setIsFocused] = useState(false);
	const borderColor = isFocused ? '#0b57d0' : '#1f1f1f';

	return (
		<div className="text_box" style={{
			borderTopColor: borderColor,
			borderLeftColor: borderColor,
			borderRightColor: borderColor,
			borderBottomColor: borderColor,
			transition: 'border-color 200ms ease-in-out'
		}}>
			<div className="text_inner">
				<input
					id="new_group"
					type="text"
					onChange={(e) => setStoreName(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				<div className="text_string">{name}</div>
			</div>
		</div>
	);
};