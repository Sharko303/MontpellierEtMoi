import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Api from "./Api";

const prisma = new PrismaClient();

interface ShopResult {
  id: number;
  siret: string;
  adresse: string;
  name: string | null;
  latitude: number | null;
  longitude: number | null;
  category: string | null;
  picture: string | null;
  isFavorite: boolean;
}

export default class Shop {
  // on récupére nos données de l'api en bdd
  static get = async (req: Request, res: Response) => {
    try {
      const shops = await prisma.shop.findMany();
      // on ajoute les favoris de l'utilisateur

      const user = req.user;
      const userId = (user as { id: number }).id;
      // Récupérer les shops favoris de l'utilisateur en une seule requête
      let userFavoriteShopIds: number[] = [];
      if (user) {
        const userShops = await prisma.user.findUnique({
          where: { id: userId },
          include: { shops: true }
        });
        if (userShops && userShops.shops) {
          userFavoriteShopIds = userShops.shops.map(shop => shop.id);
        }
      }
      
      // Créer le tableau résultat
      const result: ShopResult[] = shops.map(shop => ({
        id: shop.id,
        siret: shop.siret,
        adresse: shop.adresseEtablissement,
        name: shop.denominationUsuelle,
        latitude: shop.latitude,
        longitude: shop.longitude,
        category: shop.categorieEntreprise,
        picture: shop.picture || '',
        isFavorite: userFavoriteShopIds.includes(shop.id)
      }));
      res.json(result);      
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };

  static searchasync = async(req: Request, res: Response) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const results = await prisma.shop.findMany({
            where: {
                OR: [
                    { denominationUsuelle: { contains: query as string } },
                    { siret: { contains: query as string } },
                    { adresseEtablissement: { contains: query as string } }
                ]
            },
            take: 20 // Limite les résultats pour éviter une surcharge
        });

        const formattedResults = results.map((establishment) => ({
          id: establishment.id,
          siret: establishment.siret,
          adresse: establishment.adresseEtablissement || "Adresse non disponible",
          name: establishment.denominationUsuelle || "Nom inconnu",
          latitude: establishment.latitude || 0,
          longitude: establishment.longitude || 0,
          category: establishment.categorieEntreprise || "Catégorie inconnue",
          picture: /* establishment.imageUrl || */ "", // Assurez-vous d'avoir une colonne imageUrl dans la BDD
      }));

      res.json(formattedResults);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
}
