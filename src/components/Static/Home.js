import React from "react";
import '../../output.css';
import Header from "../Partials/_header";
import Button from "../Partials/_arrow_button";

export default function Home() {
	return (
		<>
			<Header />
			<div>
				<div className="h-70-screen grid grid-cols-12 p-max">
					<div className="col-span-12 justify-self-center align-self-center xl:col-span-5">
						<h1 className="text-4xl font-bold mb-2 whitespace-nowrap">シフトの変更もラクラク管理。</h1>
						<h2 className="text-xl mb-4">minshifは、予定を一元管理する<br />スケジュールプラットフォームです。</h2>
						<div className="">
							<Button name={'ログイン'} href={'/login'}/>
						</div>
					</div>
					<div className="col-span-7 align-self-center basis-8/12 hidden xl:inline-block">
						<img src="/img/time_shift.png" alt="minshif-time-axis" />
					</div>
				</div>
			</div>
		</>
	);
}
