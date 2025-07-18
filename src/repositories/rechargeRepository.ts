import database from '../config/database';
import { Recharge, CreateRechargeData } from '../protocols/index';

export async function createRecharge(rechargeData: CreateRechargeData): Promise<Recharge> {
  const query = `
    INSERT INTO recharges (phone_id, amount)
    VALUES ($1, $2)
    RETURNING id, phone_id as "phoneId", amount, timestamp
  `;
  
  const values = [rechargeData.phoneId, rechargeData.amount];
  
  const result = await database.query(query, values);
  return result.rows[0];
}

export async function findRechargesByPhoneNumber(phoneNumber: string): Promise<Recharge[]> {
  const query = `
    SELECT 
      r.id, 
      r.phone_id as "phoneId", 
      r.amount, 
      r.timestamp
    FROM recharges r
    JOIN phones p ON r.phone_id = p.id
    WHERE p.number = $1
    ORDER BY r.timestamp DESC
  `;
  
  const result = await database.query(query, [phoneNumber]);
  return result.rows;
}

export async function findRechargesByPhoneId(phoneId: number): Promise<Recharge[]> {
  const query = `
    SELECT 
      id, 
      phone_id as "phoneId", 
      amount, 
      timestamp
    FROM recharges
    WHERE phone_id = $1
    ORDER BY timestamp DESC
  `;
  
  const result = await database.query(query, [phoneId]);
  return result.rows;
} 