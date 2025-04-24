import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class ShopApi {
  private static baseRoute: string = "/shop";

static async getShop() {
    const response = await axiosInstance.get(ShopApi.baseRoute);
    /* console.log("response", response); */
    return response.data;
  }
}
