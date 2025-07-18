import { Request, Response, NextFunction } from 'express';
import * as rechargeService from '../services/rechargeService';
import { CreateRechargeData } from '../protocols/index';

export async function createRecharge(req: Request, res: Response, next: NextFunction) {
  try {
    const rechargeData: CreateRechargeData = req.body;
    const recharge = await rechargeService.createRecharge(rechargeData);
    
    res.status(201).json(recharge);
  } catch (error) {
    next(error);
  }
}

export async function getRechargesByPhoneNumber(req: Request, res: Response, next: NextFunction) {
  try {
    const { number } = req.params;
    const recharges = await rechargeService.getRechargesByPhoneNumber(number);
    
    res.status(200).json(recharges);
  } catch (error) {
    next(error);
  }
} 