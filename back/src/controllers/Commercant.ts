import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";
import QRCode from "qrcode";
import Api from "./Api";
import { use } from "passport";

const API_BASE_URL = process.env.URL_OPEN_DATA;
const prisma = new PrismaClient();

const generatePromoCode = (length: number = 16): string => {
  return Array.from({ length }, () =>
    Math.random().toString(36).charAt(2).toUpperCase()
  ).join("");
};

export default class Commercant {
  static getAllCommercantsMontpellier = async (req: Request, res: Response) => {
    const response = await Api.get(req, res);
    console.log("response", response);
    return res.json(response);
  };

  static createPromoCode = async (req: Request, res: Response) => {
    
    const { user, description, number } = req.body;
    console.log(user)
    try {
      if (!user || !description || !number) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs." });
      }
      // Vérifier si l'utilisateur est un commerçant
      if (user.userType !== "pro") {
        return res.status(403).json({ message: "Accès interdit." });
      }

      if(number <= 0) {
        return res.status(400).json({ message: "Veuillez entrer un nombre valide." });
      }

      if(description.length < 5) {
        return res.status(400).json({ message: "Veuillez entrer une description valide." });
      }
      // Générer un code unique pour le code promo
      const code = generatePromoCode(16);

      // Générer le contenu du QR code
      const qrCodeData = {
        code,
        description,
        merchantId: user.id,
      };

      // on récupére le nombre de code promo restant dans son contrat
      const contract = await prisma.contract.findFirst({
        where: {
          userId: user.id,
          endDate: {
            gte: new Date(),
          },
        },
      });

      if (!contract) {
        return res.status(400).json({ message: "Aucun contrat trouvé." });
      }
      console.log(contract.remainingPromoCodes)
      if (contract.remainingPromoCodes < number) {
        return res.status(400).json({ message: "Nombre de codes promo insuffisant." });
      }

      // on boucle sur les codes promo à générer

      for (let i = 0; i < number; i++) {
        // Enregistrer le code promo dans la base de données
         await prisma.promoCode.create({
          data: {
            description,
            expiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            merchantId: user.id,
          },
        });
      }
      // on met à jour le nombre de code promo restant dans le contrat
      await prisma.contract.update({
        where: {
          id: contract.id,
        },
        data: {
          remainingPromoCodes: contract.remainingPromoCodes - number,
        },
      });

      return res.status(201).json({
        message: "Code promo créé avec succès", remainingPromoCodes: contract.remainingPromoCodes - number,
      });
    } catch (error) {
      console.error("Erreur lors de la création du code promo :", error);
      return res.status(500).json({
        message: "Erreur lors de la création du code promo.",
        error: error,
      });
    }
  };

  static payment = async (req: Request, res: Response) => {
    console.log("test");
    const { subscriptionType, cardNumber, expiryDate, cvv, user } = req.body;
    console.log("req.body", req.body);
    if (!subscriptionType || !cardNumber || !expiryDate || !cvv || !user) {
      return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs." });
    }
    try {
      const startDate = new Date();
      const endDate = new Date() ;
      endDate.setMonth(endDate.getMonth() + 1);
      // on regarde en base de donnée la subscription choisi
      const subscription = await prisma.subscriptionType.findFirst({
        where: {
          id: parseInt(subscriptionType),
        },
      });
      if(!subscription) {
        console.log(user)
        return res.status(400).json({ message: "Type d'abonnement inconnu." });
      }
      const data = {
        startDate,
        endDate,
        autoRenew: true,
        type: parseInt(subscriptionType),
        remainingPromoCodes: subscription.nbPromoCodes,
      }
      console.log(data);
      // Mettre à jour le contrat
      const updatedContract = await prisma.contract.create({
        data: {
          ...data,
          type: {
            connect: {
              id: parseInt(subscriptionType),
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        }
      });

      return res.json(updatedContract);
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
      return res.status(500).json({
        message: "Erreur lors du paiement.",
        error: error,
      });
    }
  };

  static getRemainingPromoCodes = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const contract = await prisma.contract.findFirst({
        where: {
          userId: parseInt(userId),
          endDate: {
            gte: new Date(),
          },
        },
      });
      if (!contract) {
        return res.status(404).json({ message: "Aucun contrat trouvé." });
      }
      return res.json({
        remainingPromoCodes: contract.remainingPromoCodes,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des codes promo restants :", error);
      return res.status(500).json({
        message: "Erreur lors de la récupération des codes promo restants.",
        error: error,
      });
    }
  };

  static getContract = async (req: Request, res: Response) => {
    if(!req.user) {
      return res.status(401).json({
        message: "Utilisateur non authentifié",
      });
    }
    const user = req.user;
    const userId = (user as { id: number }).id;
    
    try {
      const contract = await prisma.contract.findFirst({
        where: {
          userId: userId,
          startDate: {
            lte: new Date(),
          },
          endDate: {
            gte: new Date(),
          },
        },
      });
      if (!contract) {
        return res.status(404).json({ message: "Aucun contrat trouvé." });
      }
      return res.json(contract);
    } catch (error) {
      console.error("Erreur lors de la récupération du contrat :", error);
      return res.status(500).json({
        message: "Erreur lors de la récupération du contrat.",
        error: error,
      });
    }
  }
}
