"use client"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginUser from '@/features/auth/api/LoginUser';

const RedirectPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const invitation_id = sessionStorage.getItem('invitation_id') || '';

	useEffect(() => {
		const sendSessionData = async () => {
			if (session) {
				const response = await LoginUser(
					session.accessToken || '',
					invitation_id,
					{
						id: session.user?.id as string,
						name: session.user?.name as string,
						email: session.user?.email as string,
						picture: session.user?.image as string,
					}
				);
				console.log("response: ", response.message);
				if (response.message === 'ログインに失敗しました') {
					router.push("/");
				}
				// 店舗に所属している場合
				if (response.is_affiliated) {
					router.push("/home");
				// 店舗に所属していない場合
				} else {
					router.push("/store/create");
				}
			} else {
				router.push("/");
			}
		};
		sendSessionData();
	}, [session]);

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	return (
		<div className="flex justify-center items-center h-60v">
			<h1>Redirecting...</h1>
		</div>
	);
};

export default RedirectPage;
