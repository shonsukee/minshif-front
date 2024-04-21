"use client";
import Button from '@/app/components/elements/_arrow_button'
import Link from 'next/link';
import Image from 'next/image';
import '@/app/globals.css';
import { UserContext } from '@/features/context/UserContext';
import { useContext } from 'react';
import { UserContextType, User } from '@/features/auth/types/index';

export default function Header() {
	const user  = useContext(UserContext);

	return (
		<header className="relative w-full text-xl font-semibold leading-6 text-slate-900">
			<nav className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
				<div className="relative flex flex-wrap justify-between p-5 m-5">
					<div>
						<Link href="/" className="text-slate-900">
							<span>minshif</span>
						</Link>
					</div>

					<div className="flex justify-end items-center">
						{user ? (
							<UserImage user={user} />
						) : (
							<LoginButton />
						)}
					</div>
					<div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5"></div>
				</div>
			</nav>
		</header>
	);
}

function UserImage({ user }: { user: UserContextType }) {
	return user?.user?.picture ? (
		<Image src={user.user.picture} alt="user" width={48} height={48} className="rounded-full" />
	) : (
		<DefaultUserIcon />
	);
}

function DefaultUserIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
			<path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
		</svg>
	);
}

function LoginButton() {
	return (
		<div className="login-button-container">
			<Button name={'ログイン'} href={'/login'} />
		</div>
	);
}