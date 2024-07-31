export const dynamic = 'force-dynamic';
import { Separator } from '@/components/ui/separator';
import TransferForm from '@/components/ui/TransferForm';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import prisma from '@/prisma/client';

export default async function PaymentTransferPage() {
	const loggedInUser = await getLoggedInUser();

	const user = await prisma.user.findUnique({
		where: { id: loggedInUser.$id },
	});
	return (
		<div className='h-full overflow-y-auto w-full p-5'>
			<div>
				<h1 className='text-2xl font-semibold'>Payment Transfer</h1>
				<p className='text-sm text-gray-500 w-3/4'>
					Please provide any specific details or notes related to the payment
					transer.
				</p>
			</div>
			<div className='py-5 pt-10 hidden md:block'>
				<h2 className='text-lg font-semibold'>Transfer details</h2>
				<p className='text-sm text-gray-500'>
					Enter the details of the transaction
				</p>
			</div>
			<div className='py-4'>
				<Separator />
			</div>
			<TransferForm user={user} />
		</div>
	);
}
