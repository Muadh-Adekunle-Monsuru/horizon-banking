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
							<Input
								className='disabled:text-gray-800'
								disabled
								value={transaction.id}
							/>
						</div>
						<div className='grid grid-cols-2 py-3 items-center'>
							<p>Transaction Type:</p>
							<Input
								className='disabled:text-gray-800'
								disabled
								value={transaction.type}
							/>
						</div>
						<div className='grid grid-cols-2 py-3 items-center '>
							<p>Amount:</p>
							<Input
								className='disabled:text-gray-900'
								disabled
								value={formatAmount(transaction.amount)}
							/>
						</div>
						<div className='grid grid-cols-2 py-3 items-center'>
							<p>
								{transaction.type == 'credit' ? 'Sender ' : 'Receiver '}Name:
							</p>
							<Input
								className='disabled:text-gray-900'
								disabled
								value={
									transaction.type == 'credit'
										? `${transaction.senderName}`
										: `${transaction.receiverName}`
								}
							/>
						</div>
						<div className='grid grid-cols-2 py-3 items-center '>
							<p>Narration:</p>
							<Input
								className='disabled:text-gray-900'
								disabled
								value={transaction.narration}
							/>
						</div>
						<div className='grid grid-cols-2 py-3 items-center'>
							<p>Sender Account:</p>
							<Input
								className='disabled:text-gray-800'
								disabled
								value={transaction.senderAccount}
							/>
						</div>
						<div className='grid grid-cols-2 py-3 items-center'>
							<p>Sender Bank:</p>
							<Input
								className='disabled:text-gray-900'
								disabled
								value={
									transaction.senderBank == 'stanbic'
										? 'Stanbic Bank'
										: transaction.senderBank == 'gt'
										? 'GT Bank'
										: 'First Bank'
								}
							/>
						</div>

						<div className='grid grid-cols-2 py-3 items-center'>
							<p>Receiver Account:</p>
							<Input
								className='disabled:text-gray-900'
								disabled
								value={transaction.receiverAccount}
							/>
						</div>
						<div className='grid grid-cols-2 py-3 items-center '>
							<p>Receiver Bank:</p>
							<Input
								className='disabled:text-gray-900'
								disabled
								value={
									transaction.receiverBank == 'stanbic'
										? 'Stanbic Bank'
										: transaction.receiverBank == 'gt'
										? 'GT Bank'
										: 'First Bank'
								}
							/>
						</div>
						<div className='grid grid-cols-2 py-3 items-center '>
							<p>Date:</p>
							<Input
								className='disabled:text-gray-900'
								disabled
								value={formatDateTime(Number(transaction.date)).dateTime}
							/>
						</div>
					</div>
				</DialogHeader>
				<GenerateReceipt transaction={transaction} />
			</DialogContent>
		</Dialog>
	);
}
