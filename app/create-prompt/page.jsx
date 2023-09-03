"use client";

import React, { useState } from 'react';
import { useSession }      from 'next-auth/react';
import { useRouter }       from 'next/navigation';

import Form                from '@components/Form';

function CreatePrompt () {

	const router = useRouter ();

	const {data: session} = useSession ();

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost]             = useState({ prompt: "", tag: ""});

	const createPrompt = async(e) => {
		e.preventDefault ();
		setSubmitting (true);

		let payload =  {
			prompt : post.prompt,
			userId : session?.user.id,
			tag    : post.tag
		};

		try {
			let response = await fetch ('/api/prompt/new', {
				method : 'POST',
				body   : JSON.stringify (payload)
			});

			if (response.ok) {
				router.push ('/');
			}
		}
		catch (err) {
			console.error (err, 'error submitting prompt');
		}
		finally {
			setSubmitting (false);
		}
	};

	return (
		<Form
			type         = "Create"
			post         = {post}
			setPost      = {setPost}
			submitting   = {submitting}
			handleSubmit = {createPrompt}
		/>
	);
}

export default CreatePrompt;