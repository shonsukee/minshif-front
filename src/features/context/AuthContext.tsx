"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCookies } from 'react-cookie';

interface Token {
	token: string;
}

export const TokenContext = createContext<Token | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string>("");
	const [cookies] = useCookies(['token']);

	useEffect(() => {
		setToken(cookies.token);
	}, [cookies.token]);

	return (
		<TokenContext.Provider value={{ token }}>
			{children}
		</TokenContext.Provider>
	);
};

export const useToken = () => {
	const context = useContext(TokenContext);
	if (!context) {
		throw new Error('useTokenはTokenProviderの中でのみ使用できます');
	}
	return context;
};
