import { Fragment } from 'react';

import { Card, ICard } from '../Card';

export const CardList = ({ items }: { items: Array<ICard> }) => (
	<ul className="flex flex-col gap-6 mt-5 mb-12">
		{items.map(({ name, iconPath, url }) => (
			<Fragment key={name}>
				<Card name={name} iconPath={iconPath} url={url} />
			</Fragment>
		))}
	</ul>
);
