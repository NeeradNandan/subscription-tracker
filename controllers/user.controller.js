import User from "../models/user.model.js";

export async function getUsers(req, res, next) {
	try {
		const users = await User.find();
		
		res.status(200).json({
			success: true,
			data: users
		});
	} catch (error) {
	    next(error);
	}
}

export async function getUser(req, res, next) {
	try {
		const user = await User.findById(req.params.id).select('-password');
		
		if(!user) {
			res.status(404).json({
				success: false,
				message: 'User does not exist'
			})
		}
		
		res.status(200).json({
			success: true,
			data: user
		});
	} catch (error) {
		next(error);
	}
}