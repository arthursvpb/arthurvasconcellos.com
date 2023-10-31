import Image from 'next/image';

export default function Home() {
	return (
		<>
			<main className="max-h-screen flex flex-col items-center mx-auto">
				<Image
					src="/assets/profile.jpg"
					alt="Arthur's Profile Picture"
					className="rounded-full border-2 border-green-300 mt-12"
					width={150}
					height={150}
					priority
				/>

				<h1 className="text-3xl font-bold mt-5 mb-2">Arthur Vasconcellos</h1>
				<h2 className="text-1xl mb-5">Senior Software Engineer</h2>

				<ul className="flex flex-col gap-6 mt-5 mb-12">
					<li className="rounded border-2 border-green-300 bg-green-900 h-16 w-60">
						<button className="h-full w-full">
							<span>LinkedIn</span>
						</button>
					</li>
					<li className="rounded border-2 border-green-300 bg-green-900 h-16 w-60">
						<button className="h-full w-full">
							<span>Github</span>
						</button>
					</li>
					<li className="rounded border-2 border-green-300 bg-green-900 h-16 w-60">
						<button className="h-full w-full">
							<span>Contact</span>
						</button>
					</li>
				</ul>

				<footer className="flex flex-col items-center">
					<Image
						src="/favicon.ico"
						alt="Arthur's Logo"
						width={50}
						height={50}
						priority
					/>
					<p>Copyright © {new Date().getFullYear()}</p>
				</footer>
			</main>
		</>
	);
}
