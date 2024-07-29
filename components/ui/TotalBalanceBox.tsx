import React from 'react';
import BalanceCounter from '../BalanceCounter';
import DoughnutChart from './DoughnutChart';
import { TotalBalanceBoxProps } from '@/types';

export default function TotalBalanceBox({
	accounts,
	totalBanks,
	totalCurrentBalance,
}: TotalBalanceBoxProps) {
	return (
		<section className='total-balance dark:bg-gray-800'>
			<div className='total-balance-chart'>
				<DoughnutChart accounts={accounts} />
			</div>
			<div className='flex flex-col gap-6'>
				<h2 className='header-2 dark:text-white'>
					Bank Accounts: {totalBanks}
				</h2>
				<div className='flex flex-col gap-2 '>
					<p className='total-balance-label dark:text-gray-300'>
						Total Current Balance
					</p>

					<BalanceCounter amount={totalCurrentBalance} />
				</div>
			</div>
		</section>
	);
}
