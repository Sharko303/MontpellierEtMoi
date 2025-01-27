import express from 'express' ;
import { defaultRoute } from './defaultRoute' ;
import { userRoutes } from './users' ;
import { commercantRoutes } from './commercant';
import { apiRoutes } from './api';
/* import { middlewareRoutes } from './middleware' ; */
export const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRoutes);
routes.use(commercantRoutes);
routes.use(apiRoutes);
/* routes.use(middlewareRoutes); */