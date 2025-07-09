import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const REMINDERS = [7, 5, 2, 1];
export const sendReminder = serve(async (context) => {
	const { subscriptionId } = context.requestPayload;
	console.log('Workflow triggered for subscription');
	const subscription = await fetchSubscription(context, subscriptionId);
	console.log('Fetched subscription', subscription);
	
	if(!subscription || subscription.status !== 'Active') {
		console.log('Subscription not found or inactive');
		return;
	}
	
	const renewalDate = dayjs(subscription.renewalDate);
	console.log('Renewal date:', renewalDate.format());
	console.log('Current date:', dayjs().format());
	
	if(renewalDate.isBefore(dayjs())) {
		console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow now.`);
		return;
	}
	 for(const daysBefore of REMINDERS) {
		 const reminderDate = renewalDate.subtract(daysBefore, 'day');
		 
		 if(reminderDate.isAfter(dayjs())) {
			 console.log('Triggered SleepUntilReminder');
			 await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
		 }
		 if (dayjs().isSame(reminderDate, 'day')) {
			 console.log('Triggered TriggerReminder');
			 await triggerReminder( context, `${daysBefore} days before reminder`, subscription );
		 }
	 }
	
});

const sleepUntilReminder = async (context, label, date) => {
	console.log(`Sleeping until ${label} reminder at ${date}`);
	await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
	return await context.run(label, async () => {
		console.log(`Triggering reminder at ${label} reminder`);
		
		await sendReminderEmail({
			                        to: subscription.user.email,
			                        type: label,
			                        subscription
		})
	})
}

const fetchSubscription = async (context, subscriptionId) => {
	return await context.run('get subscription', async () => {
		return Subscription.findById( subscriptionId ).populate( 'user', 'username email' );
	});
}