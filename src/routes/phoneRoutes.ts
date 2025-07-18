import { Router } from 'express';
import { validateSchema } from '../middlewares/validation';
import { createPhoneSchema } from '../utils/schemas';
import * as phoneController from '../controllers/phoneController';

const router = Router();

router.post('/', validateSchema(createPhoneSchema), phoneController.createPhone);
router.get('/:document', phoneController.getPhonesByDocument);

export default router; 