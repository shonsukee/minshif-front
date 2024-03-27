// 有効なリフレッシュトークンが存在しない場合に実行
const RequestToken = () => {
	let params = {
		response_type: 'code',
		client_id: process.env.REACT_APP_GCP_CLIENT_ID,
		redirect_uri: 'http://localhost:3000/redirect',
		approval_prompt: 'force',
		scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar",
		access_type: 'offline'
	};

	let url = 'https://accounts.google.com/o/oauth2/v2/auth';

	// ユーザに確認を求めるURLを生成してリダイレクト
	Object.keys(params).forEach((key, i) => {
		url += `${i === 0 ? '?' : '&'}${key}=${params[key]}`;
	});
	window.location.href = url;
};

export default RequestToken;
