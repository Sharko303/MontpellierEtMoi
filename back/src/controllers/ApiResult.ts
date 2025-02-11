import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Api from "./Api";

const prisma = new PrismaClient();


export default class ApiResult {
  // on récupére nos données de l'api en bdd
  static get = async (req: Request, res: Response) => {
    try {
      const apiResults = await prisma.apiResult.findMany();
      let result = [] as any;
      apiResults.forEach(element => {
        // on refait notre objet avec des noms différents
        result.push({
          id: element.id,
          siret: element.siret,
          adresse: element.adresseEtablissement,
          name: element.denominationUsuelle,
          latitude: element.latitude,
          longitude: element.longitude,
          category: element.categorieEntreprise,
          picture: ''
        });
      });
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
        const results = await prisma.apiResult.findMany({
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
