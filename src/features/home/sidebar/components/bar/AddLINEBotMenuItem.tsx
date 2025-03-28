import { useState } from "react"
import { BotMessageSquare } from "lucide-react"
import { SidebarMenuButton, SidebarMenuItem } from "@/features/components/ui/sidebar"
import { LINEBotButton } from "../line/LINEBotButton"

export const AddLINEBotMenuItem = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild onClick={() => setIsOpen(true)}>
          <a href="#">
            <BotMessageSquare />
            <span>Add LINE Bot</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <LINEBotButton open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
