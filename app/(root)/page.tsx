import HeaderText from '@/components/ui/HeaderText';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import React from 'react';

export default function Home() {
	const user = { firstName: 'Jackson' };
	return (
		<section className='home'>
			<div className='home-content'>
				<div className='home-header'>
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
				</div>
			</div>
		</section>
	);
}
