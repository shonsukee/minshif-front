"use client"

import { useSession } from "next-auth/react"
import { AppSidebar } from "@/features/home/sidebar/components/AppSidebar"
import { SidebarTrigger } from "@/features/components/ui/sidebar";

export function AppSidebarWrapper() {
	const { status } = useSession();

	if (status !== "authenticated") return null;

	return <AppSidebar />;
}

export function SidebarTriggerWrapper() {
	const { status } = useSession()
	if (status !== "authenticated") return null
	return <SidebarTrigger className="fixed top-[80px] left-2 z-50 hidden md:inline-flex" />
}
