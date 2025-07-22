"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecharge = createRecharge;
exports.findRechargesByPhoneNumber = findRechargesByPhoneNumber;
exports.findRechargesByPhoneId = findRechargesByPhoneId;
const database_1 = __importDefault(require("../config/database"));
async function createRecharge(rechargeData) {
    const query = `
    INSERT INTO recharges (phone_id, amount)
    VALUES ($1, $2)
    RETURNING id, phone_id as "phoneId", amount, timestamp
  `;
    const values = [rechargeData.phoneId, rechargeData.amount];
    const result = await database_1.default.query(query, values);
    return result.rows[0];
}
async function findRechargesByPhoneNumber(phoneNumber) {
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
    const result = await database_1.default.query(query, [phoneNumber]);
    return result.rows;
}
async function findRechargesByPhoneId(phoneId) {
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
    const result = await database_1.default.query(query, [phoneId]);
    return result.rows;
}
