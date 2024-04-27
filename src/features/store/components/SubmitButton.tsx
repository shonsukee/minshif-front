import { SubmitButtonProps } from "../types";

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, name }) => {
	return (
		<button onClick={onClick} className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 -my-2.5">
			<span>
				{name}
			</span>
		</button>
	);
}

export default SubmitButton;
