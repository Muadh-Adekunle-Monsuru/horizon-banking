import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { TableCell, TableRow } from './ui/table';
import { Transactions } from '@prisma/client';
import { cn, formatAmount, formatDateTime } from '@/lib/utils';
import { Input } from './ui/input';
import GenerateReceipt from './GenerateReceipts';

export default function TableRowDialog({
	transaction,
}: {
	transaction: Transactions;
}) {
	return (
		<Dialog key={transaction.id}>
			<DialogTrigger asChild>
				<TableRow>
					<TableCell className='font-medium flex items-center gap-3'>
						<div className='hidden md:block size-7 overflow-hidden rounded-full border'>
							{transaction.receiverBank == 'stanbic' ? (
								<img
									src='https://asset.brandfetch.io/idjnraASLO/id1JqUmo9j.jpeg'
									className='w-full h-full object-contain aspect-square'
								/>
							) : transaction.receiverBank == 'gt' ? (
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/GTBank_logo.svg/768px-GTBank_logo.svg.png'
									className='w-full h-full object-contain aspect-square'
								/>
							) : (
								<img
									src='https://upload.wikimedia.org/wikipedia/en/6/62/First_Bank_of_Nigeria_logo.png'
									className='w-full h-full object-contain aspect-square'
								/>
							)}
						</div>
						{transaction.type == 'credit'
							? `${transaction.senderName}`
							: `${transaction.receiverName}`}
					</TableCell>
					<TableCell>{formatAmount(transaction.amount)}</TableCell>
					<TableCell>
						<span
							className={cn(
								'font-semibold  w-auto p-1 rounded-2xl',
								transaction.type == 'credit'
									? 'bg-green-100 text-green-800'
									: 'bg-red-100 text-red-800'
							)}
						>
							{transaction.type}
						</span>
					</TableCell>
					<TableCell>
						{formatDateTime(Number(transaction.date)).dateTime}
					</TableCell>
				</TableRow>
			</DialogTrigger>
			<DialogContent className='h-3/4 overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Transaction Details</DialogTitle>
					<div className='grid divide-y-2'>
						<div className='grid grid-cols-2 py-3 items-center'>
							<p>Transaction ID:</p>
							<p>{transaction.id}</p>
						</div>
						<div className='grid grid-cols-2 py-3 items-center'>
							<p>Transaction Type:</p>

							<p>{transaction.type}</p>
						</div>
						<div className='grid grid-cols-2 py-3 items-center '>
							<p>Amount:</p>
							<p>{formatAmount(transaction.amount)}</p>
						</div>
						<div className='grid grid-cols-2 py-3 items-center'>
							<p>
								{transaction.type == 'credit' ? 'Sender ' : 'Receiver '}Name:
							</p>
							<p>
								{transaction.type == 'credit'
									? `${transaction.senderName}`
									: `${transaction.receiverName}`}
							</p>
						</div>
						<div className='grid grid-cols-2 py-3 items-center '>
							<p>Narration:</p>
							<p>{transaction.narration}</p>
						</div>
						<div className='grid grid-cols-2 py-3 items-center'>
							<p>Sender Account:</p>
							<p>{transaction.senderAccount}</p>
						</div>
						<div className='grid grid-cols-2 py-3 items-center'>
							<p>Sender Bank:</p>
							<p>
								{transaction.senderBank == 'stanbic'
									? 'Stanbic Bank'
									: transaction.senderBank == 'gt'
									? 'GT Bank'
									: 'First Bank'}
							</p>
						</div>

						<div className='grid grid-cols-2 py-3 items-center'>
							<p>Receiver Account:</p>
							<p>{transaction.receiverAccount}</p>
						</div>
						<div className='grid grid-cols-2 py-3 items-center '>
							<p>Receiver Bank:</p>
							<p>
								{transaction.receiverBank == 'stanbic'
									? 'Stanbic Bank'
									: transaction.receiverBank == 'gt'
									? 'GT Bank'
									: 'First Bank'}
							</p>
						</div>
						<div className='grid grid-cols-2 py-3 items-center '>
							<p>Date:</p>
							<p>{formatDateTime(Number(transaction.date)).dateTime}</p>
						</div>
					</div>
				</DialogHeader>
				<GenerateReceipt transaction={transaction} />
			</DialogContent>
		</Dialog>
	);
}
