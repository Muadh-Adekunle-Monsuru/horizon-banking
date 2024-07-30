/* eslint-disable no-prototype-builtins */
import { AccountTypes, CategoryCount, Transaction } from '@/types';
import { Banks } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import qs from 'query-string';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
function formatTimestamp(timestampString) {
	// Convert the string to a number
	const timestamp = parseInt(timestampString, 10);

	// Create a Date object from the timestamp
	const date = new Date(timestamp);

	// Options for formatting the date
	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};

	// Format the date to the required format
	const formattedDate = date.toLocaleDateString('en-GB', options);

	// Get the day part and add the correct ordinal suffix
	const day = date.getDate();
	const suffix =
		day % 10 === 1 && day !== 11
			? 'st'
			: day % 10 === 2 && day !== 12
			? 'nd'
			: day % 10 === 3 && day !== 13
			? 'rd'
			: 'th';

	// Combine the formatted date with the ordinal suffix
	return formattedDate.replace(/(\d{1,2})/, `$1${suffix}`);
}
// FORMAT DATE TIME
export const formatDateTime = (dateString: any) => {
	const dateTimeOptions: Intl.DateTimeFormatOptions = {
		weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
		month: 'short', // abbreviated month name (e.g., 'Oct')
		day: 'numeric', // numeric day of the month (e.g., '25')
		hour: 'numeric', // numeric hour (e.g., '8')
		minute: 'numeric', // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};

	const dateDayOptions: Intl.DateTimeFormatOptions = {
		weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
		year: 'numeric', // numeric year (e.g., '2023')
		month: '2-digit', // abbreviated month name (e.g., 'Oct')
		day: '2-digit', // numeric day of the month (e.g., '25')
	};

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: 'short', // abbreviated month name (e.g., 'Oct')
		year: 'numeric', // numeric year (e.g., '2023')
		day: 'numeric', // numeric day of the month (e.g., '25')
	};

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: 'numeric', // numeric hour (e.g., '8')
		minute: 'numeric', // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};

	const formattedDateTime: string = new Date(dateString).toLocaleString(
		'en-US',
		dateTimeOptions
	);

	const formattedDateDay: string = new Date(dateString).toLocaleString(
		'en-US',
		dateDayOptions
	);

	const formattedDate: string = new Date(dateString).toLocaleString(
		'en-US',
		dateOptions
	);

	const formattedTime: string = new Date(dateString).toLocaleString(
		'en-US',
		timeOptions
	);

	return {
		dateTime: formattedDateTime,
		dateDay: formattedDateDay,
		dateOnly: formattedDate,
		timeOnly: formattedTime,
	};
};

export function formatAmount(amount: number): string {
	const formatter = new Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
		minimumFractionDigits: 2,
	});

	return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
	return value.replace(/[^\w\s]/gi, '');
};

interface UrlQueryParams {
	params: string;
	key: string;
	value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
}

export function getAccountTypeColors(type: AccountTypes) {
	switch (type) {
		case 'depository':
			return {
				bg: 'bg-blue-25',
				lightBg: 'bg-blue-100',
				title: 'text-blue-900',
				subText: 'text-blue-700',
			};

		case 'credit':
			return {
				bg: 'bg-success-25',
				lightBg: 'bg-success-100',
				title: 'text-success-900',
				subText: 'text-success-700',
			};

		default:
			return {
				bg: 'bg-green-25',
				lightBg: 'bg-green-100',
				title: 'text-green-900',
				subText: 'text-green-700',
			};
	}
}

export function countTransactionCategories(
	transactions: Transaction[]
): CategoryCount[] {
	const categoryCounts: { [category: string]: number } = {};
	let totalCount = 0;

	// Iterate over each transaction
	transactions &&
		transactions.forEach((transaction) => {
			// Extract the category from the transaction
			const category = transaction.category;

			// If the category exists in the categoryCounts object, increment its count
			if (categoryCounts.hasOwnProperty(category)) {
				categoryCounts[category]++;
			} else {
				// Otherwise, initialize the count to 1
				categoryCounts[category] = 1;
			}

			// Increment total count
			totalCount++;
		});

	// Convert the categoryCounts object to an array of objects
	const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
		(category) => ({
			name: category,
			count: categoryCounts[category],
			totalCount,
		})
	);

	// Sort the aggregatedCategories array by count in descending order
	aggregatedCategories.sort((a, b) => b.count - a.count);

	return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
	// Split the URL string by '/'
	const parts = url.split('/');

	// Extract the last part, which represents the customer ID
	const customerId = parts[parts.length - 1];

	return customerId;
}

export function encryptId(id: string) {
	return btoa(id);
}

export function decryptId(id: string) {
	return atob(id);
}

export const getTransactionStatus = (date: Date) => {
	const today = new Date();
	const twoDaysAgo = new Date(today);
	twoDaysAgo.setDate(today.getDate() - 2);

	return date > twoDaysAgo ? 'Processing' : 'Success';
};

export const authFormSchema = (type: string) =>
	z.object({
		// sign up
		firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
		lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
		email: z.string().email(),
		password: z.string().min(5),
	});

export const getTotalBalance = (banks: Banks[]) => {
	const total = banks.reduce((prev, currValue) => {
		return prev + currValue.balance;
	}, 0);
	return total;
};
