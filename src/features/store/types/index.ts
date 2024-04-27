export interface SubmitButtonProps {
	onClick: (e: any) => Promise<void>;
	name: string;
}

export interface TextBoxProps {
	name: string;
	setStoreName: React.Dispatch<React.SetStateAction<string>>;
}

export interface StoreCreateProps {
	response?: object;
	error?: object;
}