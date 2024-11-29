"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const order_validation_1 = require("./order.validation");
const orders_controller_1 = require("./orders.controller");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const router = express_1.default.Router();
router.post("/orders", (0, validateRequests_1.validateRequest)(order_validation_1.orderZodValidation.createOrder), (0, Authorization_1.auth)([utils_1.userRoles.buyer]), orders_controller_1.ordersController.createOrder);
router.get("/orders/:id", (0, Authorization_1.auth)([utils_1.userRoles.buyer]), orders_controller_1.ordersController.getSingleOrder);
router.get("/orders", (0, Authorization_1.auth)([utils_1.userRoles.admin]), orders_controller_1.ordersController.getAllOrders);
exports.OrderRoutes = router;
