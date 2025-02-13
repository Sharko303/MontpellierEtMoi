import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class CommercantApi {
  private static baseRoute: string = "/commercants";

  static async getCommercants() {
    const response = await axiosInstance.get(CommercantApi.baseRoute);
    console.log("response", response);
    return response.data;
  }

  static async payment(data: any) {
    console.log("response", data);
    try {
      const response = await axiosInstance.post(CommercantApi.baseRoute + "/payment", data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors du payment"
      );
    }
  }

  static async createPromoCode(data: any) {
    try {
      const response = await axiosInstance.post(CommercantApi.baseRoute + "/qr", data);
      return response.data;
    } catch (error: any) {
      return { error: error.response?.data?.message || "Erreur lors de la création du code promo" };
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la création du code promo"
      );
    }
  }
}
