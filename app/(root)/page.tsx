import HeaderText from '@/components/ui/HeaderText';
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import React from 'react';

export default function Home() {
	const user = {
		firstName: 'Jackson',
		lastName: 'Andrews',
		email: 'jackson@gmail.com',
	};
	return (
		<section className='home'>
			<div className='home-content'>
				<header className='home-header'>
					<HeaderText
						type='greeting'
						title='Welcome'
						user={user.firstName}
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
