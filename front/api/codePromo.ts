import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class CodePromo {
  private static baseRoute: string = "/code-promo";
  
  static async get() {
    const response = await axiosInstance.get(`${CodePromo.baseRoute}`);
    console.log("response", response);
    return response.data;
  }

  static async getAllByMerchant() {
    console.log("hello2")
    const response = await axiosInstance.get(
      `${CodePromo.baseRoute}-pro/`
    );

    console.log("response", response);
    return response.data;
  }
}
