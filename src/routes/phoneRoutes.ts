import { Router } from 'express';
import { validateSchema } from '../middlewares/validation.js';
import { createPhoneSchema } from '../utils/schemas.js';
import * as phoneController from '../controllers/phoneController.js';

const router = Router();

router.post('/', validateSchema(createPhoneSchema), phoneController.createPhone);
router.get('/:document', phoneController.getPhonesByDocument);

export default router; 