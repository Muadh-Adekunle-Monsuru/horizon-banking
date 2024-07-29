import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import BankCard from './BankCard';

export default function RightSidebar({
	banks,
	transactions,
	user,
}: RightSidebarProps) {
	return (
		<aside className='right-sidebar dark:border-gray-700'>
			<section className='flex flex-col pb-8'>
				<div className='profile-banner' />
				<div className='profile'>
					<div className='profile-img'>
						<span className='text-5xl font-bold text-blue-900 dark:text-blue-700'>
							{user?.firstName[0]}
						</span>
					</div>
					<div className='profile-details'>
						<h1 className='profile-name dark:text-white'>
							{user?.firstName} {user?.lastName}
						</h1>
						<p className='profile-email dark:text-gray-300'>{user?.email}</p>
					</div>
				</div>
			</section>
			<section className='banks'>
				<div className='flex w-full justify-between'>
					<h2 className='header-2 dark:text-white'>My Banks</h2>
					<Link href='/' className='flex gap-2 items-center'>
						<Plus className='size-6' />
						<p className='text-14 font-semibold text-gray-600 dark:text-gray-300 '>
							Add Bank
						</p>
					</Link>
				</div>
				{banks?.length > 0 && (
					<div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
						<div className='relative z-10'>
							<BankCard
								key={banks[0].$id}
								account={banks[0]}
								userName={`${user?.firstName}`}
								showBalance={false}
							/>
						</div>
						{banks[1] && (
							<div className='absolute right-0 top-8 z-0 w-[90%]'>
								<BankCard
									key={banks[1]?.$id}
									account={banks[1]}
									userName={`${user?.firstName} ${user?.lastName}`}
									showBalance={false}
								/>
							</div>
						)}
					</div>
				)}
			</section>
		</aside>
	);
}
