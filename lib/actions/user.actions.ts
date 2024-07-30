'use server';

import { cookies } from 'next/headers';
import { createAdminClient, createSessionClient } from '../appwrite';
import { ID, Query } from 'node-appwrite';
import { encryptId, extractCustomerIdFromUrl, parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';
import prisma from '@/prisma/client';
import { signInProps, SignUpParams } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { Transactions } from '@prisma/client';
import { toast } from 'sonner';

const {
	APPWRITE_DATABASE_ID: DATABASE_ID,
	APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
	APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const signIn = async (userData: signInProps) => {
	try {
		const { account } = await createAdminClient();

		const session = await account.createEmailPasswordSession(
			userData.email,
			userData.password
		);

		cookies().set('appwrite-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});

		return parseStringify(session);
	} catch (e) {
		console.error('Error', e);
	}
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
	try {
		const { account, database } = await createAdminClient();
		const userDb = await prisma.user.create({
			data: {
				email: userData.email,
				firstName: userData.firstName,
				lastName: userData.lastName,
				Banks: [],
			},
		});
		const newUserAccount = await account.create(
			userDb.id,
			userData.email,
			password,
			`${userData.firstName} ${userData.lastName}`
		);
		if (!newUserAccount) throw new Error('Error createing user');

		const session = await account.createEmailPasswordSession(
			userData.email,
			password
		);

		cookies().set('appwrite-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});

		return parseStringify(session);
	} catch (e) {
		console.error('Error', e);
	}
};
// ... your initilization functions

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		const result = await account.get();

		return parseStringify(result);
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const logoutAccount = async () => {
	try {
		const { account } = await createSessionClient();
		cookies().delete('appwrite-session');

		await account.deleteSession('current');
	} catch (e) {
		return null;
	}
};

export const createBank = async (userId: string, bank: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { Banks: true },
		});

		if (!user) {
			throw new Error('User not found');
		}

		const newBank = {
			name: bank,
			balance: 15000,
			accountNumber: nanoid(10),
			transactions: [],
		};

		const updatedBanks = [...user.Banks, newBank];

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: { Banks: updatedBanks },
		});

		return updatedUser;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const getReceipientAccount = async (email: string) => {
	const user = await prisma.user.findFirst({
		where: { email: email },
	});
	return user;
};

// export const createTransaction = async (
// 	data: Transactions,
// 	senderId: string
// ) => {
// 	// console.log(data);
// 	//update sender account to subtract ammount
// 	const senderAccount = await prisma.user.findFirst({
// 		where: { email: data.senderEmail },
// 	});

// 	const senderBank = senderAccount.Banks.find(
// 		(bank) => bank.accountNumber == data.senderAccount
// 	);

// 	const senderOtherBanks = senderAccount.Banks.filter(
// 		(bank) => bank.accountNumber !== data.senderAccount
// 	);
// 	const newSenderBalace = Number(senderBank.balance) - Number(data.amount);

// 	const updatedTransaction = [...senderBank.transactions, data];

// 	const updatedBank = {
// 		...senderBank,
// 		balance: newSenderBalace,
// 		transactions: updatedTransaction,
// 	};

// 	const updatedBankList = [...senderOtherBanks, updatedBank];

// 	const updatedSenderAccount = await prisma.user.update({
// 		where: { id: senderId },
// 		data: { Banks: updatedBankList },
// 	});
// 	//update sender account transaction to inculde type=debit
// 	//update receiver account with ammount
// 	//update receiver bank tranactions with type-credit
// };
const updateSender = async (data: Transactions) => {
	data.type = 'debit';
	const senderAccount = await prisma.user.findFirst({
		where: { email: data.senderEmail },
		include: { Banks: true }, // Ensure Banks are included in the query
	});

	if (!senderAccount) {
		throw new Error('Sender account not found');
	}

	const senderBank = senderAccount.Banks.find(
		(bank) => bank.accountNumber === data.senderAccount
	);

	if (!senderBank) {
		throw new Error('Sender bank not found');
	}

	if (data.amount > senderBank.balance) {
		throw new Error('Insufficient Fund');
	}
	// Calculate the new sender balance
	const newSenderBalance = Number(senderBank.balance) - Number(data.amount);

	// Add the new transaction to the sender's bank transactions
	const updatedTransactions = [...senderBank.transactions, data];

	// Update the sender's bank details
	const updatedBank = {
		...senderBank,
		balance: newSenderBalance,
		transactions: updatedTransactions,
	};

	// Update the sender's bank list
	const updatedBankList = senderAccount.Banks.map((bank) =>
		bank.accountNumber === data.senderAccount ? updatedBank : bank
	);

	// Update the sender's account in the database
	const updatedSenderAccount = await prisma.user.update({
		where: { email: data.senderEmail },
		data: { Banks: { set: updatedBankList } }, // Use `set` to update the Banks list
	});

	return updatedSenderAccount;
};

const updateReceiver = async (data: Transactions) => {
	data.type = 'credit';
	const receiverAccount = await prisma.user.findFirst({
		where: { email: data.receiverEmail },
		include: { Banks: true }, // Ensure Banks are included in the query
	});

	if (!receiverAccount) {
		throw new Error('Receiver account not found');
	}

	const receiverBank = receiverAccount.Banks.find(
		(bank) => bank.accountNumber === data.receiverAccount
	);

	if (!receiverBank) {
		throw new Error('Receiver bank not found');
	}

	// Calculate the new receiver balance
	const newReceiverBalance = Number(receiverBank.balance) + Number(data.amount);

	// Add the new transaction to the receiver's bank transactions
	const updatedTransactions = [...receiverBank.transactions, data];

	// Update the sender's bank details
	const updatedBank = {
		...receiverBank,
		balance: newReceiverBalance,
		transactions: updatedTransactions,
	};

	// Update the sender's bank list
	const updatedBankList = receiverAccount.Banks.map((bank) =>
		bank.accountNumber === data.receiverAccount ? updatedBank : bank
	);

	// Update the sender's account in the database
	const updatedSenderAccount = await prisma.user.update({
		where: { email: data.receiverEmail },
		data: { Banks: { set: updatedBankList } }, // Use `set` to update the Banks list
	});

	return updatedSenderAccount;
};

export const createTransaction = async (
	data: Transactions,
	senderId: string
) => {
	try {
		await updateSender(data);
		await updateReceiver(data);
		return 'success';
	} catch (e) {
		console.log(e);
		return `${e}`;
	}
};
