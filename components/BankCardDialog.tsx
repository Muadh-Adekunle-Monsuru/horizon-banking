import React from 'react';
import BankCard from './ui/BankCard';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { CreditCardProps } from '@/types';
import { formatAmount } from '@/lib/utils';

export default function BankCardDialog({
	account,
	userName,
	showBalance = true,
}: CreditCardProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<BankCard account={account} userName={userName} showBalance={true} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Card Details</DialogTitle>
					<BankCard account={account} userName={userName} showBalance={true} />
				</DialogHeader>
				<div className='p-4'>
					<p>
						<span className='font-semibold'>Bank Name:</span>
						<span className='font-light text-gray-700 ml-2'>
							{account.name == 'stanbic'
								? 'Stanbic Bank'
								: account.name == 'gt'
								? 'GT Bank'
								: 'First Bank'}
						</span>
					</p>
					<p>
						<span className='font-semibold'>Account Number:</span>
						<span className='font-light text-gray-700 ml-2'>
							{account.accountNumber}
						</span>
					</p>
					<p>
						<span className='font-semibold'>Account Balance:</span>{' '}
						<span className='font-light text-gray-700 ml-2'>
							{formatAmount(account.balance)}
						</span>
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
