import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class ShopApi {
  private static baseRoute: string = "/shop";

static async getShop() {
    const response = await axiosInstance.get(ShopApi.baseRoute);
    /* console.log("response", response); */
    return response.data;
  }

  static async searchShop(text: string){
  // on fais cette requete await axios.get(`http://localhost:3000/shop/search?query=${text}`);
    const response = await axiosInstance.get(
      ShopApi.baseRoute + "/search?query=" + text
    )
    return response.data;
  }
}
