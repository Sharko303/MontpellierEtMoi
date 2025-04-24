// on import request et reponse
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Game {
  static get = async (req: Request, res: Response) => {
    // on récupére un jeu par son id
    const id = req.params.id;
    const game = await prisma.game.findUnique({
      where: { id: parseInt(id) },
    });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.json(game);
  };

  static post = async (req: Request, res: Response) => {
    // on crée un jeu
    const { title, description, answer, endDate, startDate } = req.body;
    const game = await prisma.game.create({
      data: {
        title,
        description,
        answer,
        endDate: new Date(endDate),
        startDate: new Date(startDate),
      },
    });
    if (game) {
      return res.json(game);
    }
    return res.status(500).json({ message: "Error creating game" });
  };

  static getAll = async (req: Request, res: Response) => {
    // on récupére tous les jeux
    const games = await prisma.game.findMany();
    return res.json(games);
  };

  static play = async (req: Request, res: Response) => {
    // on joue à un jeu
    const { gameId, answer, user } = req.body;
    // on récupère le jeux avec son id
    const game = await prisma.game.findUnique({
      where: { id: Number(gameId) },
    });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (game.counter === 0) {
      return res.status(400).json({ message: "Game is over !" });
    }
    
    if (game.answer === answer) {
      // on attribue un qr code qui existe déjà a l'utilisateur
      const qrCode = await prisma.promoCode.findFirst({
        where: {
          userId: null,
        },
      });

      if (!qrCode) {
        return res.status(400).json({ message: "No qr code available" });
      }

      await prisma.promoCode.update({
        where: { id: qrCode.id },
        data: { userId: user.id },
      });

      await prisma.game.update({
        where: { id: Number(gameId) },
        data: { counter: game.counter - 1 },
      });

      return res.json({ message: "Bravo vous avez gagné un code promo !" });
    }

    return res.json({ message: "Mauvaise réponse" });
  };
}
