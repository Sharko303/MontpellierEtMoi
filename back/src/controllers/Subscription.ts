import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const API_BASE_URL = process.env.URL_OPEN_DATA;
const prisma = new PrismaClient();

export default class Subscription {
    static getAllSubscriptions = async (req: Request, res: Response) => {
        const subscriptions = await prisma.subscriptionType.findMany();
        if(subscriptions.length === 0) {
            return res.status(404).json({
                message: "Aucune souscription trouvée"
            });
        }

        return res.json(subscriptions);
    }
}
