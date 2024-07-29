import HeaderText from '@/components/ui/HeaderText';
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getTotalBalance } from '@/lib/utils';
import prisma from '@/prisma/client';
import { SearchParamProps } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react';

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
			<div className='home-content'>
				<header className='home-header'>
					<HeaderText
						type='greeting'
						title='Welcome'
						user={user?.firstName}
						subtext='Access and manage your accounts and transactions efficiently'
					/>
					<TotalBalanceBox
						accounts={user.Banks}
						totalBanks={user.Banks.length}
						totalCurrentBalance={totalBalance}
					/>
				</header>
			</div>
			<RightSidebar user={user} transactions={[]} banks={user.Banks} />
		</section>
	);
}
