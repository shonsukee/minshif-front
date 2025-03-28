"use client"
import { Plus, Calendar, ChevronDown, Home, Inbox, UserPlus, BotMessageSquare } from "lucide-react"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/features/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { useContext, useState } from "react"
import { SubmitShiftModal } from "@/features/home/sidebar/components/SubmitShiftModal"
import { MembershipContext } from "@/features/context/MembershipContext"

const page_items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
]

const external_items = [
  {
    title: "Invite Members",
    url: "#",
    icon: UserPlus,
  },
  {
    title: "Add LINE Bot",
    url: "#",
    icon: BotMessageSquare,
  },
]

export function AppSidebar() {
	const membership = useContext(MembershipContext);
  const [isSubmitShiftModalOpen, setSubmitShiftModalOpen] = useState(false);
  const shift_submission_request_number = 2;
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
        <SidebarMenuItem className="pt-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                Select Store
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem>
                <span>Acme Inc</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Acme Corp.</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href={"/store/create"} className="flex w-full items-center justify-between gap-2">
                    <span>Create new store</span>
                    <Plus />
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>

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
              {/* シフト提出依頼 - without staff */}
              {(
                membership?.membership?.privilege === "manager" ||
                membership?.membership?.privilege === "developer"
              ) && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => setSubmitShiftModalOpen(true)}>
                    <a href="#">
                      <Inbox />
                      <span>Submission Request</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"#"}>
                    <Calendar />
                    <span>Submission</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge>{shift_submission_request_number}</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>External</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {external_items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                    {typeof item.icon === "string" ? (
                        <Image
                            src={item.icon}
                            alt={item.title}
                            width={20}
                            height={20}
                        />
                        ) : (
                        <item.icon />
                    )}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SubmitShiftModal open={isSubmitShiftModalOpen} onOpenChange={setSubmitShiftModalOpen} />
      </SidebarContent>
    </Sidebar>
  )
}
