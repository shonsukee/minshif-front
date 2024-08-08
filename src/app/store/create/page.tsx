"use client"
import { useState } from 'react'
import TextBox from '@/features/store/components/TextBox'
import SubmitButton from '@/features/store/components/SubmitButton'
import Link from 'next/link'
import CreateStore from '@/features/store/api/CreateStore'
import { StoreCreateProps } from '@/features/store/types'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function StoreCreate() {
	const { data: session } = useSession();
	const [storeName, setStoreName] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const response: StoreCreateProps = await CreateStore({
			storeName: storeName,
			location: "日本",
			email: session?.user?.email as string,
		});

		if (response['response']) {
			router.push('/home');
		} else {
			alert(response['error']);
		}
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
