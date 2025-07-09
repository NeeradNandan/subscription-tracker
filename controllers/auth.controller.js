import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	
	try {
		const { username, email, password } = req.body;
		
		const isUser = await User.findOne({ email });
		
		if(isUser) {
			return res.status(409).json({ success: false, message: 'User already exists' });
		}
		
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		
		const newUsers = await User.create([{ username, email, password: hashPassword }], { session })
		
		const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
		
		await session.commitTransaction();
		return res.status(201).json({
			success: true,
			message: 'User successfully created',
			data: {
				token,
				user: newUsers[0],
			}
		});
	} catch (error) {
		await session.abortTransaction();
	    next(error);
	} finally {
		await session.endSession();
	}
}

export const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		
		const user = await User.findOne({ email });
		
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User does not exist'
			})
		}
		
		const isMatch = await bcrypt.compare( password, user.password );
		
		if(!isMatch) {
			return res.status(401).json({
				success: false,
				message: 'Invalid Credentials'
			})
		}
		
		const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
		
		res.status(200).json({
			success: true,
			message: 'User successfully logged in',
			data: {
				token,
				user,
			}
		})
	} catch (error) {
	    next(error);
	}
}

export const signOut = async (req, res, next) => {

}