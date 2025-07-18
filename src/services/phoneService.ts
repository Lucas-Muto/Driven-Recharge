import * as phoneRepository from '../repositories/phoneRepository';
import { CreatePhoneData, Phone, PhoneWithCarrier } from '../protocols/index';
import { AppError } from '../middlewares/errorHandler';

export async function createPhone(phoneData: CreatePhoneData): Promise<Phone> {
  // Verificar se o número já existe
  const existingPhone = await phoneRepository.findPhoneByNumber(phoneData.number);
  if (existingPhone) {
    const error = new Error('Phone number already exists') as AppError;
    error.type = 'DUPLICATE_PHONE';
    throw error;
  }

  // Verificar se a operadora existe
  const carrierExists = await phoneRepository.carrierExists(phoneData.carrierId);
  if (!carrierExists) {
    const error = new Error('Carrier not found') as AppError;
    error.type = 'CARRIER_NOT_FOUND';
    throw error;
  }

  // Verificar limite de 3 telefones por CPF
  const phoneCount = await phoneRepository.countPhonesByDocument(phoneData.document);
  if (phoneCount >= 3) {
    const error = new Error('Maximum of 3 phones per CPF exceeded') as AppError;
    error.type = 'PHONE_LIMIT_EXCEEDED';
    throw error;
  }

  return await phoneRepository.createPhone(phoneData);
}

export async function getPhonesByDocument(document: string): Promise<PhoneWithCarrier[]> {
  return await phoneRepository.findPhonesByDocument(document);
} 