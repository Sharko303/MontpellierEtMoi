import passport from "passport";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
// @ts-ignore
import JsonStrategy from "passport-json";
// @ts-ignore
import BearerStrategy from "passport-http-bearer";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

passport.use(
  new JsonStrategy(async (email: string, password: string, done: any) => {
    try {
      // Récupérer l'utilisateur dans la base de données
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return done(null, false);
      }

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false);
      }

      // Tout est OK, retourner l'utilisateur
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new BearerStrategy(async function (token: any, done: any) {
    let user;
    try {
      const decoded = jwt.verify(
        token,
        "fJBYgyfyuvy65fuyR76RfGHoh"
      ) as jwt.JwtPayload;
      user = await prisma.user.findUnique({
        where: { id: decoded.user },
      });
    } catch (err) {
      user = null;
    }
    // @ts-ignore
    //req.user = user;
    if (!user) {
      return done(null, false);
    }
    done(null, user);
    /*   UserController.findByToken({ token: token }, function (err: any, user: any) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      }); */
  })
);

// Sérialisation de l'utilisateur pour la session
passport.serializeUser((user: any, cb) => {
  cb(null, user.id); // Utilisez l'ID de l'utilisateur pour la session
});

// Désérialisation de l'utilisateur pour les requêtes suivantes
passport.deserializeUser(async (id: number, cb: any) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    cb(null, user);
  } catch (error) {
    cb(error);
  }
});

export default passport;
