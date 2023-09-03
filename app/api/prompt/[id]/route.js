import { connectToDB } from "@utils/database";
import Prompt          from "@models/prompt";

export const GET = async (request, { params }) => {
	try {
		await connectToDB ();
		
		let prompt = await Prompt.findById (params.id).populate('creator');
		if (!prompt) {
			return new Response('No prompt found', { status: 404 });
		}

		return new Response (JSON.stringify(prompt), { status: 200 });
	}
	catch (err) {
		console.error (err, 'error fetching prompt');
		return new Response ("Failed to fetch prompt", { status: 500 });
	}
};

export const PATCH = async (request, { params }) => {
	let { prompt, tag } =  await request.json ();

	try {
		let existingPrompt = await Prompt.findById (params.id);
		if (!existingPrompt) {
			return new Response ("Prompt not found", {status: 404});
		}
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response(JSON.stringify(existingPrompt), { status: 200});
	}
	catch (err) {
		console.error (err, 'error updating prompt');
		return new Response ("Failed to update prompt", { status: 500 });
	}
};

export const DELETE = async (request, { params }) => {

	try {
		await connectToDB ();
		
		await Prompt.findByIdAndRemove (params.id);

		return new Response ('Prompt deleted successfully', { status: 200 });
	}
	catch (err) {
		console.error (err, 'error deleting prompt');
		return new Response ("Failed to delete prompt", { status: 500 });
	}
};