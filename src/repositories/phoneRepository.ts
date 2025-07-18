import database from '../config/database';
import { Phone, CreatePhoneData, PhoneWithCarrier } from '../protocols/index';

export async function createPhone(phoneData: CreatePhoneData): Promise<Phone> {
  const query = `
    INSERT INTO phones (number, carrier_id, name, description, document)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, number, carrier_id as "carrierId", name, description, document
  `;
  
  const values = [
    phoneData.number,
    phoneData.carrierId,
    phoneData.name,
    phoneData.description,
    phoneData.document
  ];
  
  const result = await database.query(query, values);
  return result.rows[0];
}

export async function findPhoneByNumber(number: string): Promise<Phone | null> {
  const query = `
    SELECT id, number, carrier_id as "carrierId", name, description, document
    FROM phones 
    WHERE number = $1
  `;
  
  const result = await database.query(query, [number]);
  return result.rows[0] || null;
}

export async function findPhoneById(id: number): Promise<Phone | null> {
  const query = `
    SELECT id, number, carrier_id as "carrierId", name, description, document
    FROM phones 
    WHERE id = $1
  `;
  
  const result = await database.query(query, [id]);
  return result.rows[0] || null;
}

export async function findPhonesByDocument(document: string): Promise<PhoneWithCarrier[]> {
  const query = `
    SELECT 
      p.id, 
      p.number, 
      p.name, 
      p.description, 
      p.document,
      c.id as carrier_id,
      c.name as carrier_name,
      c.code as carrier_code
    FROM phones p
    JOIN carriers c ON p.carrier_id = c.id
    WHERE p.document = $1
    ORDER BY p.id
  `;
  
  const result = await database.query(query, [document]);
  
  return result.rows.map(row => ({
    id: row.id,
    number: row.number,
    name: row.name,
    description: row.description,
    document: row.document,
    carrier: {
      id: row.carrier_id,
      name: row.carrier_name,
      code: row.carrier_code
    }
  }));
}

export async function countPhonesByDocument(document: string): Promise<number> {
  const query = `
    SELECT COUNT(*) as count 
    FROM phones 
    WHERE document = $1
  `;
  
  const result = await database.query(query, [document]);
  return parseInt(result.rows[0].count);
}

export async function carrierExists(carrierId: number): Promise<boolean> {
  const query = `
    SELECT id 
    FROM carriers 
    WHERE id = $1
  `;
  
  const result = await database.query(query, [carrierId]);
  return result.rows.length > 0;
} 