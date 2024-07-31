export const dynamic = 'force-dynamic';

import TransactionPage from '@/components/TransactionPage';
import { Button } from '@/components/ui/button';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import prisma from '@/prisma/client';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
			{transactions.length > 0 ? (
				<TransactionPage transactions={transactions} />
			) : (
				<div className='flex flex-col items-center justify-center gap-5 py-10'>
					<p>No transactions recorded</p>
					<Image
						src={'/transaction.svg'}
						width={300}
						height={300}
						alt='empty transaction'
					/>
					<Button asChild>
						<Link href={'/payment-transfer'}>
							Make Transaction <Plus className='size-4' />
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
}
