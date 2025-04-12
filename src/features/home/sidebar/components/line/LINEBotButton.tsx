import Image from 'next/image';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/features/components/ui/dialog';
import { Label } from '@/features/components/ui/label';
import CopyButton  from '@/features/components/CopyButton';
import { AuthCode } from '@/features/home/sidebar/components/line/AuthCode';
import { useContext, useEffect, useState } from 'react';
import RegisterAuthCode  from '@/features/home/api/RegisterAuthCode';
import { UserContext } from '@/features/context/UserContext';
import FetchAuthCode from '@/features/home/api/FetchAuthCode';
import { FetchAuthCodeProps, Result } from '@/features/home/api';
import { notifyError } from '@/features/components/ui/toast';

export const LINEBotButton = ({
	open,
	onOpenChange,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
}) => {
	const userContext = useContext(UserContext);
	const user = userContext?.user;

	const [authCode, setAuthCode] = useState<number>(Number(localStorage.getItem('authCode')));

	useEffect(() => {
		if (!open) return;

		const initAuthCode = async () => {
			const response: Result<FetchAuthCodeProps> = await FetchAuthCode(user?.id || '');

			// 認証コードが保存済みの場合
			if (response && 'data' in response) {
				const { auth_code, updated_at } = response.data;
				setAuthCode(auth_code);
				localStorage.setItem('authCode', String(auth_code));
				localStorage.setItem('authCodeExpiration', String(updated_at + 30 * 60 * 1000));
				return;
			}

			// 認証コードが保存されていない場合
			const authCode = localStorage.getItem('authCode');
			const authCodeExpiration = localStorage.getItem('authCodeExpiration');
			// ローカルにも認証コードが保存されていない場合
			if (!authCode || !authCodeExpiration || Date.now() >= Date.parse(authCodeExpiration)) {
				const code = AuthCode();
				setAuthCode(code);
				localStorage.setItem('authCode', String(code));

				// 認証コードの有効期限30分
				const newExpiration = new Date(Date.now() + 30 * 60 * 1000);
				localStorage.setItem('authCodeExpiration', String(newExpiration));

				// 認証コードを保存
				const user_id = user?.id || '';
				const response = await RegisterAuthCode(code, user_id);

				if ('error' in response) {
					localStorage.removeItem('authCode');
					localStorage.removeItem('authCodeExpiration');
					notifyError(response['error']);
				}
				return;
			} else {
				// 認証コードの再利用
				setAuthCode(Number(authCode));
			}
		}

		initAuthCode();
	}, [open, user?.id]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent
			className='sm:max-w-[500px] bg-white p-6 rounded-md shadow-lg'
			onOpenAutoFocus={(e) => e.preventDefault()}
		>
			<DialogHeader className='flex justify-center'>
			<DialogTitle>シフト通知LINE Bot</DialogTitle>
			<DialogDescription>
				次の日にシフトが入っている場合に<br className='sm:hidden' />
				通知を送信します
			</DialogDescription>
			</DialogHeader>
			<div className='flex flex-col sm:flex-row justify-start items-center sm:justify-center sm:items-center text-center'>
			<div className='order-2 sm:order-1'>
				<Image
				src='https://qr-official.line.me/gs/M_841bfcng_GW.png?oat_content=qr'
				alt='LINE Bot QR Code'
				height={200}
				width={200}
				/>
				<div className='mt-2'>
				<Label htmlFor='phone' className='text-sm'>スマホの方はこちら</Label>
				<a
					href='https://lin.ee/lIZtWOv'
					className='flex h-12 justify-center'
					id='phone'
					target='_blank'
				>
					<Image
					src='https://scdn.line-apps.com/n/line_add_friends/btn/ja.png'
					alt='友だち追加'
					height={12}
					width={170}
					/>
				</a>
				</div>
			</div>
			<div className='order-1 h-full pt-3 sm:pl-3 sm:order-2 mb-4 sm:mb-0'>
				<p className='text-sm font-bold mb-2 self-start'>
				友だち追加後、認証コードを<br />LINE Botに送信してください
				</p>
				<div>
				<Label htmlFor='auth-code' className='mb-2'>認証コード</Label>
				<div className='flex items-center justify-end space-x-2'>
					<span className='font-bold text-3xl' id='auth-code'>{authCode}</span>
					<CopyButton textToCopy={String(authCode)} />
				</div>
				</div>
			</div>
			</div>
		</DialogContent>
		</Dialog>
	)
}
