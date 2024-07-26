'use client';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Sidebar({ user }: SiderbarProps) {
	const pathname = usePathname();
	return (
		<section className='sidebar'>
			<nav className='flex flex-col gap-4'>
				<Link
					href={'/'}
					className='mb-12 cursor-pointer items-center gap-2 flex'
				>
					<Image
						src='/icons/logo.svg'
						width={34}
						height={34}
						alt='horizon logo'
						className='size-[24px] max-xl:size-14'
					/>
					<h1 className='sidebar-logo'>Horizon</h1>
				</Link>
				{sidebarLinks.map((item) => {
					const isActive =
						pathname === item.route || pathname.startsWith(`${item.route}`);
					return (
						<Link
							href={item.route}
							key={item.route}
							className={cn('sidebar-link', isActive && 'bg-bank-gradient')}
						>
							<div className='relative size-6 text-xs'>
								<Image
									src={item.imgURL}
									alt='item-label'
									fill
									className={cn(isActive && 'brightness-[3] invert-0')}
								/>
							</div>
							<p className={cn('sidebar-label', isActive && '!text-white')}>
								{item.label}
							</p>
						</Link>
					);
				})}
				USER
			</nav>
			Footer
		</section>
	);
}
