import { Router } from 'express';
import userRouter from "./user.routes.js";
import subscriptionRouter from "./subscription.routes.js";
import authRouter from "./auth.routes.js";
import workflowRouter from "./workflow.routes.js";

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/subscriptions', subscriptionRouter);
router.use('/api/v1/workflows', workflowRouter);

export default router;