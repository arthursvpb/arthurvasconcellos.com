import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import '../styles/globals.css';
import '../styles/custom.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en-us">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
