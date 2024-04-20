export type User = {
	id: string;
	name: string;
	email: string;
	picture: string;
}

export type UserContextType = {
	user: User | null;
}
