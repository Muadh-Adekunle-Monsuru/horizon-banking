import HeaderText from '@/components/ui/HeaderText';
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Home({
	searchParams: { id, page },
}: SearchParamProps) {
	const user = await getLoggedInUser();
	const accounts = await getAccounts({ userId: user.$id });
	if (!accounts) return;

	const accountsData = accounts?.data;

	const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;

	const account = await getAccount({ appwriteItemId });

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
						accounts={accountsData}
						totalBanks={accounts?.totalBanks}
						totalCurrentBalance={accounts?.totalCurrentBalance}
					/>
				</header>
			</div>
			<RightSidebar
				user={user}
				transactions={accounts?.transactions}
				banks={accountsData?.slice(0, 2)}
			/>
		</section>
	);
}
