import { User } from "@/entities/Types";
import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class FavoriteApi {
  private static baseRoute: string = "/favorites";

  static async update(userId: number, shopId: number,) {
    console.log("userId", userId);
    console.log("shopId", shopId);
    const response = await axiosInstance.post(FavoriteApi.baseRoute, {
      shopId,
      userId
    });
    return response.data;
  }

  static async getById(favoriteId: string) {
    console.log("favoriteId", favoriteId);
    const response = await axiosInstance.get(
      FavoriteApi.baseRoute + "/" + favoriteId
    );
    return response.data;
  }
  static async getAllByUserId(userId: number) {
    console.log("userId", userId);
    const response = await axiosInstance.get(
      FavoriteApi.baseRoute + "/" + userId
    );
    return response.data;
  }
}
