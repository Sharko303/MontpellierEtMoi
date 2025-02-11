import { Router } from "express";
import ApiResult from "../controllers/ApiResult";

export const apiResult = Router();

apiResult.get("/apiresult", ApiResult.get as any);
apiResult.get("/apiresult/search", ApiResult.searchasync as any);