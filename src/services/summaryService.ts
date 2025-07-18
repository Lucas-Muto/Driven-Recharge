import * as phoneRepository from '../repositories/phoneRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import { Summary, PhoneWithCarrier } from '../protocols/index.js';

export async function getSummaryByDocument(document: string): Promise<Summary> {
  // Buscar todos os telefones do CPF
  const phones = await phoneRepository.findPhonesByDocument(document);
  
  // Para cada telefone, buscar suas recargas
  const phonesWithRecharges: PhoneWithCarrier[] = await Promise.all(
    phones.map(async (phone) => {
      const recharges = await rechargeRepository.findRechargesByPhoneId(phone.id);
      return {
        ...phone,
        recharges
      };
    })
  );
  
  return {
    document,
    phones: phonesWithRecharges
  };
} 