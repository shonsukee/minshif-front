import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import { UserProvider } from "@/features/context/UserContext";
import { ShiftSubmissionProvider } from "@/features/context/ShiftSubmissionContext";
import { SessionProvider } from "next-auth/react";
import { MembershipProvider } from "@/features/context/MembershipContext";
import { SidebarProvider } from "@/features/components/ui/sidebar";
import { cookies } from "next/headers";
import {
  AppSidebarWrapper,
  SidebarTriggerWrapper,
} from "@/features/home/sidebar/components/SidebarWrapper";

export const metadata: Metadata = {
  title: "minshif",
  description:
    "minshifは、シフトをオンライン上で一元管理するアプリケーションです。シフトの作成を手軽に行うことができます。また、同じ時間に入っているバイト仲間も確認することができます。Googleログインで簡単に始めることができます。",
};

const inter = Inter({subsets: ['latin']});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="ja" className="h-full">
      <SessionProvider>
        <body className={`${inter.className} h-full`}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <UserProvider>
              <MembershipProvider>
                <ShiftSubmissionProvider>
                  <SidebarProvider defaultOpen={defaultOpen}>
                    <div className="flex flex-1 w-full overflow-hidden">
                        <AppSidebarWrapper />
                        <SidebarTriggerWrapper />
                        <main className="flex-1 w-full px-4 sm:px-5 py-4 overflow-x-auto">
                            {children}
                        </main>
                    </div>
                  </SidebarProvider>
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