import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import { UserProvider } from "@/features/context/UserContext";
import { ShiftSubmissionProvider } from "@/features/context/ShiftSubmissionContext";
import { SessionProvider } from "next-auth/react";
import { MembershipProvider } from "@/features/context/MembershipContext";

export const metadata: Metadata = {
	title: "minshif",
	description: "minshifは、シフトをオンライン上で一元管理するアプリケーションです。シフトの作成を手軽に行うことができます。また、同じ時間に入っているバイト仲間も確認することができます。Googleログインで簡単に始めることができます。",
};

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" className="h-full">
			<SessionProvider>
                <body className={`${inter.className} h-full`}>
					<div className="flex flex-col justify-between w-full h-full min-h-screen">
						<Header />
							<UserProvider>
								<MembershipProvider>
									<ShiftSubmissionProvider>
										<main className="flex-auto w-full max-w-7xl px-4 py-4 mx-auto sm:px-6 md:py-6">
											{children}
										</main>
									</ShiftSubmissionProvider>
								</MembershipProvider>
							</UserProvider>
						<Footer />
					</div>
				</body>
			</SessionProvider>
		</html>
	);
}