import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex flex-col items-center min-h-screen mx-auto">
			<h1 className="text-3xl font-bold my-10">Arthur Vasconcellos</h1>
			<Image
				src="/assets/profile.jpg"
				alt="Arthur's Profile Picture"
				className="rounded-full border-2 border-green-300"
				width={125}
				height={125}
				priority
			/>
		</main>
	);
}
