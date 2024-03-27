import React from 'react';
import '../../output.css';
import Button from './_arrow_button'

const Header = () => {
	return (
		<header className="relative z-50 w-full flex-none text-xl font-semibold leading-6 text-slate-900">
			<nav className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
				<div className="relative flex flex-wrap justify-between p-5 m-5">
					<div className="w-3/12">
						<a href="/" className="flex-none text-slate-900">
							<span className="sr-only">minshif</span>
							minshif
						</a>
					</div>

					<div className="flex flex-none justify-end items-center">
						<div className="flex flex-wrap whitespace-nowrap">
							<Button name={'ログイン'} href={'/login'}/>
						</div>
					</div>
					<div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5"></div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
