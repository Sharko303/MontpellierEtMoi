import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class ApiResult {
  private static baseRoute: string = "/apiresult";

static async getApiResult() {
    const response = await axiosInstance.get(ApiResult.baseRoute);
    /* console.log("response", response); */
    return response.data;
  }
}
