import { Router } from "express";

const router = Router();

router.get('/', (req, res) =>
	res.send({ title: 'GET all users' }));

router.get('/:id', (req, res) =>
	res.send({ title: 'GET user details'}));

router.post('/', (req, res) =>
	res.send({ title: 'CREATE users' }));

router.put('/:id', (req, res) =>
	res.send({ title: 'EDIT the user details' }));

router.delete('/:id', (req, res) =>
	res.send({ title: 'DELETE the user' }));

export default router;

