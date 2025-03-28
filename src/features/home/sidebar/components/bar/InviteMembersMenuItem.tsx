import { useState } from "react"
import { UserPlus } from "lucide-react"
import { Membership } from "@/features/auth/types"
import { SidebarMenuButton, SidebarMenuItem } from "@/features/components/ui/sidebar"
import { InviteButton } from "@/features/home/sidebar/components/invitation/InviteButton"

export const InviteMembersMenuItem = (membership: Membership | null | undefined) => {
  const [isOpen, setIsOpen] = useState(false)

  if (membership?.privilege !== "manager" && membership?.privilege !== "developer") {
    return null
  }

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild onClick={() => setIsOpen(true)}>
          <a href="#">
            <UserPlus />
            <span>Invite Members</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <InviteButton open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
