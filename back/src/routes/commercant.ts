import { Router } from "express";
import Commercant from "../controllers/Commercant";

export const commercantRoutes = Router();

commercantRoutes.get("/commercant", Commercant.getAllCommercantsMontpellier as any);
commercantRoutes.post("/commercant/qr", Commercant.createPromoCode as any);