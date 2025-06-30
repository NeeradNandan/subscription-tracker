import { Router } from 'express';

const router = Router();

router.get('/', (req, res) =>
	res.send({ title: 'GET all the subscriptions '}));

router.get('/:id', (req, res) =>
	res.send({ title: 'GET subscription details '}));

router.post('/', (req, res) =>
	res.send({ title: 'CREATE subscription '}));

router.put('/:id', (req, res) =>
	res.send({ title: 'UPDATE subscription details '}));

router.delete('/:id', (req, res) =>
	res.send({ title: 'DELETE subscription '}));

router.get('/user/:id', (req, res) =>
	res.send({ title: 'GET all user subscription details '}));

router.put('/:id/cancel', (req, res) =>
	res.send({ title: 'CANCEL subscription '}));

router.get('/upcoming-renewals', (req, res) =>
	res.send({ title: 'GET upcoming subscriptions '}));

export default router;

