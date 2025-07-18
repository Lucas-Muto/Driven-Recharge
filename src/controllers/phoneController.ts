import { Request, Response, NextFunction } from 'express';
import * as phoneService from '../services/phoneService';
import { CreatePhoneData } from '../protocols/index';

export async function createPhone(req: Request, res: Response, next: NextFunction) {
  try {
    const phoneData: CreatePhoneData = req.body;
    const phone = await phoneService.createPhone(phoneData);
    
    res.status(201).json(phone);
  } catch (error) {
    next(error);
  }
}

export async function getPhonesByDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const { document } = req.params;
    const phones = await phoneService.getPhonesByDocument(document);
    
    res.status(200).json(phones);
  } catch (error) {
    next(error);
  }
} 