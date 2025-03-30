import { ChevronDown, Plus } from "lucide-react"
import { Store } from "@/features/home/sidebar/types"
import { SidebarMenuButton, SidebarMenuItem } from "@/features/components/ui/sidebar"
import { SubmitShiftModal } from "@/features/home/sidebar/components/SubmitShiftModal"
import { useContext, useEffect, useState } from "react"
import FetchStores from "@/features/home/api/FetchStores"
import SwitchStore from "@/features/home/api/SwitchStore"
import { UserContext } from "@/features/context/UserContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/components/ui/dropdown-menu"
import { useMembership } from "@/features/context/MembershipContext"

export const SelectStoreMenuItem = () => {
  const user = useContext(UserContext)?.user;
  const { refetchMembership } = useMembership();
  const [isOpen, setIsOpen] = useState(false);
  const [stores, setStores] = useState([]);


  useEffect(() => {
    const initStores = async () => {
      const response = await FetchStores(user?.id || '');
      setStores(response);
    }
    initStores();
  }, [user?.id]);

  const handleSwitchStore = (user_id: string | undefined, store_id: string) => {
    const switchedStore = async (store_id: string) => {
      const response = await SwitchStore(user_id, store_id);
      setStores(response);
      refetchMembership();
    }
    switchedStore(store_id);
  };

  return (
    <>
      <SidebarMenuItem className="pt-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              {stores ? stores.filter((store: Store) => store.current_store).map((store: Store, index) => (
                <span key={index}>{store?.store_name}</span>
              )): null}
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
            {stores ? stores.filter((store: Store) => !store.current_store).map((store: Store, index) => (
              <DropdownMenuItem key={index} onClick={() => handleSwitchStore(user?.id, store.id)}>
                <span>{store?.store_name}</span>
              </DropdownMenuItem>
            )): null}
            <DropdownMenuItem>
              <a href={"/store/create"} className="flex w-full items-center justify-between gap-2">
                <span>Create new store</span>
                <Plus />
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <SubmitShiftModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
