"use client";

import React, { useState }        from 'react';
import Image                      from 'next/image';
import { useSession }             from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

function PromptCard (props) {

	const { post, handleTagClick, handleEdit, handleDelete } = props;

	const { creator, prompt, tag } = post;

	const { data : session } = useSession ();
	const pathName           = usePathname ();
	const router             = useRouter ();

	const [ copied, setCopied ] = useState ("");

	const handleCopy = () => {
		setCopied (prompt);
		navigator.clipboard.writeText (prompt);
		setTimeout (() => setCopied (""), 3000);
	};

	return (
		<div className='prompt_card'>
			<div className='flex justify-between items-start gap 5'>
				<Image
					src = {creator.image}
					alt = "user_image"
					width = {40}
					height = {40}
					className='rounded-full object-contain'
				/>

				<div className='flex flex-col'>
					<h3 className='font-satoshi font-semibold text-gray-900'>
						{creator.username}
					</h3>
					<p className='font-inter text-sm text-gray-500'>
						{post.creator.email}
					</p>
				</div>

				<div className='copy_btn' onClick = {handleCopy}>
					<Image
						alt    = "copy-icon"
						src    = {copied === prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
						height = {12}
						width  = {12}
					/>
				</div>
			</div>

			<p className='my-4 font-satoshi text-sm text-grat-700'>
				{prompt}
			</p>
			<p className='font-inter text-sm blue_gradient cursor-pointer' onClick = {() => handleTagClick (tag)}>
				#{tag}
			</p>

			{session?.user.id === creator._id && pathName === '/profile'  &&
				<div className='mt-5 flex-end gap-4 border-t border-gray-100 pt-3'>
					<p className='font-inter text-sm green_gradient cursor-pointer' onClick = { handleEdit }>
						Edit
					</p>
					<p className='font-inter text-sm orange_gradient cursor-pointer' onClick = { handleDelete }>
						Delete
					</p>
				</div>
			}
		</div>
	);
}

export default PromptCard;