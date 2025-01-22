import { Router } from "express";
import User from "../controllers/User";
import passport from "passport";

export const userRoutes = Router();

//userRoutes.get("/users", User.get);
userRoutes.post("/users", User.register as any);
/* userRoutes.post(
  "/users/login",
  (req, res, next) => {
    passport.authenticate("local", (err: any, user: Express.User, info: { message: any; }) => {
      if (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err });
      }
      if (!user) {
        return res.status(401).json({ message: info.message || "Authentification échouée" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Erreur lors de la connexion", error: err });
        }
        return res.status(200).json({ message: "Connexion réussie", user });
      });
    })(req, res, next);
  }
); */
//userRoutes.post('/users/login', );

userRoutes.post('/users/login', 
  passport.authenticate('json', { session: false }),
  function(req, res) {
    res.json(req.user);
  });
