export const dynamic = 'force-dynamic';
import GenerateReceipt from '@/components/GenerateReceipts';
import LatestTransfter from '@/components/LatestTransfter';
import { Button } from '@/components/ui/button';
import HeaderText from '@/components/ui/HeaderText';
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getTotalBalance } from '@/lib/utils';
import prisma from '@/prisma/client';
import { SearchParamProps } from '@/types';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home({
	searchParams: { id, page },
}: SearchParamProps) {
	const loggedInUser = await getLoggedInUser();

	const user = await prisma.user.findUnique({
		where: { id: loggedInUser.$id },
	});
	const totalBalance = getTotalBalance(user.Banks);

	return (
		<section className='home dark:bg-darkmode'>
			<div className='home-content flex flex-col'>
				<header className='home-header'>
					<HeaderText
						type='greeting'
						title='Welcome'
						user={user?.firstName}
						subtext='Access and manage your accounts and transactions efficiently'
					/>
					{user.Banks.length > 0 && (
						<>
							<TotalBalanceBox
								accounts={user.Banks}
								totalBanks={user.Banks.length}
								totalCurrentBalance={totalBalance}
							/>
							<LatestTransfter data={user.Banks} />
						</>
					)}
				</header>
				{user.Banks.length == 0 && (
					<div className='w-full h-full flex flex-col gap-4 items-center justify-center flex-grow'>
						<h2 className='font-semibold'>You do not have any bank account</h2>
						<Image
							src={'/creditcard.svg'}
							width={300}
							height={300}
							alt='creditcard'
						/>

						<Button asChild>
							<Link href={'/my-banks'}>
								Create Account <Plus className='size-4 ml-2' />
							</Link>
						</Button>
					</div>
				)}
			</div>
			<RightSidebar user={user} transactions={[]} banks={user.Banks} />
		</section>
	);
}
