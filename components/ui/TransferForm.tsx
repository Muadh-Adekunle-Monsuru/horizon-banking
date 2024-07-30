'use client';
import React, { useState } from 'react';
import { Label } from './label';
import { Textarea } from './textarea';
import { Input } from './input';
import { Button } from './button';
import {
	createTransaction,
	getReceipientAccount,
} from '@/lib/actions/user.actions';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const transactionSchema = z.object({
	id: z.string(),
	senderAccount: z.string(),
	senderBank: z.string(),
	receiverAccount: z.string(),
	receiverBank: z.string(),
	receiverName: z.string(),
	date: z.string(),
	amount: z.number().int(),
	type: z.string(),
	narration: z.string().optional(),
	receiverEmail: z.string().email(),
	senderEmail: z.string().email(),
	senderName: z.string(),
});
export default function TransferForm({ user }: { user: User }) {
	const [receipientName, setReceipientName] = useState('');
	const [receipientBanks, setReceipientBanks] = useState([]);
	const [email, setEmail] = useState('');
	const [sourceBank, setSourceBank] = useState('');
	const [narration, setNarration] = useState('');
	const [transferAmount, setTransferAmout] = useState('');
	const [receivingBank, setReceivingBank] = useState('');
	const [sending, setSending] = useState(false);
	const [error, setError] = useState('');

	const searchRecipient = async (value) => {
		const receipient = await getReceipientAccount(value);
		if (!receipient) {
			setReceipientName('');
			return;
		}

		setReceipientName(`${receipient.firstName} ${receipient.lastName}`);
		setReceipientBanks(receipient.Banks);
	};
	const scrollToError = () => {
		const element = document.getElementById('error');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSending(true);
		setError('');

		try {
			const transactionData = {
				id: uuidv4(),
				senderAccount: JSON.parse(sourceBank).accountNumber,
				senderBank: JSON.parse(sourceBank).name,
				receiverAccount: JSON.parse(receivingBank).accountNumber,
				receiverBank: JSON.parse(receivingBank).name,
				receiverName: receipientName,
				date: Date.now().toString(),
				amount: Number(transferAmount),
				type: '',
				narration: narration || 'No narrations',
				receiverEmail: email,
				senderEmail: user.email,
				senderName: `${user.firstName} ${user.lastName}`,
			};
			transactionSchema.parse(transactionData);
			let response = await createTransaction(transactionData, user.id);
			if (response == 'success') {
				toast.success('Transaction Succsessful');
			} else {
				toast.error('Transaction Failed, Try again!');
				setError('Transaction Failed');
				scrollToError();
			}
		} catch (e) {
			console.error('Validation failed', e.errors);
			setError('Invalid or Incomplete Transaction Details');
			scrollToError();
		} finally {
			setSending(false);
		}
	};
	return (
		<form className='lg:max-w-3xl'>
			<p className='font-semibold text-red-900' id='error'>
				{error}
			</p>

			<div className='flex flex-col gap-5 md:flex-row lg:gap-10 py-5'>
				<Label>
					<p className='text-lg'>Select Your Source Bank</p>
					<p className='text-gray-600 font-light text-sm hidden md:block'>
						Select the bank account you want to transfer from{' '}
					</p>
				</Label>
				<select
					className='p-2 border rounded-lg'
					onChange={(e) => {
						setSourceBank(e.target.value);
					}}
					value={sourceBank}
				>
					<option>Select Account</option>
					{user.Banks.map((bank) => (
						<option
							className='py-1 px-2 flex justify-between'
							key={bank.accountNumber}
							value={JSON.stringify(bank)}
						>
							{bank.name == 'stanbic'
								? 'Stanbic Bank'
								: bank.name == 'gt'
								? 'GT Bank'
								: 'First Bank'}
						</option>
					))}
				</select>
			</div>

			<div className='w-full border-t border-gray-200 mx-auto my-4' />

			<div className='flex flex-col gap-5  md:flex-row lg:gap-10 py-5'>
				<Label>
					<p className='text-lg'>Transfer Note (Optional)</p>
					<p className='text-gray-600 font-light text-sm hidden  md:block'>
						Please provide an additional information or instructions related to
						the transfer
					</p>
				</Label>
				<Textarea
					placeholder='Type your message here.'
					value={narration}
					onChange={(e) => setNarration(e.target.value)}
				/>
			</div>

			<div className='w-full border-t border-gray-200 mx-auto my-4' />

			<div className='flex flex-col gap-5  md:flex-row lg:gap-10 py-5'>
				<Label>
					<p className='text-lg'>Amount</p>
					<p className='text-gray-600 font-light text-sm hidden  md:block'>
						Amount of money to be transfered
					</p>
				</Label>
				<Input
					placeholder='1000'
					className='max-w-32'
					value={transferAmount}
					onChange={(e) => setTransferAmout(e.target.value)}
				/>
			</div>

			<div className='py-3 pt-10'>
				<h2 className='text-lg font-semibold'>Receipient details</h2>
				<p className='text-sm text-gray-500'>
					Enter the details of the transaction
				</p>
			</div>

			<div className='w-full border-t border-gray-200 mx-auto my-4' />
			<div className='flex flex-col gap-5  md:flex-row lg:gap-10 py-5'>
				<Label>
					<p className='text-lg'>Receipient Email Address</p>
					<p className='text-gray-600 font-light text-sm hidden md:block'>
						Email address of the receipient.
					</p>
				</Label>
				<Input
					placeholder='example@gmail.com'
					onChange={(e) => {
						setEmail(e.target.value);
						searchRecipient(e.target.value);
					}}
					value={email}
				/>
			</div>

			<div className='w-full border-t border-gray-200 mx-auto my-4' />

			<div className='flex flex-col  gap-5 md:flex-row lg:gap-10 py-5'>
				<Label>
					<p className='text-lg'>Receipient&apos;s Bank</p>
				</Label>
				<select
					className='p-2 border rounded-lg'
					disabled={!receipientBanks.length}
					value={receivingBank}
					onChange={(e) => setReceivingBank(e.target.value)}
				>
					<option>Select Bank</option>
					{receipientBanks.map((bank) => (
						<option
							className='py-1 px-2 flex justify-between'
							key={bank.accountNumber}
							value={JSON.stringify(bank)}
						>
							{bank.name == 'stanbic'
								? 'Stanbic Bank'
								: bank.name == 'gt'
								? 'GT Bank'
								: 'First Bank'}
						</option>
					))}
				</select>
			</div>

			<div className='w-full border-t border-gray-200 mx-auto my-4' />

			<div className='flex flex-col md:flex-row lg:gap-10 py-5 lg:items-center'>
				<Label>
					<p className='text-lg'>Receipient Name</p>
					<p className='text-gray-600 font-light text-sm hidden md:block w-1/2'>
						Name of the receipient associated with the account number provided.
						This can not be edited.
					</p>
				</Label>
				<p className='font-medium underline text-green-900 text-lg underline-offset-2'>
					{receipientName}
				</p>
			</div>
			<Button className='my-5 mb-20' onClick={handleSubmit} disabled={sending}>
				{sending ? (
					<>
						<Loader className='size-4 animate-spin' />
						Processing...
					</>
				) : (
					'Transfer Fund'
				)}
			</Button>
		</form>
	);
}
