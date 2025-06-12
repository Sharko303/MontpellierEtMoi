import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default class CodePromo {
    static get = async (req: Request, res: Response) => {
        const codePromoId = req.params.id;
        if(!codePromoId) {
            return res.status(400).json({
                message: "Code promo introuvable",
            });
        }
        const codePromo = await prisma.promoCode.findUnique({
            where: {
                id: codePromoId,
            },
        });
        if (!codePromo) {
            return res.status(404).json({
                message: "Code promo introuvable",
            });
        }

        // si le QR code est expiré
        if (codePromo.expiration < new Date()) {
            return res.status(400).json({
                message: "Code promo expiré",
            });
        }

        // si le QR code est déjà utilisé
        if (codePromo.valid) {
            return res.status(400).json({
                message: "Code promo déjà utilisé",
            });
        }
        // on valid le code promo
        await prisma.promoCode.update({
            where: {
                id: codePromoId,
            },
            data: {
                valid: true,
            },
        });

        return res.json(codePromo);
    }

    static getAllByUser = async (req: Request, res: Response) => {
        const user = req.user;
        const userId = (user as { id: number }).id;
        if(!user || !userId) {
            return res.status(401).json({
                message: "Utilisateur non authentifié",
            });
        }
        console.log(userId)
        const codePromos = await prisma.promoCode.findMany({
            where: {
                userId: userId,
            },
        });
        if (!codePromos) {
            return res.status(404).json({
                message: "Aucun code promo trouvé",
            });
        }
        let codePromoTabs = codePromos as any;
        // on récupére les infos des shops de chaque code promo
        for (const codePromoTab of codePromoTabs) {
            const shop = await prisma.shop.findUnique({
                where: {
                    id: codePromoTab.merchantId,
                },
            });
            if (shop) {
                codePromoTab.shop = shop as any;
            }
        }

        return res.json(codePromoTabs);
    }

    static getAllByMerchant = async (req: Request, res: Response) => {
        const user = req.user;
        if(!user) {
            return res.status(401).json({
                message: "Utilisateur non authentifié",
            });
        }
        const userId = (user as { id: number }).id;
        
        const codePromos = await prisma.promoCode.findMany({
            where: {
                merchantId: userId,
            },
        });
        if (!codePromos) {
            return res.status(404).json({
                message: "Aucun code promo trouvé",
            });
        }
        let codePromoTabs = codePromos as any;
        // on récupére les infos des shops de chaque code promo
        for (const codePromoTab of codePromoTabs) {
            const shop = await prisma.shop.findUnique({
                where: {
                    id: codePromoTab.merchantId,
                },
            });
            if (shop) {
                codePromoTab.shop = shop as any;
            }
        }

        return res.json(codePromoTabs);
    }
}
