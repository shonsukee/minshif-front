import { MainNav } from "@/features/components/main-nav"
import UserButton from "@/features/components/user-button"

export default function Header() {
	return (
		<header className="sticky flex justify-center border-b">
			<meta property="og:title" content="minshif" />
			<meta property="og:description" content="シフト管理をスマートに。" />
			<meta property="og:image" content="https://www.minshif.com/logo.png" />
			<meta property="og:url" content="https://www.minshif.com" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name='twitter:title' content='minshif' />
			<meta name='twitter:description' content='シフト管理をスマートに。' />
			<meta name='twitter:image' content='https://www.minshif.com/logo.png' />

			<div className="flex items-center justify-between w-full h-16 max-w-7xl px-4 mx-auto sm:px-6">
				<MainNav />
				<UserButton />
			</div>
		</header>
	)
}
