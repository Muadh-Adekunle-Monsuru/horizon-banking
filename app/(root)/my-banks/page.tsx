import AddBankDialog from '@/components/AddBankDialog';
import BankCardDialog from '@/components/BankCardDialog';
import BankCard from '@/components/ui/BankCard';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import prisma from '@/prisma/client';
import React from 'react';

export default async function MyBanksPage() {
	const loggedInUser = await getLoggedInUser();

	const user = await prisma.user.findUnique({
		where: { id: loggedInUser.$id },
	});
	return (
		<div className='h-full w-full p-5 overflow-y-auto'>
			<div>
				<h1 className='text-2xl font-semibold'>My Bank Accounts</h1>
				<p className='text-sm text-gray-500'>
					Effortlessly Manage Your Banking Activities
				</p>
			</div>
			<div className='py-5'>
				<AddBankDialog userId={user.id} />
			</div>
			<div className='py-5'>
				<h2 className='font-semibold '>Your Cards</h2>
				<div className='py-4 font-light text-gray-700'>
					{user.Banks.length > 0 ? (
						<>
							<div className='flex flex-wrap gap-4 justify-center md:justify-normal'>
								{user.Banks.map((bank) => (
									<div key={bank.accountNumber}>
										<BankCardDialog
											account={bank}
											userName={`${user.firstName} ${user.lastName}`}
											showBalance={true}
										/>
									</div>
								))}
							</div>
						</>
					) : (
						'No card is linked with this account. Create a new bank account. '
					)}
				</div>
			</div>
		</div>
	);
}
