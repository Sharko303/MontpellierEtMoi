import { Router } from "express";
import UserController from "../controllers/User";
import passport from "passport";

export const userRoutes = Router();

//userRoutes.get("/users", User.get);
userRoutes.post("/users", UserController.register as any);
userRoutes.post("/users/pro", UserController.registerPro as any);

//userRoutes.post('/users/login', );
userRoutes.get("/users", UserController.get as any);
userRoutes.get("/users/me",passport.authenticate("bearer", { session: false }), UserController.getMe as any);
// Stratégie de connexion avec email/mot de passe (sessions Passport)
userRoutes.post(
  "/users/login",
  passport.authenticate("json", { session: false }),
  UserController.loginJson as any
);
userRoutes.get(
  "/users/auth",
  passport.authenticate("bearer", { session: false }),
  function (req, res) {
    res.json(req.user);
  }
);
userRoutes.post("/users/logout", UserController.logout as any);
