'use client';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Transactions } from '@prisma/client';
import TableRowDialog from './TableRowDialog';
import { useState } from 'react';

export default function TransactionPage({
	transactions,
}: {
	transactions: Transactions[];
}) {
	const [itemCount, setItemCount] = useState(6);
	const [currentPage, setCurrentPage] = useState(1);
	let pageCount = Math.ceil(transactions.length / itemCount);
	return (
		<div className='py-10'>
			<h2 className='font-medium'>Your History</h2>
			<p className='text-sm text-gray-600 pb-4'>
				Select a transaction to view full details.
			</p>
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
					<TableBody>
						{transactions
							.sort((a, b) => Number(b.date) - Number(a.date))
							.slice((currentPage - 1) * itemCount, currentPage * itemCount)
							.map((item) => (
								<TableRowDialog key={item.id} transaction={item} />
							))}
					</TableBody>
				</Table>
			</div>
			<Pagination>
				<PaginationContent>
					<PaginationItem className='select-none'>
						<PaginationPrevious
							onClick={() => {
								if (currentPage == 1) return;
								setCurrentPage((prev) => prev - 1);
								console.log(`page ${currentPage} out of ${pageCount}`);
							}}
						/>
					</PaginationItem>
					<PaginationItem className='select-none'>
						<PaginationLink>
							{currentPage} of {pageCount}
						</PaginationLink>
					</PaginationItem>
					<PaginationItem className='select-none'>
						<PaginationNext
							onClick={() => {
								if (currentPage == pageCount) return;
								setCurrentPage((prev) => prev + 1);
								console.log(`page ${currentPage} out of ${pageCount}`);
							}}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
