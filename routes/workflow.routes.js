import { Router } from 'express';
import { sendReminder } from "../controllers/workflow.controller.js";

const router = Router();

router.post('/subscription/reminder', sendReminder)

export default router;