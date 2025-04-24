import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default class ShopUser {
  static get = async (req: Request, res: Response) => {
    const userId = req.params.id;
   // on récupére les shops favoris de l'utilisateur
    if (!userId) {
      return res.status(400).json({
        message: "Utilisateur introuvable",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        shops: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }
    // on reconstruit notre tableau de shop
    const shops = user.shops.map((shop) => {
      return {
        id: shop.id,
        name: shop.denominationUsuelle,
        picture: shop.picture,
        adresse: shop.adresseEtablissement,
        isFavorite: true,
      };
    });
    return res.json(shops);
  };
  static post = async (req: Request, res: Response) => {
    const { userId, shopId } = req.body;
    console.log(userId, shopId);
    if (!userId || !shopId) {
      return res.status(400).json({
        message: "Utilisateur ou commerce introuvable",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }
    const shop = await prisma.shop.findUnique({
      where: {
        id: parseInt(shopId),
      },
    });
    if (!shop) {
      return res.status(404).json({
        message: "Commerce introuvable",
      });
    }
    // on vérifie si le commerce est déjà dans les favoris de l'utilisateur
    const favoriteShop = await prisma.user.findFirst({
      where: {
        id: parseInt(userId),
        shops: {
          some: {
            id: parseInt(shopId),
          },
        },
      },
    });
    // on supprime le commerce des favoris de l'utilisateur
    if (favoriteShop) {
      await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          shops: {
            disconnect: {
              id: parseInt(shopId),
            },
          },
        },
      });
      return res.json(user);
    }
    // on ajoute le commerce aux favoris de l'utilisateur
    await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        shops: {
          connect: {
            id: parseInt(shopId),
          },
        },
      },
    });
    return res.json(user);
  };
/*   static getAll = async (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        message: "Utilisateur introuvable",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        favoriteShops: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }
    return res.json(user.favoriteShops);
  }; */
}
