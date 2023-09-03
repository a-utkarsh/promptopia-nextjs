"use client";

import React, { useState, useEffect } from 'react';

import PromptCard                     from '@components/PromptCard';

function Feed () {

	const [searchText, setSearchText] = useState ("");
	const [posts, setPosts]           = useState ([]);

	const handleSearchChange = () => {

	};

	useEffect (() => {
		fetchPosts ();
	}, []);

	const fetchPosts = async() => {
		let response = await fetch ('/api/prompt');
		let data = await response.json ();

		setPosts (data);
	};

	const handleTagClick = () => {

	};

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type        = "text"
					placeholder = 'Search for a tag or a username'
					value       = { searchText }
					onChange    = { handleSearchChange }
					className   = 'search_input peer'
					required
				/>
			</form>
		
			<div className='mt-16 prompt_layout'>
				{posts.map (post => (
					<PromptCard
						key            = { post._id }
						post           = { post }
						handleTagClick = { handleTagClick }
					/>
				))}
			</div>
		</section>
	);
}

export default Feed;