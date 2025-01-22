import 'express';

declare module "express" {
    export interface Request {
      session?: { messages?: string[] };
      csrfToken?: () => string;
    }
  }
