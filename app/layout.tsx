import type { Metadata } from 'next';
import { Inter, IBM_Plex_Serif } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmPlex = IBM_Plex_Serif({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-ibmPlex',
});

export const metadata: Metadata = {
	title: 'Horizon',
	description: 'The modern banking platform for everyone.',
	icons: {
		icon: '/icons/logo.svg',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn(
					'min-h-screen bg-background font-inter antialiased',
					inter.variable,
					ibmPlex.variable
				)}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='light'
					enableSystem
					disableTransitionOnChange
				>
					<Toaster position='top-right' />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
