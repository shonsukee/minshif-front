"use client"

import Link from "next/link";

export default function StoreJoin() {
	return (
		<>
			<div className="text-center w-fit mx-auto">
				<div>
					<h3 className="text-3xl font-bold m-10">グループに参加</h3>
					<span className="flex items-start justify-end my-10">
						このページからグループへ参加することができません。<br />
						管理者アカウントをお持ちの方にメールアドレスを送ってください。<br />
					</span>
				</div>
				<div>
					<Link href={"/store/create"}>
						<span className="text-blue-800">グループを新規作成</span>
					</Link>
				</div>
			</div>
		</>
	);
};
