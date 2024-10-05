import CustomLink from "@/features/components/custom-link"

export default function Footer() {
	return (
		<footer className="flex flex-col gap-4 px-4 my-4 mx-0 w-full text-sm sm:flex-row sm:justify-between sm:items-center sm:px-6 sm:my-12 sm:mx-auto sm:max-w-7xl sm:h-5">
			<div className="flex flex-col gap-4 sm:flex-row">
				<CustomLink href="https://github.com/shonsukee/minshif-front">
					Front source on GitHub
				</CustomLink>
				<CustomLink href="https://github.com/shonsukee/minshif-back">
					Back source on GitHub
				</CustomLink>
				<CustomLink href={`${process.env.AUTH_URL}/policy/terms`}>
					利用規約
				</CustomLink>
				<CustomLink href={`${process.env.AUTH_URL}/policy/privacy`}>
					プライバシーポリシー
				</CustomLink>
			</div>
			<div className="flex gap-2 justify-start items-center">
				<span className="text-slate-400 text-sm">© 2024 minshif</span>
			</div>
		</footer>
	)
}
