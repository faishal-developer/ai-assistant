import express from "express";
import { ProfessionalsController } from "./professional.controller";

const router = express.Router();

router.post(
  "/generate",
  ProfessionalsController.createProfessional
);


export const ProfessionalRoutes = router;