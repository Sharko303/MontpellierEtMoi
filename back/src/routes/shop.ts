import { Router } from "express";
import Shop from "../controllers/Shop";

export const shop = Router();

shop.get("/shop", Shop.get as any);
shop.get("/shop/search", Shop.searchasync as any);