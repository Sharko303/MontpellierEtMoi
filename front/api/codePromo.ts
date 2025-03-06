import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class CodePromo {
  private static baseRoute: string = "/code-promo";
  
  static async get(id: number) {
    const response = await axiosInstance.get(`${CodePromo.baseRoute}/${id}`);
    //console.log("response", response);
    return response.data;
  }
}
