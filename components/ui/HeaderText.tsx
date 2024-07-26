import React from 'react';

export default function HeaderText({
	subtext,
	title,
	type,
	user,
}: HeaderBoxProps) {
	return (
		<div className='header-box'>
			<h1 className='header-box-title'>
				{title}
				{type === 'greeting' && (
					<span className='text-bankGradient text-blue-800'>&nbsp;{user}</span>
				)}
			</h1>
			<p className='header-box-subtext'>{subtext}</p>
		</div>
	);
}
