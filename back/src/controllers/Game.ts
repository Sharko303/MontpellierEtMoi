// on import request et reponse
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Game {

  static get = async (req: Request, res: Response) => {
    
  };

  static post = async (req: Request, res: Response) => {
    
  };
}