import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI) throw new Error("MongoDB URI is missing in the environment variables");

const connectToDB = async () => {
	try {
	    await mongoose.connect(DB_URI)
	                  .then(() => console.log( `MongoDB Connected in ${NODE_ENV} mode`))
	                  .catch(err => console.log(`Error: ${err}`));
	} catch (error) {
	    console.error('Error:', error);
		process.exit(1);
	}
};

export default connectToDB;
