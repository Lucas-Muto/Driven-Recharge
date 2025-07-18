import { Router } from 'express';
import * as summaryController from '../controllers/summaryController';

const router = Router();

router.get('/:document', summaryController.getSummaryByDocument);

export default router; 