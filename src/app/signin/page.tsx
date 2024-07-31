"use client"
import { redirect, useRouter } from "next/navigation";
import { signIn, getProviders } from "next-auth/react";
import { AuthError } from "next-auth";
import { useEffect, useState } from "react";
import Image from "next/image";

const authStyle: Record<string, { className: string; color: string; icon: string }> = {
	Google: {
		className: "bg-white text-black border border-black",
		color: "gray",
		icon: "/icons/google.svg",
	},
	GitHub: {
		className: "bg-white text-black border border-black",
		color: "gray",
		icon: "/icons/github.svg",
	},
	Discord: {
		className: "bg-white text-black border border-black",
		color: "gray",
		icon: "/icons/discord.svg",
	},
};

export default function SignInPage() {
	const [providers, setProviders] = useState<Record<string, any> | null>(null);
	const router = useRouter();

	useEffect(() => {
		async function fetchProviders() {
			const providers = await getProviders();
			setProviders(providers);
		}
		fetchProviders();
	}, []);

	if (!providers) return <div>Loading...</div>;

	return (
		<div>
			<div className="signin-bg fixed top-0 h-auto w-screen" />
			<div className="flex items-center justify-center">
				<div className="container z-10 flex h-auto flex-col items-center justify-center">
					<div className="rounded-xl border bg-white px-10 py-4">
						<div>
							<div className="pb-10 pt-5 text-center">
								<div>シフト管理をスマートに。</div>
								<div className="text-2xl font-bold">minshif</div>
							</div>
							<div className="flex flex-col items-center pb-10">
								{Object.values(providers ?? {}).map((provider) => {
									const item = authStyle[provider.name];
									if (!item) {
										console.warn(`No auth style defined for provider ${provider.name}`);
										return null;
									}

									return (
										<form
											key={provider.name}
											onSubmit={async (e) => {
												e.preventDefault();
												try {
													await signIn(provider.id);
													router.push("/");
												} catch (error) {
													if (error instanceof AuthError) {
														return redirect(
															`${process.env.SIGNIN_ERROR_URL}?error=${error.type}`
														);
													}
													throw error;
												}
											}}
										>
											<button
												type="submit"
												className={`my-3 w-72 rounded-lg px-4 py-2 font-bold flex items-center ${item.className}`}
											>
												<Image
													src={item.icon}
													alt={`${provider.name} icon`}
													className="h-5 w-5 mr-4"
													width={20}
													height={20}
												/>
												Sign in with {provider.name}
											</button>
										</form>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
