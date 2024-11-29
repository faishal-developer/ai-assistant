"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const orders_service_1 = require("./orders.service");
const commonFunction_1 = require("../../shared/commonFunction");
const createOrder = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cowData = req.body;
    const result = yield orders_service_1.OrderService.createOrder(cowData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order created successfully",
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryData = req.query;
    const result = yield orders_service_1.OrderService.getAllOrders();
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Order retrived successfully",
        data: result,
    });
}));
const getSingleOrder = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const orderId = req.params.id;
    const user = (0, commonFunction_1.verifyAccessToken)((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization);
    const result = yield orders_service_1.OrderService.getSingleOrder(user, orderId);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Order retrived successfully",
        data: result,
    });
}));
exports.ordersController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
