"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams }       from 'next/navigation';

import Form                from '@components/Form';

function EditPrompt () {

	const router = useRouter ();
	const searchParams = useSearchParams ();

	const promptId = searchParams.get ('id');

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost]             = useState({ prompt: "", tag: ""});

	useEffect (() => {
		fetchPromptDetails ();
	}, [promptId]);

	const fetchPromptDetails = async () => {
		let response = await fetch(`api/prompt/${promptId}`);
		let data = await response.json ();
		setPost (data);
	};

	const updatePrompt = async (e) => {
		e.preventDefault ();
		setSubmitting (true);

		if (!promptId) {
			alert ('Prompt ID not found');
			return;
		}

		let payload =  {
			prompt : post.prompt,
			tag    : post.tag
		};

		try {
			let response = await fetch (`/api/prompt/${promptId}`, {
				method : 'PATCH',
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
			type         = "Edit"
			post         = {post}
			setPost      = {setPost}
			submitting   = {submitting}
			handleSubmit = {updatePrompt}
		/>
	);
}

export default EditPrompt;