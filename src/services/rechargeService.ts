import * as rechargeRepository from '../repositories/rechargeRepository.js';
import * as phoneRepository from '../repositories/phoneRepository.js';
import { CreateRechargeData, Recharge } from '../protocols/index.js';
import { AppError } from '../middlewares/errorHandler.js';

export async function createRecharge(rechargeData: CreateRechargeData): Promise<Recharge> {
  // Verificar se o telefone existe
  const phone = await phoneRepository.findPhoneById(rechargeData.phoneId);
  if (!phone) {
    const error = new Error('Phone not found') as AppError;
    error.type = 'PHONE_NOT_FOUND';
    throw error;
  }

  return await rechargeRepository.createRecharge(rechargeData);
}

export async function getRechargesByPhoneNumber(phoneNumber: string): Promise<Recharge[]> {
  return await rechargeRepository.findRechargesByPhoneNumber(phoneNumber);
} 