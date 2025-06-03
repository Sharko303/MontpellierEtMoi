import { User } from "@/entities/Types";
import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class Subscription {
  private static baseRoute: string = "/subscription";

  static async getAllSubscriptions() {
    const response = await axiosInstance.get(Subscription.baseRoute);
    console.log("response", response);
    return response.data;
  }
}
