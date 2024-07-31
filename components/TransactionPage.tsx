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
import { Button } from './ui/button';
import { RefreshCcwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TransactionPage({
	transactions,
}: {
	transactions: Transactions[];
}) {
	const [itemCount, setItemCount] = useState(6);
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();
	let pageCount = Math.ceil(transactions.length / itemCount);
	return (
		<div className='py-10'>
			<div className='flex justify-between items-center'>
				<div>
					<h2 className='font-medium'>Your History</h2>
					<p className='text-sm text-gray-600 pb-4'>
						Select a transaction to view complete transaction details.
					</p>
				</div>
				<Button variant='ghost' onClick={() => router.refresh()}>
					<RefreshCcwIcon className='size-4 mr-2' /> Refresh
				</Button>
			</div>
			<div className=''>
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
							.slice((currentPage - 1) * itemCount, currentPage * itemCount)
							.map((item) => (
								<TableRowDialog key={item.id} transaction={item} />
							))}
					</TableBody>
				</Table>
			</div>
			{pageCount > 1 && (
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
			)}
		</div>
	);
}
