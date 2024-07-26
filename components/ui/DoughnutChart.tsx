'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ accounts }: DoughnutChartProps) {
	const data = {
		datasets: [
			{
				label: 'Banks',
				data: [12443, 12434, 5344],
				backgroundColor: ['#495057', '#343a40', '#212529'],
			},
		],
		labels: ['Bank 1', 'Bank 2', 'Bank 3'],
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
