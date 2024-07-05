import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import { UserProvider } from "@/features/context/UserContext";
import { ShiftSubmissionProvider } from "@/features/context/ShiftSubmissionContext";

export const metadata: Metadata = {
	title: "minshif",
	description: "minshifのホームページ",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body className="h-90v">
				<UserProvider>
					<ShiftSubmissionProvider>
						<Header />
							{children}
						<Footer />
					</ShiftSubmissionProvider>
				</UserProvider>
			</body>
		</html>
	);
}