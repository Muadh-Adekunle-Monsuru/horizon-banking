import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/ThemeToggle';
import Image from 'next/image';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<ModeToggle />
			Welcome
			<h1 className='font-ibmPlex'>Another font</h1>
			<Button>Hello World</Button>
		</main>
	);
}
