"use client";
import React, { useEffect } from 'react';
import GoogleButton from '@/features/auth/components/GoogleButton';

export default function LoginPage() {
	// 招待IDを保存
	useEffect(() => {
		const url: string = window.location.href;
		const queryString: string = url.split("?")[1];
		if (queryString) {
			const params = new URLSearchParams(queryString);
			sessionStorage.setItem('invitation_id', params.get("invitation_id") || '');
		}
	}, []);

	return (
		<>
			<GoogleButton />
		</>
	);
};
