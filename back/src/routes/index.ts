import express from 'express' ;
import { defaultRoute } from './defaultRoute' ;
import { userRoutes } from './users' ;
import { commercantRoutes } from './commercant';
import { apiRoutes } from './api';
import { apiResult } from './apiResult';
import { subscription } from './subscription';
/* import { middlewareRoutes } from './middleware' ; */
export const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRoutes);
routes.use(commercantRoutes);
routes.use(apiRoutes);
routes.use(apiResult);
routes.use(subscription);
/* routes.use(middlewareRoutes); */