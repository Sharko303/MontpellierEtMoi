// on import request et reponse
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export default class Api {
  static get = async (req: Request, res: Response) => {
    try {
      let page = 0;
      let pageMax = 1;
      const result: any[] = [];
      const uniqueIds = new Set();

      while (page < pageMax) {
        const { data } = await axios.get(
          `https://www.herault-data.fr/api/explore/v2.1/catalog/datasets/entreprises-herault-sirene/records?select=adresseetablissement%2C%20denominationusuelleetablissement%2C%20siret%2C%20geolocetablissement%2C%20categorieentreprise&where=libellecommuneetablissement%20%3D%20%22MONTPELLIER%22%20and%20etatadministratifetablissement%20!%3D%22Actif%22%20and%20adresseetablissement%20!%3D%20%22%22%20and%20denominationusuelleetablissement%20!%3D%20%22%22&refine=soussectionetablissement%3A%22Restauration%22&limit=100&offset=${page * 100}`
        );

        pageMax = Math.ceil(data.total_count / 100);

        // Vérification si "results" existe et est un tableau
        if (Array.isArray(data.results)) {
          for (const record of data.results) {
            const siret = record.siret;
            // Éviter les doublons en utilisant le "siret"
            if (record.siret && !uniqueIds.has(record.siret)) {
              uniqueIds.add(record.siret);
              // Enregistrer le résultat dans la base de données
              await prisma.apiResult.upsert({
                where: { siret },
                update: {
                  adresseEtablissement: record.adresseetablissement,
                  denominationUsuelle: record.denominationusuelleetablissement,
                  latitude: record.geolocetablissement?.lat || null,
                  longitude: record.geolocetablissement?.lon || null,
                  categorieEntreprise: record.categorieentreprise,
                },
                create: {
                  siret,
                  adresseEtablissement: record.adresseetablissement,
                  denominationUsuelle: record.denominationusuelleetablissement,
                  latitude: record.geolocetablissement?.lat || null,
                  longitude: record.geolocetablissement?.lon || null,
                  categorieEntreprise: record.categorieentreprise,
                },
              });
              result.push(record);
            }
          }
        } else {
          console.warn(`Pas de résultats à la page ${page}.`);
        }

        console.log(
          `Page ${page + 1}: ${
            data.results?.length || 0
          } résultats, Total accumulé: ${result.length}`
        );

        page++;
      }

      return res.status(200).json({
        total: result.length,
        data: result,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };
}