"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhone = createPhone;
exports.getPhonesByDocument = getPhonesByDocument;
const phoneRepository = __importStar(require("../repositories/phoneRepository"));
async function createPhone(phoneData) {
    // Verificar se o número já existe
    const existingPhone = await phoneRepository.findPhoneByNumber(phoneData.number);
    if (existingPhone) {
        const error = new Error('Phone number already exists');
        error.type = 'DUPLICATE_PHONE';
        throw error;
    }
    // Verificar se a operadora existe
    const carrierExists = await phoneRepository.carrierExists(phoneData.carrierId);
    if (!carrierExists) {
        const error = new Error('Carrier not found');
        error.type = 'CARRIER_NOT_FOUND';
        throw error;
    }
    // Verificar limite de 3 telefones por CPF
    const phoneCount = await phoneRepository.countPhonesByDocument(phoneData.document);
    if (phoneCount >= 3) {
        const error = new Error('Maximum of 3 phones per CPF exceeded');
        error.type = 'PHONE_LIMIT_EXCEEDED';
        throw error;
    }
    return await phoneRepository.createPhone(phoneData);
}
async function getPhonesByDocument(document) {
    return await phoneRepository.findPhonesByDocument(document);
}
