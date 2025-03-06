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
}
