import React from 'react';

export default function HeaderText({
	subtext,
	title,
	type,
	user,
}: HeaderBoxProps) {
	return (
		<div className='header-box dark:text-white'>
			<h1 className='header-box-title dark:text-white'>
				{title}
				{type === 'greeting' && (
					<span className='text-bankGradient '>&nbsp;{user}</span>
				)}
			</h1>
			<p className='header-box-subtext dark:text-gray-300'>{subtext}</p>
		</div>
	);
}
