import { Router } from "express";
import Commercant from "../controllers/Commercant";
import passport from "passport";

export const commercantRoutes = Router();

//userRoutes.get("/users", User.get);
commercantRoutes.get("/commercant", Commercant.getAllCommercantsMontpellier as any);
