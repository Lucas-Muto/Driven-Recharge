"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhone = createPhone;
exports.findPhoneByNumber = findPhoneByNumber;
exports.findPhoneById = findPhoneById;
exports.findPhonesByDocument = findPhonesByDocument;
exports.countPhonesByDocument = countPhonesByDocument;
exports.carrierExists = carrierExists;
const database_1 = __importDefault(require("../config/database"));
async function createPhone(phoneData) {
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
    const result = await database_1.default.query(query, values);
    return result.rows[0];
}
async function findPhoneByNumber(number) {
    const query = `
    SELECT id, number, carrier_id as "carrierId", name, description, document
    FROM phones 
    WHERE number = $1
  `;
    const result = await database_1.default.query(query, [number]);
    return result.rows[0] || null;
}
async function findPhoneById(id) {
    const query = `
    SELECT id, number, carrier_id as "carrierId", name, description, document
    FROM phones 
    WHERE id = $1
  `;
    const result = await database_1.default.query(query, [id]);
    return result.rows[0] || null;
}
async function findPhonesByDocument(document) {
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
    const result = await database_1.default.query(query, [document]);
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
async function countPhonesByDocument(document) {
    const query = `
    SELECT COUNT(*) as count 
    FROM phones 
    WHERE document = $1
  `;
    const result = await database_1.default.query(query, [document]);
    return parseInt(result.rows[0].count);
}
async function carrierExists(carrierId) {
    const query = `
    SELECT id 
    FROM carriers 
    WHERE id = $1
  `;
    const result = await database_1.default.query(query, [carrierId]);
    return result.rows.length > 0;
}
