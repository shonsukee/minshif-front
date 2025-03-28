import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import { UserProvider } from "@/features/context/UserContext";
import { ShiftSubmissionProvider } from "@/features/context/ShiftSubmissionContext";
import { SessionProvider } from "next-auth/react";
import { MembershipProvider } from "@/features/context/MembershipContext";
import { SidebarProvider, SidebarTrigger } from "@/features/components/ui/sidebar";
import { AppSidebar } from "@/features/home/sidebar/components/AppSidebar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "minshif",
  description: "minshifは、シフトをオンライン上で一元管理するアプリケーションです。シフトの作成を手軽に行うことができます。また、同じ時間に入っているバイト仲間も確認することができます。Googleログインで簡単に始めることができます。",
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
          <div className="flex flex-col justify-between w-full min-h-screen">
            <Header />
            <UserProvider>
              <MembershipProvider>
                <ShiftSubmissionProvider>
                  <SidebarProvider defaultOpen={defaultOpen}>
                    <div className="flex flex-1 w-full">
                      <AppSidebar />
                      <main className="flex-auto w-full max-w-7xl px-4 py-4 mx-auto sm:px-5 md:py-5">
                        <SidebarTrigger className="fixed top-[80px] left-6 z-50 hidden md:inline-flex" />
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