import Link from 'next/link';
import '@/app/globals.css';

export default function Footer() {
	return (
		<footer className="relative w-full flex-none text-xl font-semibold leading-6 mt-16 py-12 px-8">
			<nav className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
				<div className="absolute inset-x-0 top-0 h-px bg-slate-900/5"></div>
				<div className="relative flex justify-center p-5 m-5">
					<span className="text-slate-400 text-sm">© 2024 minshif</span>
				</div>
			</nav>
		</footer>
	);
}