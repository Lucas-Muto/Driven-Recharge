import { Router } from 'express';
import { validateSchema } from '../middlewares/validation';
import { createRechargeSchema } from '../utils/schemas';
import * as rechargeController from '../controllers/rechargeController';

const router = Router();

router.post('/', validateSchema(createRechargeSchema), rechargeController.createRecharge);
router.get('/:number', rechargeController.getRechargesByPhoneNumber);

export default router; 