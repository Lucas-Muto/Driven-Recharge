"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middlewares/errorHandler");
const phoneRoutes_1 = __importDefault(require("./routes/phoneRoutes"));
const rechargeRoutes_1 = __importDefault(require("./routes/rechargeRoutes"));
const summaryRoutes_1 = __importDefault(require("./routes/summaryRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/phones', phoneRoutes_1.default);
app.use('/recharges', rechargeRoutes_1.default);
app.use('/summary', summaryRoutes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running!' });
});
// Error handling middleware (deve ser o último)
app.use(errorHandler_1.errorHandler);
exports.default = app;
