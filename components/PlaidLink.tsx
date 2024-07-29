'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
	PlaidLinkOnSuccess,
	PlaidLinkOptions,
	usePlaidLink,
} from 'react-plaid-link';
import { StyledString } from 'next/dist/build/swc';
import { useRouter } from 'next/navigation';
import {
	createLinkToken,
	exchangePublicToken,
} from '@/lib/actions/user.actions';

export default function PlaidLink({ user, variant }: PlaidLinkProps) {
	const [token, setToken] = useState('');
	const router = useRouter();

	useEffect(() => {
		const getLinkToken = async () => {
			const data = await createLinkToken(user);
			setToken(data?.linkToken);
		};

		getLinkToken();
	}, [user]);

	const onSuccess = useCallback<PlaidLinkOnSuccess>(
		async (public_token: string) => {
			await exchangePublicToken({
				publicToken: public_token,
				user,
			});

			router.push('/');
		},
		[user]
	);

	const config: PlaidLinkOptions = {
		token,
		onSuccess,
	};

	const { open, ready } = usePlaidLink(config);

	return (
		<div>
			{variant == 'primary' ? (
				<Button
					className='plaidlink-primary'
					onClick={() => open}
					disabled={!ready}
				>
					Connect bank
				</Button>
			) : variant === 'ghost' ? (
				<Button>Connect Bank</Button>
			) : (
				<Button>Connect bank</Button>
			)}
		</div>
	);
}
