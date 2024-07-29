import HeaderText from '@/components/ui/HeaderText';
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Home() {
	const user = await getLoggedInUser();
	if (!user) redirect('/sign-in');
	return (
		<section className='home dark:bg-darkmode'>
			<div className='home-content'>
				<header className='home-header'>
					<HeaderText
						type='greeting'
						title='Welcome'
						user={user?.name}
						subtext='Access and manage your accounts and transactions efficiently'
					/>
					<TotalBalanceBox
						accounts={[]}
						totalBanks={1}
						totalCurrentBalance={14599.8}
					/>
				</header>
			</div>
			<RightSidebar
				user={user}
				transactions={[]}
				banks={[{ currentBalance: 40023 }, { currentBalance: 10093 }]}
			/>
		</section>
	);
}
