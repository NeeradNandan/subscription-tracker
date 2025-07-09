import { Router } from 'express';
import {
	createSubscription,
	deleteSubscription,
	getAllSubscriptions,
	getUserSubscription,
	getUserSubscriptions,
} from "../controllers/subscription.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', authorize, getAllSubscriptions);

router.get('/:id', authorize, getUserSubscription);

router.post( '/', authorize, createSubscription);

router.put('/:id', (req, res) =>
	res.send({ title: 'UPDATE subscription details '}));

router.delete('/:id',authorize, deleteSubscription);

router.get( '/user/:id', authorize, getUserSubscriptions);

router.put('/:id/cancel', (req, res) =>
	res.send({ title: 'CANCEL subscription '}));

router.get('/upcoming-renewals', (req, res) =>
	res.send({ title: 'GET upcoming subscriptions '}));

export default router;

