import { Router } from "express";
import ShopUser from "../controllers/ShopUser";

export const favoriteRoutes = Router();

/* favoriteRoutes.get("/favorites", ShopUser.getAll as any); */
favoriteRoutes.get("/favorites/:id", ShopUser.get as any);
favoriteRoutes.post("/favorites", ShopUser.post as any);

