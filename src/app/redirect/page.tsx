"use client"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginUser from '@/features/auth/api/LoginUser';
import { Spinner } from '@/features/components/ui/spinner';

const RedirectPage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const invitation_id = sessionStorage.getItem('invitation_id') || '';

	useEffect(() => {
		const sendSessionData = async () => {
			if (session?.user) {
				const response = await LoginUser(
					session.accessToken || '',
					invitation_id,
					{
						id: session.user?.id as string,
						user_name: session.user?.name as string,
						email: session.user?.email as string,
						picture: session.user?.image as string,
					}
				);

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
	}, [session, invitation_id, router]);

	return (
		<div className="flex justify-center items-center h-60v">
			<Spinner size="large">Loading...</Spinner>
		</div>
	);
};

export default RedirectPage;
