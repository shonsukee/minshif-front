import Image from 'next/image';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/features/components/ui/dialog";
import { Label } from '@/features/components/ui/label';
import CopyButton  from '@/features/components/CopyButton';
import { AuthCode } from '@/features/home/sidebar/components/line/AuthCode';
import { useContext, useState } from 'react';
import RegisterAuthCode  from '@/features/home/api/RegisterAuthCode';
import { UserContext } from '@/features/context/UserContext';
import FetchAuthCode from '@/features/home/api/FetchAuthCode';

export const LINEBotButton = () => {
	const user = useContext(UserContext);
	const [authCode, setAuthCode]= useState<number>(Number(localStorage.getItem('authCode')));

	const handleSetAuthCode = async () => {
		const authCode = localStorage.getItem('authCode');
		const authCodeExpiration = localStorage.getItem('authCodeExpiration');
		const response = await FetchAuthCode(user?.user?.id || '');

		// 認証コードが保存されている場合
		if (response !== null) {
			setAuthCode(response["auth_code"]);
			localStorage.setItem('authCode', String(response["auth_code"]));
			localStorage.setItem('authCodeExpiration', String(response["updated_at"] + 30 * 60 * 1000));
			return;

		// 認証コードが無効もしくは期限切れの場合
		} else if (!authCode || !authCodeExpiration || Date.now() >= Date.parse(authCodeExpiration)) {
			const code = AuthCode();
			setAuthCode(code);
			localStorage.setItem('authCode', String(code));
			// 認証コードの有効期限30分
			const newExpiration = new Date(Date.now() + 30 * 60 * 1000);
			localStorage.setItem('authCodeExpiration', String(newExpiration));

			// 認証コードを保存
			const user_id = user?.user?.id || '';
			const data = await RegisterAuthCode(code, user_id);

			// 保存失敗時
			if (data.error) {
				localStorage.removeItem('authCode');
				localStorage.removeItem('authCodeExpiration');
				alert(data.error);
			}
			return;
		}

		// 認証コードの再利用
		setAuthCode(Number(authCode));
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<button onClick={handleSetAuthCode}>
						<Image
							src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
							alt="友だち追加"
							className="inline-flex items-center justify-center rounded-md text-sm font-mediumring-offset-background transition-colors
							focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
							disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
							height={40}
							width={120}
						/>
					</button>
				</DialogTrigger>

				<DialogContent
					className="sm:max-w-[500px] bg-white p-6 rounded-md shadow-lg"
					onOpenAutoFocus={(e) => e.preventDefault()}
				>
					<DialogHeader className='flex justify-center'>
						<DialogTitle>シフト通知LINE Bot</DialogTitle>
						<DialogDescription>
							次の日にシフトが入っている場合に<br className='sm:hidden'></br>通知を送信します
						</DialogDescription>
					</DialogHeader>
					<div className='flex flex-col sm:flex-row justify-start items-center sm:justify-center sm:items-center text-center'>
						<div className='order-2 sm:order-1'>
							<Image
								src="https://qr-official.line.me/gs/M_841bfcng_GW.png?oat_content=qr"
								alt="LINE Bot QR Code"
								height={200}
								width={200}
							/>
							<div className='mt-2'>
								<Label htmlFor='phone' className='text-sm'>スマホの方はこちら</Label>
								<a href="https://lin.ee/lIZtWOv" className='flex h-12 justify-center' id="phone" target="_blank">
									<img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="12"/>
								</a>
							</div>
						</div>
						<div className="order-1 h-full pt-3 sm:pl-3 sm:order-2 mb-4 sm:mb-0">
							<p className='text-sm font-bold mb-2 self-start'>友だち追加後、認証コードを<br/>LINE Botに送信してください</p>
							<div>
								<Label htmlFor="auth-code" className="mb-2">認証コード</Label>
								<div className="flex items-center justify-end space-x-2">
									<span className="font-bold text-3xl" id="auth-code">{authCode}</span>
									<CopyButton textToCopy={String(authCode)} />
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
