import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
	PORT,
	NODE_ENV,
	DB_URI,
	JWT_SECRET,
	JWT_EXPIRES_IN,
	ARCJET_API_KEY,
	QSTASH_URL,
	QSTASH_TOKEN,
	SERVER_URL,
	NODEMAIL_PASSWORD
} = process.env;