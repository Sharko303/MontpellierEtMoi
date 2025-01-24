import { Router } from "express";
import Api from "../controllers/Api";

export const apiRoutes = Router();

//userRoutes.get("/users", User.get);
apiRoutes.get("/api", Api.get as any);
