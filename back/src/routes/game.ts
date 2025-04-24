import { Router } from "express";
import Game from "../controllers/Game";

export const gameRoutes = Router();

gameRoutes.get("/games", Game.getAll as any);
gameRoutes.get("/game/:id", Game.get as any);
gameRoutes.post("/game", Game.post as any);
gameRoutes.post("/game/play", Game.play as any);
