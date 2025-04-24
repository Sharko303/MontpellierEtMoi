// on import request et reponse
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserController {
  static get = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };

  static getMe = async (req: Request, res: Response) => {
    // Récupération du token depuis les cookies signés
    return req.user
      ? res.json(req.user)
      : res.status(401).json({ message: "Utilisateur non authentifié" });

    /*  console.log("usertoken reçu:", usertoken);

    // Vérification si le token existe
    if (!usertoken) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    try {
      // Décodage du token
      const decoded = jwt.verify(
        usertoken,
        "fJBYgyfyuvy65fuyR76RfGHoh"
      ) as jwt.JwtPayload;

      console.log("Payload du token:", decoded);

      return res.json({ user: decoded.user });
    } catch (error) {
      console.error("Erreur de vérification du token:", error);
      return res.status(401).json({ message: "Token invalide ou expiré" });
    } */
  };

  static loginJson(req: Request, res: Response): any {
    if (!req.user) {
      return res.status(401).json({ message: "Authentification échouée" });
    }

    jwt.sign(
      { user: (req.user as User).id },
      "fJBYgyfyuvy65fuyR76RfGHoh",
      { expiresIn: "1h" },
      (err, token) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Erreur lors de la génération du token" });
        // Send Set-Cookie header
        res.cookie("usertoken", token, {
          httpOnly: true,
          sameSite: true,
          signed: true,
          secure: false,
        });
        console.log("token", token);
        return res.json({ token });
      }
    );
  }
  static logout = async (req: Request, res: Response) => {
    res.clearCookie("usertoken");
    res.json({ message: "Déconnexion réussie" });
  };

  // Méthode d'enregistrement
  static register = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    console.log("coucou");
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    try {
      // Vérifier si l'utilisateur existe
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé." });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phoneNumber,
          userType: "user", // Exemple de type utilisateur
        },
      });

      res.status(201).json({ message: "Utilisateur créé avec succès.", user });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur.", error });
    }
  };
  static registerPro = async (req: Request, res: Response) => {
    const {
      etablissement,
      image,
      subscriptionType,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    } = req.body;
    console.log(
      etablissement,
      image,
      subscriptionType,
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    );
    // on enregistre un utilisateur pro dans la table user avec le role pro
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    try {
      // Vérifier si l'utilisateur existe
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé." });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phoneNumber,
          userType: "pro", // Exemple de type utilisateur
        },
      });

      // maintenant on ajoute l'image a l'établissement choisi par l'utilisateur
      // on vérifie que l'établissement existe
      const existingEstablishment = await prisma.shop.findUnique({
        where: { id: parseInt(etablissement.id) },
      });
      if (!existingEstablishment) {
        return res.status(400).json({ message: "Etablissement inexistant." });
      }
      // on ajoute dans la table userresultatapi l'user id et l'établissement choisi par l'utilisateur
      const userShop = await prisma.user.update({
        where: { id: user.id },
        data: {
          shops: {
            connect: { id: existingEstablishment.id },
          },
        },
      });
      if (image) {
        const establishmentImage = await prisma.shop.update({
          where: { id: parseInt(etablissement.id) },
          data: {
            picture: image,
          },
        });
      }

      // on créer un contrat non actif pour l'utilisateur
      const contract = await prisma.contract.create({
        data: {
          createdAt: new Date(),
          startDate: new Date(),
          endDate: new Date(),
          type: subscriptionType,
          user: {
            connect: {
              id: user.id,
            },
          },
          autoRenew: false,
        },
      });

      res
        .status(201)
        .json({ message: "Utilisateur créé avec succès.", user, contract });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur serveur.", error });
    }
  };

  // Méthode de connexion
  static login = async (req: Request, res: Response) => {
    passport.authenticate(
      "local",
      (err: any, user: Express.User, info: { message: any }) => {
        if (err) {
          return err;
        }
        if (!user) {
          return res.status(400).json({ message: info.message });
        }

        req.logIn(user, (err) => {
          if (err) {
            return err;
          }

          res.status(200).json({ message: "Connexion réussie.", user });
        });
      }
    )(req, res);
  };

  /*   static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // On va utiliser passport pour le login
    try {
      // Rechercher l'utilisateur par email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Générer un jeton JWT
      const token = jwt.sign(
        { userId: user.id, userType: user.userType },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.json({ message: "Connexion réussie", token });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }; */
}
