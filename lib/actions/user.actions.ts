'use server';

import { cookies } from 'next/headers';
import { createAdminClient, createSessionClient } from '../appwrite';
import { ID, Query } from 'node-appwrite';
import { encryptId, extractCustomerIdFromUrl, parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';
import prisma from '@/prisma/client';
import { signInProps, SignUpParams } from '@/types';
import { v4 as uuidv4 } from 'uuid';

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
			accountNumber: uuidv4(),
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
