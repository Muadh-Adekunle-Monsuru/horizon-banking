'use client';
import React, { useState } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createBank } from '@/lib/actions/user.actions';

export default function AddBankDialog({ userId }: { userId: string }) {
	const [bank, setBank] = useState('');
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const handleSubmit = async () => {
		if (!bank) {
			setOpen(false);
			return null;
		}
		const newBank = await createBank(userId, bank);
		setOpen(false);
	};
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>
						Add Bank
						<Plus className='size-4' />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Bank Account</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						Select a bank, an account will be created with the starting balance
						of N15,000.00
					</DialogDescription>
					<form>
						<div>
							<Label>Select Bank</Label>
							<RadioGroup
								defaultValue='option-one'
								className='flex justify-between'
								onValueChange={(e) => setBank(e)}
							>
								<div className='flex flex-col items-center space-y-2'>
									<RadioGroupItem value='stanbic' id='option-one' />
									<Label
										htmlFor='option-one'
										className='flex flex-col items-center border py-4 rounded-lg px-1 gap-1 cursor-pointer'
									>
										<img
											src='https://asset.brandfetch.io/idjnraASLO/id1JqUmo9j.jpeg'
											className='size-10 aspect-square'
										/>
										<p>Stanbic Bank</p>
									</Label>
								</div>
								<div className='flex flex-col items-center space-y-2'>
									<RadioGroupItem value='gt' id='option-two' />
									<Label
										htmlFor='option-two'
										className='flex flex-col items-center border py-4 rounded-lg  px-3 gap-1 cursor-pointer'
									>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/GTBank_logo.svg/768px-GTBank_logo.svg.png'
											className='size-10 aspect-square'
										/>
										<p>GT Bank</p>
									</Label>
								</div>
								<div className='flex flex-col items-center space-y-2'>
									<RadioGroupItem value='first' id='option-three' />
									<Label
										htmlFor='option-three'
										className='flex flex-col items-center border py-4 rounded-lg  px-3 gap-1 cursor-pointer'
									>
										<img
											src='https://upload.wikimedia.org/wikipedia/en/6/62/First_Bank_of_Nigeria_logo.png'
											className='size-10 aspect-square'
										/>
										<p>First Bank</p>
									</Label>
								</div>
							</RadioGroup>
						</div>
						<Button onClick={handleSubmit} className='my-4'>
							Submit
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}