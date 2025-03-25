import Image from 'next/image';
import '@/app/globals.css';
import { auth } from "@/auth";
import Link from 'next/link';
import Typewriter from '@/features/components/ui/Typewriter';

export default async function StaticPage() {
	const session = await auth();

	return (
		<>
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-20">
					{/* テキストセクション */}
					<div className="xl:col-span-2 xl:col-start-2 flex flex-col justify-center items-center xl:items-start text-center xl:text-left">
						<Typewriter
							texts={["簡単操作でシフトを管理", "スタッフに合わせた柔軟設定", "通知機能で忘れ防止"]}
							typingSpeed={200}
							deletingSpeed={50}
							delayBetweenTexts={3000}
						/>
						<h1 className="pl-6 xl:pl-0 text-xl font-bold mb-2 whitespace-nowrap">シフト管理をスマートに。</h1>
						<h1 className="text-5xl font-bold mb-2 whitespace-nowrap">minshif</h1>

						{session?.user ? (
							<Link href="/home">
							<button className="mt-4 px-5 py-2 bg-cyan-400 hover:bg-cyan-200 text-white rounded-md shadow-md transition-colors duration-500">
								ホームへ戻る
							</button>
							</Link>
						) : (
							<Link href="/signin">
							<button className="font-medium mt-4 px-5 py-2 bg-black hover:bg-slate-400 text-white rounded-md shadow-md transition-colors duration-500">
								Sign In
							</button>
							</Link>
						)}
					</div>

					{/* 画像セクション */}
					<div className="xl:col-span-7 xl:col-start-6">
						<div className="relative w-full h-full">
							<Image
								alt='pc'
								src='/img/pc.svg'
								className="object-contain"
								width={1000}
								height={300}
								priority
							/>
						</div>
					</div>
				</div>

				<hr/>

				{/* 機能紹介セクション */}
				<div className="mt-16 bg-sky-50 p-10 rounded-2xl">
					<h2 className="text-4xl font-bold text-center mb-8">機能紹介</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
						{/* シフト提出依頼 */}
						<div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
							<div className="w-24 h-24 mb-4">
								<Image
								alt='シフト提出依頼'
								src='/img/shift_collection.svg'
								className="object-contain"
								width={96}
								height={96}
								/>
							</div>
							<h4 className="text-2xl font-semibold mb-2">1. シフト提出依頼</h4>
							<p className="text-gray-600">シフトの提出期間と締切、備考を指定してスタッフに提出を依頼できます。</p>
						</div>
						{/* シフト提出 */}
						<div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
							<div className="w-24 h-24 mb-4">
								<Image
								alt='シフト提出'
								src='/img/shift_submission.svg'
								className="object-contain"
								width={96}
								height={96}
								/>
							</div>
							<h3 className="text-2xl font-semibold mb-2">2. シフト提出</h3>
							<p className="text-gray-600">日付と時間、備考を指定することができます。登録履歴から1タップで登録できます。</p>
						</div>
						{/* シフト登録 */}
						<div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
							<div className="w-24 h-24 mb-4">
								<Image
								alt='シフト登録'
								src='/img/shift_registration.svg'
								className="object-contain"
								width={96}
								height={96}
								/>
							</div>
							<h3 className="text-2xl font-semibold mb-2">3. シフト登録</h3>
							<p className="text-gray-600">スタッフから募集したシフトを基にシフトの本登録をすることができます。スタッフが提出した希望シフトからそのまま登録することもできます。</p>
						</div>
						{/* シフト通知 */}
						<div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
							<div className="w-24 h-24 mb-4">
								<Image
								alt='シフト通知'
								src='/img/shift_notification.svg'
								className="object-contain"
								width={96}
								height={96}
								/>
							</div>
							<h3 className="text-2xl font-semibold mb-2">4. シフト通知</h3>
							<p className="text-gray-600">LINE Botを友だち登録することで、明日シフトに入っている場合は前日18時にLINEで通知を行います。</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
