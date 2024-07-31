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
	pages: {
		signIn: "/signin",
	},
	basePath: "/api/auth",
	callbacks: {
		authorized: async ({request, auth}) => {
			try {
				const { pathname } = request.nextUrl;
				// Authentication required except for the root and sign-in pages.
				if (pathname !== "/" && pathname !== "/api/auth/signin") return !!auth;
				return true;
			} catch (e) {
				console.log(e);
			}
		},
		jwt: async ({ token, trigger, session }) => {
			if (trigger === "update") token.name = session.user.name;
			return token;
		}
	}
})

