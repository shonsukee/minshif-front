import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
	Google,
	GitHub,
	Discord,
]

export const providerMap = providers.map((provider) => {
	if (typeof provider === "function") {
		const providerData = provider()
		return { id: providerData.id, name: providerData.name }
	} else {
		return { id: provider.id, name: provider.name }
	}
})

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers,
	// カスタムページの設定
	pages: {
		signIn: "/signin",
		signOut: "/",
	},
	basePath: "/api/auth",
	callbacks: {
		redirect: async ({ url, baseUrl }) => {
			return url.startsWith(baseUrl) ? url : `${baseUrl}/redirect`;
		},
		authorized: async ({request, auth}) => {
			try {
				const { pathname } = request.nextUrl;
				// Authentication required except for the root and sign-in pages.
				if (pathname !== "/" && pathname !== "/api/auth/signin" && pathname !== "/redirect") return !!auth;
				return true;
			} catch (e) {
				console.log(e);
			}
		},
		jwt: async ({ token, user, account }) => {
			if (user) {
				token.user = user;
			}

			if (account) {
				token.id = account.providerAccountsId;
				token.accessToken = account.access_token;
			}
			return token
		},
		session: async ({ session, token }) => {
			session.accessToken = token.accessToken as string;
			session.user.id = token.sub as string;
			return session
		},
	},
})
