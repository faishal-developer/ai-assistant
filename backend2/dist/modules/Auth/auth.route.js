"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const auth_zod_1 = require("./auth.zod");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/admins/login", (0, validateRequests_1.validateRequest)(auth_zod_1.loginZodValidataion.loginSchema), auth_controller_1.authController.login);
router.post("/auth/login", (0, validateRequests_1.validateRequest)(auth_zod_1.loginZodValidataion.loginSchema), auth_controller_1.authController.login);
router.post("/auth/refresh-token", (0, validateRequests_1.validateRequest)(auth_zod_1.loginZodValidataion.refreshTokenZodSchema), auth_controller_1.authController.refreshToken);
exports.AuthRoutes = router;
