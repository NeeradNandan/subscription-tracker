import mongoose from "mongoose";

const SubscriptionSchema =
	new mongoose.Schema({
		name: {
			type: String,
			required: [true, 'Subscription name is required'],
			trim: true,
			minlength: 2,
			maxlength: 100,
		},
		price: {
			type: Number,
			required: [true, 'Subscription price is required'],
			min: [0, 'Subscription price must be greater than 0'],
		},
		currency: {
			type: String,
			enum: ['INR', 'USD', 'EUR'],
			default: 'INR',
		},
		frequency: {
			type: String,
			enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
		},
		category: {
			type: String,
			enum: ['Sports', 'News', 'Entertainment', 'Lifestyle', 'Technology', 'Finance', 'Politics', 'Others'],
			required: [true, 'Subscription category is required'],
		},
		paymentMethod: {
			type: String,
			required: [true, 'Payment is required'],
			trim: true,
		},
        status: {
			type: String,
			enum: ['Active', 'Cancelled', 'Expired']
		},
		startDate: {
			type: Date,
			required: [true, 'Subscription start date is required'],
			validate: {
				validator: (value) => value <= new Date(),
				message: 'Subscription start date must be in the past',
			},
		},
        renewalDate: {
            type: Date,
            //required: [true, 'Subscription renewal date is required'],
            validate: {
                validator: function (value) {
					return value >= this.startDate
                },
                message: 'Subscription renewal date must be after the start date',
            },
        },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		}
	                    }, {timestamps: true});

SubscriptionSchema.pre('save',
                       function (next) {
	if(!this.renewalDate) {
		const renewalPeriods = {
			Daily: 1,
			Weekly: 7,
			Monthly: 30,
			Yearly: 365,
		};
		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
	}
	
	if(this.renewalDate < new Date()) {
		this.status = 'Expired';
	}
	
	next();
})

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;