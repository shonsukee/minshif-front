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
	description: "minshifのホームページ",
};

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body className={inter.className}>
				<div className="flex flex-col justify-between w-full h-full min-h-screen">
					<Header />
						<SessionProvider>
							<UserProvider>
								<MembershipProvider>
									<ShiftSubmissionProvider>
										<main className="flex-auto w-full max-w-7xl px-4 py-4 mx-auto sm:px-6 md:py-6">
											{children}
										</main>
									</ShiftSubmissionProvider>
								</MembershipProvider>
							</UserProvider>
						</SessionProvider>
					<Footer />
				</div>
			</body>
		</html>
	);
}