"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRechargeSchema = exports.createPhoneSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPhoneSchema = joi_1.default.object({
    number: joi_1.default.string()
        .pattern(/^\d{11}$/)
        .required()
        .messages({
        'string.pattern.base': 'Phone number must contain exactly 11 digits',
        'any.required': 'Phone number is required'
    }),
    carrierId: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .messages({
        'number.base': 'Carrier ID must be a number',
        'number.positive': 'Carrier ID must be positive',
        'any.required': 'Carrier ID is required'
    }),
    name: joi_1.default.string()
        .min(1)
        .max(255)
        .required()
        .messages({
        'string.min': 'Name cannot be empty',
        'string.max': 'Name cannot exceed 255 characters',
        'any.required': 'Name is required'
    }),
    description: joi_1.default.string()
        .allow('')
        .max(500)
        .messages({
        'string.max': 'Description cannot exceed 500 characters'
    }),
    document: joi_1.default.string()
        .pattern(/^\d{11}$/)
        .required()
        .messages({
        'string.pattern.base': 'CPF must contain exactly 11 digits',
        'any.required': 'CPF is required'
    })
});
exports.createRechargeSchema = joi_1.default.object({
    phoneId: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .messages({
        'number.base': 'Phone ID must be a number',
        'number.positive': 'Phone ID must be positive',
        'any.required': 'Phone ID is required'
    }),
    amount: joi_1.default.number()
        .min(10)
        .max(1000)
        .precision(2)
        .required()
        .messages({
        'number.min': 'Amount must be at least R$10',
        'number.max': 'Amount cannot exceed R$1000',
        'any.required': 'Amount is required'
    })
});
