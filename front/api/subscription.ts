import { User } from "@/entities/Types";
import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class Subscription {
  private static baseRoute: string = "/subscription";

static async getByUserId(user: User) {
    const response = await axiosInstance.get(Subscription.baseRoute + "/user/" + user.id);
    /* console.log("response", response); */
    return response.data;
  }
  static async getAllSubscriptions() {
    const response = await axiosInstance.get(Subscription.baseRoute);
    console.log("response", response);
    return response.data;
  }
}
