"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const user_zod_1 = require("../user/user.zod");
const user_controller_1 = require("../user/user.controller");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const router = express_1.default.Router();
router.post("/admins/create-admin", (0, validateRequests_1.validateRequest)(user_zod_1.userZodValidataion.createUser), user_controller_1.userController.createUser);
router.get("/admins/my-profile", (0, Authorization_1.auth)([utils_1.userRoles.admin]), user_controller_1.userController.getMyProfile);
router.patch("/admins/my-profile", (0, validateRequests_1.validateRequest)(user_zod_1.userZodValidataion.updateUser), (0, Authorization_1.auth)([utils_1.userRoles.admin]), user_controller_1.userController.updateMyProfile);
router.get("/admins/login", user_controller_1.userController.getSingleUser);
exports.AdminRoutes = router;
