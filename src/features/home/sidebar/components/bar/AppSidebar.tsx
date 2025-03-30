"use client"

import { Home } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/features/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { useContext } from "react"
import { MembershipContext } from "@/features/context/MembershipContext"
import { InviteMembersMenuItem } from "./InviteMembersMenuItem"
import { SubmissionRequestMenuItem } from "./SubmissionRequestMenuItem"
import { AddLINEBotMenuItem } from "./AddLINEBotMenuItem"
import { SubmissionMenuItem } from "./SubmissionMenuItem"
import { SelectStoreMenuItem } from "./SelectStoreMenuItem"

const page_items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
]

export function AppSidebar() {
  const membership = useContext(MembershipContext)?.membership;
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    )
  }

  return (
    <Sidebar collapsible="offcanvas" >
      <SidebarContent>
        <SelectStoreMenuItem />

        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {page_items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Shifts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SubmissionRequestMenuItem(membership)}
              {SubmissionMenuItem()}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>External</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {InviteMembersMenuItem(membership)}
              {AddLINEBotMenuItem()}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}
