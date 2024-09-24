import Image from 'next/image';
import '@/app/globals.css';
import { auth } from "@/auth";
import getConfig from "next/config";
const { basePath } = getConfig().publicRuntimeConfig;

export default async function StaticPage() {
	const session = await auth();

	return (
		<>
			<div>
				<div className="grid grid-cols-12">
					<div className="col-span-12 md:self-center xl:justify-self-start justify-self-center xl:col-span-5 self-start">
						<h1 className="text-xl font-bold mb-2 whitespace-nowrap">シフト管理をスマートに。</h1>
						<h1 className="text-5xl font-bold mb-2 whitespace-nowrap">minshif</h1>
					</div>
					<div className="col-span-12 xl:col-span-7 xl:block">
						<div className="relative w-full h-full" style={{ width: '100%' }}>
							<Image
								alt='time_shift'
								src={`${basePath}/time_shift.png`}
								className="object-contain"
								width={1000}
								height={300}
							/>
						</div>
					</div>
					<div className="flex flex-col col-span-12 mt-5 bg-gray-100 rounded-md">
						<pre className="py-6 px-4 whitespace-pre-wrap break-all">
							{JSON.stringify(session, null, 2)}
						</pre>
					</div>
				</div>
			</div>
		</>
	);
}
