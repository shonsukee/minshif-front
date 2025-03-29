import { Calendar } from "lucide-react"
import { SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/features/components/ui/sidebar"
import { useContext, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/features/components/ui/popover"
import { useRouter } from "next/navigation"
import { ShiftSubmissionContext } from "@/features/context/ShiftSubmissionContext"
import { Button } from "@/features/components/ui/button"

export const SubmissionMenuItem = () => {
  const shiftSubmission = useContext(ShiftSubmissionContext)?.shiftSubmissionRequest ?? null;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = (id: number) => {
    setIsOpen(false);
    router.push(`/shift/preferredShift/${id}`);
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <SidebarMenuButton>
              <Calendar />
              <span>Submission</span>
              <SidebarMenuBadge>{shiftSubmission ? shiftSubmission.length : 0}</SidebarMenuBadge>
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent align="start" side="right" className="w-[240px] p-2">
            <div className="flex flex-col gap-2">
              {shiftSubmission?.map((submission) => {
                const date = new Date(submission.deadline_date)
                const formatted =
                  submission.deadline_date
                    ? `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} 〆`
                    : "締切日なし";
                return (
                  <Button
                    key={submission.id}
                    variant="ghost"
                    className="justify-start text-left w-full text-sm"
                    onClick={() => handleClick(submission.id)}
                  >
                    <span className="text-red-600 font-bold">{formatted}</span>
                    {submission.notes && (
                      <span className="ml-2 font-semibold">{submission.notes}</span>
                    )}
                  </Button>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
