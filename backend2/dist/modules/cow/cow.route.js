"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const cow_validation_1 = require("./cow.validation");
const cow_controller_1 = require("./cow.controller");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const router = express_1.default.Router();
router.post("/cows", (0, validateRequests_1.validateRequest)(cow_validation_1.cowsZodValidataion.createCow), (0, Authorization_1.auth)([utils_1.userRoles.seller]), cow_controller_1.cowsController.createCow);
router.get("/cows/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.buyer, utils_1.userRoles.seller]), cow_controller_1.cowsController.getSingleCow);
router.delete("/cows/:id", (0, Authorization_1.auth)([utils_1.userRoles.seller]), cow_controller_1.cowsController.deleteCow);
router.patch("/cows/:id", (0, validateRequests_1.validateRequest)(cow_validation_1.cowsZodValidataion.updateCow), (0, Authorization_1.auth)([utils_1.userRoles.seller]), cow_controller_1.cowsController.updateCow);
router.get("/cows", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.buyer, utils_1.userRoles.seller]), cow_controller_1.cowsController.getAllCows);
exports.CowRoutes = router;
