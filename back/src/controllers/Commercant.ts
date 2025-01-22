import axios from "axios";
import { Request, Response } from "express";
const API_BASE_URL = process.env.URL_OPEN_DATA;

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
}
