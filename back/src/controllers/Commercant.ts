import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";
import QRCode from "qrcode";

const API_BASE_URL = process.env.URL_OPEN_DATA;
const prisma = new PrismaClient();

const generatePromoCode = (length: number = 16): string => {
  return Array.from({ length }, () =>
    Math.random().toString(36).charAt(2).toUpperCase()
  ).join('');
};

export default class Commercant {
  static getAllCommercantsMontpellier = async (req: Request, res: Response) => {
    const results = [];
    let start = 0;
    const rows = 100;
    // let hasMore = true; on devra l'utiliser pour les pages suivantes
    const params = {
      q: "Montpellier",
      rows,
      start,
      refine: {
        commune: "Montpellier",
      },
    };

    const response = await axios.get(`${API_BASE_URL}`, {
      params,
    });
    console.log(response.data);
    results.push(...response.data);

    return res.json(response.data);
  };

  static createPromoCode = async (req: Request, res: Response) => {
    try {
      const { merchantId, description, validUntil, gameId } = req.body;

      // Générer un code unique pour le code promo
      const code = generatePromoCode(16);

      // Générer le contenu du QR code
      const qrCodeData = {
        code,
        description,
        validUntil,
        merchantId,
      };

      // Convertir les données en chaîne JSON
      const qrCodeContent = JSON.stringify(qrCodeData);

      // Générer le QR code en base64
      //const qrCodeBase64 = await QRCode.toDataURL(qrCodeContent);

      // Enregistrer dans la base de données
      const promoCode = await prisma.promoCode.create({
        data: {
          code,
          description,
          validUntil: new Date(validUntil),
          gameId: parseInt(gameId),
          establishmentId: parseInt(merchantId),
        },
      });

      return res.status(201).json({
        message: "Code promo créé avec succès",
        data: promoCode,
      });
    } catch (error) {
      console.error("Erreur lors de la création du code promo :", error);
      return res.status(500).json({
        message: "Erreur lors de la création du code promo.",
        error: error
      });
    }
  };
}
