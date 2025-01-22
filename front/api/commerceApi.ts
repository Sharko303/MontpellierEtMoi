import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class CommercantApi {
  private static baseRoute: string = "/commercants";

  static async getCommercants() {
    const response = await axiosInstance.get(CommercantApi.baseRoute);
    console.log("response", response);
    return response.data;
  }
}
