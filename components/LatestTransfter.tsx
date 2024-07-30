import { Banks } from '@prisma/client';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table';
import TableRowDialog from './TableRowDialog';

export default function LatestTransfter({ data }: { data: Banks[] }) {
	const transactions = data.flatMap((bank) => bank.transactions);
	return (
		<div>
			<div className='flex items-center justify-between'>
				<h1 className='font-semibold text-xl'>Recent Transactions</h1>
				<Button variant='outline' asChild>
					<Link href={'/transaction-history'}>
						<CreditCard className='size-5 mr-2' />
						View All
					</Link>
				</Button>
			</div>
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Transaction</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className='w-full overflow-x-auto'>
						{transactions
							.sort((a, b) => Number(b.date) - Number(a.date))
							.slice(0, 5)
							.map((item) => (
								<TableRowDialog key={item.id} transaction={item} />
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
