'use client';
import { DoughnutChartProps } from '@/types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ accounts }: DoughnutChartProps) {
	const balances = accounts.map((item) => item.balance);
	const bankNames = accounts.map((item) => item.name);
	const data = {
		datasets: [
			{
				label: 'Balance',
				data: balances,
				backgroundColor: ['#495057', '#343a40', '#212529'],
			},
		],
		labels: bankNames,
	};
	return (
		<Doughnut
			data={data}
			options={{
				cutout: '60%',
				plugins: {
					legend: {
						display: false,
					},
				},
			}}
		/>
	);
}
