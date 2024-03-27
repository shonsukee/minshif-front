import { useState, useEffect } from "react";
import AuthenticateUser from "../../api/v1/home/AuthenticateUser";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// JWTトークンを取得する
export default function Redirect() {
	const [isAuth, setIsAuth] = useState(true);
	const navigate = useNavigate();
	const [cookies, setCookie, removeCookie] = useCookies(['token']);

	// Googleの認証コードを取得
	const extractCode = () => {
		const url = window.location.href;
		const queryString = url.split("?")[1];
		if (!queryString) {
			return null;
		}
		const params = queryString.split("&");
		if (!params) {
			return null;
		}
		const code = params.find(param => param.startsWith("code=")).split("=")[1];

		return code;
	};

	useEffect(() => {
		(async function() {
			if (cookies.token) {
				navigate('/home');
				return;
			}

			if (isAuth) {
				setIsAuth(false);

				const code = extractCode();
				if (!code) {
					navigate('/login');
					return;
				}
				// ユーザ・トークン情報を取得
				const response = await AuthenticateUser({
					code: code
				});
				if (response['token']) {
					setCookie('token', response['token'], { path: '/' });
					navigate('/home');
				} else {
					removeCookie('token');
					navigate('/login');
				}
			} else {
				navigate('/login');
			}
		})();
	}, [cookies.token, isAuth, navigate, removeCookie, setCookie]);

	return (
		<div className="flex justify-center items-center h-screen">
			<p>Redirecting...</p>
		</div>
	);
}