import React from 'react';
import '../../output.css';

export default function ArrowButton(props) {
	return (
		<a className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 -my-2.5" href={props.href}>
			<span>
				{props.name}
				<span aria-hidden="true">
					→
				</span>
			</span>
		</a>
	);
}