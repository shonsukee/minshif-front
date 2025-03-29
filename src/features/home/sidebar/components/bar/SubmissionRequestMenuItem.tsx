import { Inbox } from "lucide-react"
import { Membership } from "@/features/auth/types"
import { SidebarMenuButton, SidebarMenuItem } from "@/features/components/ui/sidebar"
import { SubmitShiftModal } from "@/features/home/sidebar/components/SubmitShiftModal"
import { useState } from "react"

export const SubmissionRequestMenuItem = (membership: Membership | null | undefined) => {
  const [isOpen, setIsOpen] = useState(false)

  if (membership?.privilege !== "manager" && membership?.privilege !== "developer") {
    return null
  }

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild onClick={() => setIsOpen(true)}>
          <a href="#">
            <Inbox />
            <span>Submission Request</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SubmitShiftModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
