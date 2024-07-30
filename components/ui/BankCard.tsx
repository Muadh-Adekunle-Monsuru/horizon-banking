import { cn, formatAmount } from '@/lib/utils';
import { CreditCardProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function BankCard({
	account,
	userName,
	showBalance = true,
}: CreditCardProps) {
	return (
		<div className='flex flex-col mx-auto'>
			<div className='bank-card cursor-pointer'>
				<div
					className={cn(
						'bank-card_content ',
						account.name == 'stanbic' && 'bg-bank-gradient',
						account.name == 'gt' &&
							'bg-gradient-to-bl from-orange-300 to-orange-600',
						account.name == 'first' &&
							'bg-gradient-to-bl from-yellow-500 to-yellow-900'
					)}
				>
					<div>
						<h1 className='text-16 font-semibold text-white'>
							{account.name == 'stanbic'
								? 'Stanbic Bank'
								: account.name == 'gt'
								? 'GT Bank'
								: 'First Bank'}
						</h1>
						<p className='font-ibmPlex font-black text-white'>
							{formatAmount(account.balance)}
						</p>
					</div>
					<article className='flex flex-col gap-2'>
						<div className='flex justify-between'>
							<h1 className='text-12 font-semibold text-white'>{userName}</h1>
							<h2 className='text-12 font-semibold text-white'>●● / ●●</h2>
						</div>
						<p className='text-14 font-semibold tracking-[1.1px] text-white text-nowrap max-w-1/2 overflow-hidden'>
							<span className='text-xs truncate ml-1'>
								{account.accountNumber || '●●●● ●●●● ●●●●'}
							</span>
						</p>
					</article>
				</div>
				<div
					className={cn(
						'bank-card_icon',
						account.name == 'stanbic' && 'bg-bank-gradient',
						account.name == 'gt' &&
							'bg-gradient-to-bl from-orange-300 to-orange-600',
						account.name == 'first' &&
							'bg-gradient-to-bl from-yellow-500 to-yellow-900'
					)}
				>
					<Image src={'/icons/Paypass.svg'} width={20} height={24} alt='icon' />
					<Image
						src={'/icons/mastercard.svg'}
						width={45}
						height={32}
						alt='mastercard'
						className='ml-5'
					/>
				</div>
				<Image
					src={'/icons/lines.png'}
					width={316}
					height={190}
					alt='lines'
					className='absolute top-0 left-0'
				/>
				{/* copy */}
			</div>
		</div>
	);
}
