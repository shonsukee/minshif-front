export interface Store {
	id: string;
	store_name: string;
	current_store: boolean;
};

export interface setSubmitShiftModalProps {
	setSubmitShiftModal: React.Dispatch<React.SetStateAction<boolean>>
};