// 環境変数の型定義
type Env = {
	NEXT_PUBLIC_GCP_CLIENT_ID: string;
}

declare const process: {
	env: Env;
};

// パラメータの型定義
type AuthParams = {
	response_type: string;
	client_id: string;
	redirect_uri: string;
	approval_prompt: string;
	scope: string;
	access_type: string;
}

const RequestToken = (): void => {
	const params: AuthParams = {
		response_type: 'code',
		client_id: process.env.NEXT_PUBLIC_GCP_CLIENT_ID,
		redirect_uri: 'http://localhost:3000/redirect',
		approval_prompt: 'force',
		scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar",
		access_type: 'offline',
	};

	let url: string = 'https://accounts.google.com/o/oauth2/v2/auth';

	// ユーザに確認を求めるURLを生成してリダイレクト
	Object.keys(params).forEach((key, i) => {
		url += `${i === 0 ? '?' : '&'}${key}=${encodeURIComponent(params[key as keyof AuthParams])}`;
	});
	window.location.href = url;
};

export default RequestToken;
