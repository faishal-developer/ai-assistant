"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const professional_controller_1 = require("./professional.controller");
const router = express_1.default.Router();
router.post("/generate", professional_controller_1.ProfessionalsController.createProfessional);
exports.ProfessionalRoutes = router;
