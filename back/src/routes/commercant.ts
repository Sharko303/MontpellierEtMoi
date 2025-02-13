import { Router } from "express";
import Commercant from "../controllers/Commercant";

export const commercantRoutes = Router();

commercantRoutes.get("/commercants", Commercant.getAllCommercantsMontpellier as any);
commercantRoutes.post("/commercants/qr", Commercant.createPromoCode as any);
commercantRoutes.post("/commercants/payment", Commercant.payment as any);
