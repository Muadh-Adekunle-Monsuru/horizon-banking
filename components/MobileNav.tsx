'use client';
import React from 'react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
export default function MobileNav({ user }: MobileNavProps) {
	const pathname = usePathname();
	return (
		<section className='w-full max-w-[264px]'>
			<Sheet>
				<SheetTrigger>
					<Menu className='w-6' />
				</SheetTrigger>
				<SheetContent>
					<Link
						href={'/'}
						className='mb-1 cursor-pointer items-center gap-1 px-4 flex'
					>
						<Image
							src='/icons/logo.svg'
							width={34}
							height={34}
							alt='horizon logo'
						/>
						<h1 className='text-26 font-ibmPlex font-bold text-black-1'>
							Horizon
						</h1>
					</Link>
					<div className='mobilenav-sheet'>
						<SheetClose asChild>
							<nav className='flex h-full flex-col gap-6 pt-16 text-white'>
								{sidebarLinks.map((item) => {
									const isActive =
										pathname === item.route ||
										pathname.startsWith(`${item.route}`);
									return (
										<SheetClose asChild key={item.route}>
											<Link
												href={item.route}
												key={item.route}
												className={cn(
													'mobilenav-sheet_close',
													isActive && 'bg-bank-gradient'
												)}
											>
												<Image
													src={item.imgURL}
													alt='item-label'
													width={20}
													height={20}
													className={cn(isActive && 'brightness-[3] invert-0')}
												/>
												<p
													className={cn(
														'text-16 font-semibold text-black-2',
														isActive && '!text-white'
													)}
												>
													{item.label}
												</p>
											</Link>
										</SheetClose>
									);
								})}
								USER
							</nav>
						</SheetClose>
						Footer
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
}
