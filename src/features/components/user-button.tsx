import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { auth } from "@/auth"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { SignIn, SignOut } from "./auth-components"

export default async function UserButton() {
	const session = await auth();
	if (!session?.user) return <SignIn />

	return (
		<div className="flex gap-2 items-center">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative w-8 h-8 rounded-full">
						<Avatar className="w-8 h-8">
							<AvatarImage
								src={
								session.user.image ??
								"https://source.boringavatars.com/marble/120"
								}
								alt={session.user.name ?? ""}
							/>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{session.user.name}
							</p>
							<p className="text-xs leading-none text-muted-foreground">
								{session.user.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<SignOut />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
