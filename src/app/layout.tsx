import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: ReactNode }) => (
	<html lang="en-us">
		<body className={inter.className}>{children}</body>
	</html>
);

export default RootLayout;
