"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = validateSchema;
function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(422).json({
                message: 'Validation failed',
                errors: errorMessages
            });
        }
        next();
    };
}
