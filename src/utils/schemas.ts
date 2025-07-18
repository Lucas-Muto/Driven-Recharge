import Joi from 'joi';

export const createPhoneSchema = Joi.object({
  number: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must contain exactly 11 digits',
      'any.required': 'Phone number is required'
    }),
  carrierId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Carrier ID must be a number',
      'number.positive': 'Carrier ID must be positive',
      'any.required': 'Carrier ID is required'
    }),
  name: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages({
      'string.min': 'Name cannot be empty',
      'string.max': 'Name cannot exceed 255 characters',
      'any.required': 'Name is required'
    }),
  description: Joi.string()
    .allow('')
    .max(500)
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  document: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      'string.pattern.base': 'CPF must contain exactly 11 digits',
      'any.required': 'CPF is required'
    })
});

export const createRechargeSchema = Joi.object({
  phoneId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Phone ID must be a number',
      'number.positive': 'Phone ID must be positive',
      'any.required': 'Phone ID is required'
    }),
  amount: Joi.number()
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