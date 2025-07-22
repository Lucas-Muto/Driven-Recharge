"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, req, res, next) {
    console.error(error);
    if (error.type === 'DUPLICATE_PHONE') {
        return res.status(409).json({ message: 'Phone number already exists' });
    }
    if (error.type === 'PHONE_LIMIT_EXCEEDED') {
        return res.status(409).json({ message: 'Maximum of 3 phones per CPF exceeded' });
    }
    if (error.type === 'PHONE_NOT_FOUND') {
        return res.status(404).json({ message: 'Phone not found' });
    }
    if (error.type === 'CARRIER_NOT_FOUND') {
        return res.status(404).json({ message: 'Carrier not found' });
    }
    // Database connection errors
    if (error.message.includes('connect')) {
        return res.status(500).json({ message: 'Database connection error' });
    }
    // Generic server error
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Internal server error'
    });
}
