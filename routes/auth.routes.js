import { Router } from "express";

const router  = Router();

router.post('/sign-up', (req, res) => res.send({ title: "Sign Up" }))

router.post('/sign-in', (req, res) => res.send({ title: "Sign In" }))

router.post('/sign-out', (req, res) => res.send({ title: "Sign Out" }))

export default router;