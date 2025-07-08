import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', authorize ,getUsers);

router.get('/:id', authorize ,getUser);

router.post('/', (req, res) =>
	res.send({ title: 'CREATE users' }));

router.put('/:id', (req, res) =>
	res.send({ title: 'EDIT the user details' }));

router.delete('/:id', (req, res) =>
	res.send({ title: 'DELETE the user' }));

export default router;

