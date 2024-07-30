import TransactionPage from '@/components/TransactionPage';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import prisma from '@/prisma/client';
import React from 'react';

export default async function TransactionHistoryPage() {
	const loggedInUser = await getLoggedInUser();

	const user = await prisma.user.findUnique({
		where: { id: loggedInUser.$id },
	});

	const transactions = user.Banks.flatMap((bank) => bank.transactions);
	return (
		<div className='h-full w-full p-5 overflow-y-auto'>
			<div>
				<h1 className='text-2xl font-semibold'>Transaction History</h1>
				<p className='text-sm text-gray-500'>
					Gain Insights and Track Your Transactions Over Time
				</p>
			</div>
			<TransactionPage transactions={transactions} />
		</div>
	);
}
