import express from 'express' ;
import { defaultRoute } from './defaultRoute' ;
import { userRoutes } from './users' ;
import { commercantRoutes } from './commercant';
import { apiRoutes } from './api';
import { shop } from './shop';
import { subscription } from './subscription';
import { codePromo } from './codePromo';
import { gameRoutes } from './game';
/* import { middlewareRoutes } from './middleware' ; */
export const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRoutes);
routes.use(commercantRoutes);
routes.use(apiRoutes);
routes.use(shop);
routes.use(subscription);
routes.use(codePromo);
routes.use(gameRoutes)
/* routes.use(middlewareRoutes); */