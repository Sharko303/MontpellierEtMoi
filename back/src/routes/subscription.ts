import { Router } from "express";
import Subscription from "../controllers/Subscription";

export const subscription = Router();

subscription.get("/subscription", Subscription.getAllSubscriptions as any);
