'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';

export default function AuthForm({ type }: { type: string }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const formSchema = authFormSchema(type);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		console.log(values);
		setLoading(false);
	}
	return (
		<section className='auth-form'>
			<header className='flex flex-col gap-5 md:gap-8'>
				<Link
					href={'/'}
					className='mb-1 cursor-pointer items-center gap-1  flex'
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
				<div className='flex flex-col gap-1 md:gap-3'>
					<h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
						{user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
						<p className='text-16 font-normal text-gray-600'>
							{user
								? 'Link your account to get started'
								: 'Please enter your details'}
						</p>
					</h1>
				</div>
			</header>
			{user ? (
				<div className='flex flex-col gap-4'></div>
			) : (
				<>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							{type === 'sign-up' && (
								<>
									<div className='flex gap-4'>
										<CustomInput
											control={form.control}
											label='First Name'
											name='firstName'
											placeholder='First Name'
										/>
										<CustomInput
											control={form.control}
											label='Last Name'
											name='lastName'
											placeholder='Last Name'
										/>
									</div>
									<CustomInput
										control={form.control}
										label='Address'
										name='address1'
										placeholder='Address... '
									/>
									<div className='flex gap-4'>
										<CustomInput
											control={form.control}
											label='Postal Code'
											name='postalCode'
											placeholder='Postal Code'
										/>
										<CustomInput
											control={form.control}
											label='State'
											name='state'
											placeholder='Enter your state'
										/>
									</div>
									<div className='flex gap-4'>
										<CustomInput
											control={form.control}
											label='Date of Birth'
											name='dateOfBirth'
											placeholder='Date of Birth'
										/>
										<CustomInput
											control={form.control}
											label='SSN'
											name='ssn'
											placeholder='E.g.: 1213'
										/>
									</div>
								</>
							)}

							<CustomInput
								control={form.control}
								label='Email'
								name='email'
								placeholder='Enter your email'
							/>
							<CustomInput
								control={form.control}
								label='Password'
								name='password'
								placeholder='Enter your password'
							/>

							<Button type='submit' disabled={loading} className='w-full'>
								{loading ? (
									<>
										<Loader2 className='size-4 animate-spin mr-1' /> Loading...
									</>
								) : type == 'sign-in' ? (
									'Sign In'
								) : (
									'Sign Up'
								)}
							</Button>
						</form>
					</Form>
					<footer className='flex justify-center gap-1'>
						<p className='text-14 font-normal text-gray-600'>
							{type === 'sign-in'
								? "Don't have an account?"
								: 'Already have an account?'}
						</p>
						<Link
							className='form-link'
							href={type == 'sign-in' ? '/sign-up' : '/sign-in'}
						>
							{type == 'sign-in' ? 'Sign up' : 'Sign in'}
						</Link>
					</footer>
				</>
			)}
		</section>
	);
}
