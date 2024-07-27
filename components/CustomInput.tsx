import React from 'react';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Control, FieldPath, Form } from 'react-hook-form';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';
const formSchema = authFormSchema('sign-up');
interface Props {
	control: Control<z.infer<typeof formSchema>>;
	name: FieldPath<z.infer<typeof formSchema>>;
	label: string;
	placeholder: string;
}
export default function CustomInput({
	control,
	name,
	label,
	placeholder,
}: Props) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							type={name === 'password' ? 'password' : 'text'}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
