import Image from 'next/image'
import Button from '@/app/components/elements/_arrow_button'
import '@/app/globals.css';
import { auth } from "@/auth"

export default async function StaticPage() {
	const session = await auth()

	return (
		<>
			<div>
				<div className="h-60v grid grid-cols-12 m-static">
					<div className="col-span-12 justify-self-center self-center xl:col-span-5">
						<h1 className="text-4xl font-bold mb-2 whitespace-nowrap">シフトの変更もラクラク管理。</h1>
						<h2 className="text-xl mb-4">minshifは、予定を一元管理する<br />スケジュールプラットフォームです。</h2>
						<div className="">
							<Button name={'ログイン'} href={'/login'}/>
						</div>
					</div>
					<div className="col-span-7 self-center basis-8/12 hidden xl:inline-block" style={{width: '100%', height: '100%', position: 'relative'}}>
						<Image
							alt='time_shift'
							src='/time_shift.png'
							className="object-cover"
							sizes='(max-width: 768px) 100vw, 50vw'
							fill
						/>
					</div>
					<div className="flex flex-col col-span-12 mt-5 bg-gray-100 rounded-md">
						<pre className="py-6 px-4 whitespace-pre-wrap break-all">
							{JSON.stringify(session, null, 2)}
						</pre>
					</div>
				</div>
			</div>
		</>
	)
}