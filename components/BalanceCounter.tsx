'use client';

import React from 'react';
import CountUp from 'react-countup';

export default function BalanceCounter({ amount }: { amount: number }) {
	return (
		<div className='total-balance-amount flex-center gap-2'>
			<CountUp end={amount} decimals={2} duration={0.55} prefix='$' />
		</div>
	);
}
