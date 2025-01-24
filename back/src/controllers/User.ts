// on import request et reponse
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import passport from "passport";

const prisma = new PrismaClient();

export default class User {
  static get = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };

  // Méthode d'enregistrement
/*   static register = async (req: Request, res: Response) => {
    console.log("coucou");
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    console.log("req.body", req.body);
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé" });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer l'utilisateur
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          phoneNumber,
          firstName,
          lastName,
          userType: "user",
        },
      });

      res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }; */
  // Méthode d'enregistrement
  static register = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    console.log('coucou')
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
  
    try {
      // Vérifier si l'utilisateur existe
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email déjà utilisé.' });
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
          userType: 'user', // Exemple de type utilisateur
        },
      });
  
      res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.', error });
    }
  };

  // Méthode de connexion
  static login = async (req: Request, res: Response) => {
    passport.authenticate('local', (err: any, user: Express.User, info: { message: any; }) => {
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
        res.status(200).json({ message: 'Connexion réussie.', user });
      });
    })(req, res);
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
