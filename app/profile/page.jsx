"use client";

import React, { useState, useEffect } from 'react';
import { useSession }                 from 'next-auth/react';
import { useRouter }                  from 'next/navigation';

import Profile from '@components/Profile';

function MyProfile () {

	const { data : session } = useSession ();
	const router = useRouter ();

	const [ posts, setPosts ] = useState ([]);

	useEffect (() => {
		if (session?.user.id) {
			fetchPosts();
		}
	}, []);

	const fetchPosts = async() => {
		let response = await fetch (`/api/users/${session?.user.id}/posts`);
		let data = await response.json ();

		setPosts (data);
	};

	const handleEdit = (post) => {
		router.push (`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		let hasConfirmed = confirm ("Are you sure you want to delete this prompt?");

		if (!hasConfirmed) {
			return;
		}

		try {
			await fetch(`/api/prompt/${post._id.toString()}`, {
				method: 'DELETE'
			});

			let filteredPosts = posts.filter((p) => p._id !== post._id);
			setPosts(filteredPosts);
		}
		catch (err) {
			console.error (err);
		}
	};

	return (
		<Profile
			name         = "My"
			desc         = "Welcome to your personalized profile page"
			data         = { posts }
			handleEdit   = { handleEdit }
			handleDelete = { handleDelete }
		/>
	);
}

export default MyProfile;