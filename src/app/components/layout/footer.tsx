import CustomLink from "@/features/components/custom-link"

export default function Footer() {
	return (
		<footer className="flex flex-1 items-end gap-4 px-6 my-4 mx-0 w-full text-sm md:flex-row justify-between md:px-1 lg:px-6 md:my-12 md:mx-auto md:max-w-7xl md:h-5">
			<div className="flex flex-col gap-4 md:flex-row">
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
			<div className="flex gap-2 justify-start">
				<span className="text-slate-400 text-sm">© 2024 minshif</span>
			</div>
		</footer>
	)
}
