"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = require("./middleWares/globalErrorHandler");
const user_route_1 = require("./modules/user/user.route");
const cow_route_1 = require("./modules/cow/cow.route");
const order_route_1 = require("./modules/orders/order.route");
const admin_route_1 = require("./modules/admin/admin.route");
const auth_route_1 = require("./modules/Auth/auth.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.get('/', (_req, res) => {
    res.json({ message: "Everything is working" });
});
app.use('/api/v1', user_route_1.UserRoutes);
app.use('/api/v1', cow_route_1.CowRoutes);
app.use('/api/v1', order_route_1.OrderRoutes);
app.use('/api/v1', admin_route_1.AdminRoutes);
app.use('/api/v1', auth_route_1.AuthRoutes);
//globalErrorhandler
app.use(globalErrorHandler_1.globalErrorHandler);
//unknown route handler
app.use((req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Route not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found'
            }
        ]
    });
});
exports.default = app;
