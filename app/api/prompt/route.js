import { connectToDB } from "@utils/database";
import Prompt          from "@models/prompt";

export const GET = async () => {
	try {
		await connectToDB ();
		
		let prompts = await Prompt.find ({}).populate('creator');
		return new Response (JSON.stringify(prompts), { status: 200 });
	}
	catch (err) {
		console.error (err, 'error fetching prompts');
		return new Response ("Failed to fetch all prompts", { status: 500 });
	}
};