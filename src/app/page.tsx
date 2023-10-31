import Image from 'next/image';

import { ICard } from '@/components/Card';
import { CardList } from '@/components/CardList';

const Home = () => {
	const cards: Array<ICard> = [
		{
			name: 'Github',
			iconPath: '/assets/svg/github.svg',
			url: 'https://github.com/arthursvpb',
		},
		{
			name: 'Linkedin',
			iconPath: '/assets/svg/linkedin.svg',
			url: 'https://linkedin.com/in/arthursvpb/',
		},
		{
			name: 'Contact',
			iconPath: '/assets/svg/email.svg',
			url: 'mailto:contato@arthurvasconcellos.com',
		},
	];

	return (
		<>
			<main className="max-h-screen flex flex-col items-center mx-auto">
				<Image
					src="/assets/images/profile.jpg"
					alt="Arthur's Profile Picture"
					className="rounded-full border-2 border-green-300 mt-12"
					width={150}
					height={150}
					priority
				/>

				<h1 className="text-3xl font-bold mt-5 mb-2">Arthur Vasconcellos</h1>
				<h2 className="text-1xl mb-5">Senior Software Engineer</h2>

				<CardList items={cards} />

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
};

export default Home;
