import nodemailer from "nodemailer";
import { NODEMAIL_PASSWORD } from "./env.js";

export const accountEmail = 'xxx@gmail.com'

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: accountEmail,
		pass: NODEMAIL_PASSWORD
	}
})