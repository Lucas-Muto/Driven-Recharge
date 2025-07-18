import * as rechargeRepository from '../repositories/rechargeRepository';
import * as phoneRepository from '../repositories/phoneRepository';
import { CreateRechargeData, Recharge } from '../protocols/index';
import { AppError } from '../middlewares/errorHandler';

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