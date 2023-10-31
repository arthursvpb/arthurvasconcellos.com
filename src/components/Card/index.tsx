import Image from 'next/image';
import Link from 'next/link';

export interface ICard {
	name: string;
	iconPath: string;
	url: string;
}

export const Card = ({ name, iconPath, url }: ICard) => (
	<li className="rounded border-2 border-green-300 bg-green-900 h-16 w-60">
		<Link href={url} target="_blank">
			<button className="flex items-center justify-center h-full w-full">
				<div className="flex items-center justify-center">
					<Image src={iconPath} alt={name} width={25} height={25} />
					<p className="ml-2">{name}</p>
				</div>
			</button>
		</Link>
	</li>
);
