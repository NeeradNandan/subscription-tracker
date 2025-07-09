import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.config.js";
import Subscription from "../database/models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id
		});
		
		const { workflowRunId } = await workflowClient.trigger({
			url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
			body: {
				subscriptionId: subscription.id,
			},
			headers: {
				'content-type': 'application/json'
			},
			retries: 0
		});
		const { runs } = await workflowClient.logs();
		
		return res.status(201).json({
			status: 'success',
			data: { subscription, workflowRunId }
		})
	} catch (error) {
	   next(error);
	}
};

export const getUserSubscriptions = async ( req, res, next) => {
	try {
	    if(req.user._id.toLocaleString() !== req.params.id) {
			return res.status(401).json({
				success: false,
				message: 'You are not the owner of this account'
			})
	    }
		
		const subscriptions = await Subscription.find({ user: req.params.id });
		
		return res.status(200).json({
			success: true,
			data: subscriptions
		})
	} catch (error) {
	   next(error);
	}
};

export const getAllSubscriptions = async (req, res, next) => {
	try {
	    const allSubscriptions = await Subscription.find();
		
		return res.status(200).json({
			success: true,
			data: allSubscriptions
		})
	} catch (error) {
	    next(error);
	}
};

export const getUserSubscription = async (req, res, next) => {
	try {
		const isSubscription = await Subscription.exists({_id: req.params.id});
		if(!isSubscription) return res.status(401).json({
			success: false,
			message: 'Subscription not found'
		})
		
	    const userSubscription = await Subscription.findOne({_id: req.params.id});
		
		return res.status(200).json({
			success: true,
			data: userSubscription
		})
	} catch (error) {
	    next(error);
	}
};

export const deleteSubscription = async (req, res, next) => {
	try {
		const isSubscription = await Subscription.exists({_id: req.params.id});
		if(!isSubscription) return res.status(401).json({
			success: false,
			message: 'Subscription not found'
		})
		
		await Subscription.deleteOne({_id: req.params.id});
		
		return res.status(200).json({
			success: true,
			message: `Subscription with ${req.params.id} deleted successfully`
		})
	} catch (error) {
	    next(error);
	}
}

