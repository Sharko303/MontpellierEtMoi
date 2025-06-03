import { Router } from "express";
import CodePromo from "../controllers/CodePromo";

export const codePromo = Router();

codePromo.get("/code-promo/:id", CodePromo.get as any);
codePromo.get("/code-promo/", CodePromo.getAllByUser as any);
codePromo.get("/code-promo-pro/", CodePromo.getAllByMerchant as any);
