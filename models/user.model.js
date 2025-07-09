import mongoose from 'mongoose';

const UserSchema =
	new mongoose.Schema({
		username: {
			type: String,
			required: [true, 'Username is required'],
			trim: true,
			minlength: 2,
			maxlength: 50,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			trim: true,
			lowercase: true,
			match: [
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
				'Please enter a valid email address',
			],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: 6,
		}, }, {timestamps: true});

const User = mongoose.model('User', UserSchema);

export default User;

