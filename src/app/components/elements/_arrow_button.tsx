import Link from 'next/link';
import React from 'react';

interface ArrowButtonProps {
	name: string;
	href: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ name, href }) => {
	return (
		<Link href={href} className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 -my-2.5">
			<span>
				{name}
				<span aria-hidden="true">
				→
				</span>
			</span>
		</Link>
	);
};

export default ArrowButton;
