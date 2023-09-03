import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set ("strictQuery", true);

	if (isConnected) {
		console.log ('MongoDB already connected');
		return;
	}

	let MONGODB_URL = process.env.MONGODB_URI;
	try {
		await mongoose.connect (MONGODB_URL, {
			dbName             : "share_prompt",
			useNewUrlParser    : true,
			useUnifiedTopology : true,
		});

		isConnected = true;
		console.log ('MongoDB connected');
	}
	catch (err) {
		console.error (err, 'MongoDB connection failed');
		return;
	}
};