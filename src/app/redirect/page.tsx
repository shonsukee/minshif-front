"use client"
import { useState, useEffect } from "react";
import LoginUser from "@/features/auth/api/LoginUser";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function RedirectPage() {
	const [cookies, setCookie, removeCookie] = useCookies(["user_id", "token"]);
	const router = useRouter();

	// Googleの認証コードを取得
	const extractCode = () => {
		const url: string = window.location.href;
		const queryString: string = url.split("?")[1];
		if (!queryString) {
			return null;
		}
		const params = new URLSearchParams(queryString);
		const code: string | null = params.get("code");

		return code;
	};

	useEffect(() => {
		(async function() {
			if (cookies.token && cookies.user_id) {
				// TODO: バックエンドでトークンの有効性を確認する(tokenはuser_idに紐付いてる)
				router.push('/home');
				return;
			}

			const code: string | null = extractCode();
			if (!code) {
				router.push('/login');
				return;
			}

			// 招待IDを取得
			const invitation_id: string | null = sessionStorage.getItem('invitation_id');

			// ユーザ・トークン情報を取得
			const response: string[] | undefined = await LoginUser(code, invitation_id);

			if (!response || response['error']) {
				removeCookie('user_id');
				removeCookie('token');
				router.push('/login');
			} else if(response['is_new_user']) {
				// 新規ユーザの場合は店舗作成画面へ遷移
				setCookie('user_id', response['user_id']);
				setCookie('token', response['token']);

				router.push('/store/create');
			} else {
				// 招待された新規ユーザ若しくは既存ユーザの場合はホーム画面へ遷移
				setCookie('user_id', response['user_id']);
				setCookie('token', response['token']);

				router.push('/home');
			}
		})();
	}, []);

	return (
		<div className="flex justify-center items-center h-60v">
			<h1>Redirecting...</h1>
		</div>
	);
}
