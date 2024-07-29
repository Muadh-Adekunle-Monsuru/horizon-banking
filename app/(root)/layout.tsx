import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/ui/Sidebar';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import prisma from '@/prisma/client';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const loggedInUser = await getLoggedInUser();
	if (!loggedInUser) redirect('/sign-in');
	const user = await prisma.user.findUnique({
		where: { id: loggedInUser.$id },
	});

	return (
		<main className='flex h-screen w-full font-inter'>
			<Sidebar user={user} />
			<div className='flex size-full flex-col'>
				<div className='root-layout'>
					<Image src='/icons/logo.svg' alt='logo' width={30} height={30} />
					<div>
						<MobileNav user={user} />
					</div>
				</div>
				{children}
			</div>
		</main>
	);
}
