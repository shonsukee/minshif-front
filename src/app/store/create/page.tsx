"use client"
import { useContext, useState } from 'react'
import TextBox from '@/features/store/components/TextBox'
import SubmitButton from '@/features/store/components/SubmitButton'
import Link from 'next/link'
import CreateStore from '@/features/store/api/CreateStore'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/features/context/UserContext'
import { notifyError, notifySuccess } from '@/features/components/ui/toast'
import { Result } from '@/features/home/api'

export default function StoreCreate() {
	const userContext = useContext(UserContext);
	const user = userContext?.user;
	const [storeName, setStoreName] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!user) {
			return;
		}

		const response: Result<string> = await CreateStore({
			id: user?.id as string,
			name: storeName,
			location: "日本",
		});

		if ('error' in response) {
			notifyError(response['error']);
			return;
		}

		notifySuccess(response['data']);
		router.push('/home');
	}

	return (
		<>
			<div className="text-center w-fit mx-auto">
				<div>
					<h1 className="text-4xl font-bold m-10">グループを新規作成</h1>
					<TextBox name={'店舗名を入力'} setStoreName={setStoreName} />
					<div className="flex justify-end my-10">
						<SubmitButton name={'作成'} onClick={handleSubmit} />
					</div>
				</div>
				<div>
					<Link href={"/store/join"}>
						<span className="text-blue-800">グループに参加</span>
					</Link>
				</div>
			</div>
		</>
	);
};
