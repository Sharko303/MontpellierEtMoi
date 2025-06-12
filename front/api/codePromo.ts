import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class CodePromo {
  private static baseRoute: string = "/code-promo";
  
  static async scan(code: string) {
    const response = await axiosInstance.get(`${CodePromo.baseRoute}/${code}`);
    return response.data;
  }
  static async get() {
    const response = await axiosInstance.get(`${CodePromo.baseRoute}`);
    return response.data;
  }

  static async getAllByMerchant() {
    const response = await axiosInstance.get(
      `${CodePromo.baseRoute}-pro/`
    );
    return response.data;
  }
}
