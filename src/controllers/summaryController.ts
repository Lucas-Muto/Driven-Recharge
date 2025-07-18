import { Request, Response, NextFunction } from 'express';
import * as summaryService from '../services/summaryService';

export async function getSummaryByDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const { document } = req.params;
    const summary = await summaryService.getSummaryByDocument(document);
    
    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
} 