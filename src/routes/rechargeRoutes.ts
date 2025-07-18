import { Router } from 'express';
import { validateSchema } from '../middlewares/validation.js';
import { createRechargeSchema } from '../utils/schemas.js';
import * as rechargeController from '../controllers/rechargeController.js';

const router = Router();

router.post('/', validateSchema(createRechargeSchema), rechargeController.createRecharge);
router.get('/:number', rechargeController.getRechargesByPhoneNumber);

export default router; 