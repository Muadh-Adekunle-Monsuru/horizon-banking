'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { signIn, signUp } from '@/lib/actions/user.actions';
import { authFormSchema } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomInput from './CustomInput';

export default function AuthForm({ type }: { type: string }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const formSchema = authFormSchema(type);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);

		try {
			if (type === 'sign-up') {
				const userData = {
					firstName: values.firstName!,
					lastName: values.lastName!,
					email: values.email,
					password: values.password,
				};
				const newUser = await signUp(userData);
				setUser(newUser);
				if (newUser) router.push('/');
			}
			if (type === 'sign-in') {
				const signInVal = {
					email: values.email!,
					password: values.password!,
				};
				const response = await signIn(signInVal);
				if (response) router.push('/');
			}
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
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
					<h1 className='text-26 font-ibmPlex font-bold text-black-1 dark:text-blue-600'>
						Horizon
					</h1>
				</Link>
				<div className='flex flex-col gap-1 md:gap-3'>
					<h1 className='text-24 lg:text-36 font-semibold text-gray-900  dark:text-blue-700'>
						{user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
						<p className='text-16 font-normal text-gray-600'>
							{user
								? 'Link your account to get started'
								: 'Please enter your details'}
						</p>
					</h1>
				</div>
			</header>

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
		</section>
	);
}
