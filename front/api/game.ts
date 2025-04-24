import { User } from "@/entities/Types";
import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export class GameApi {
  private static baseRoute: string = "/game";

  static async getById(gameId: string) {
    console.log("gameId", gameId);
    const response = await axiosInstance.get(GameApi.baseRoute + '/' + gameId);
    /* console.log("response", response); */
    return response.data;
  }

  static async play(gameId: string, answer: string, user: User) {
    const response = await axiosInstance.post(GameApi.baseRoute + '/play', {
      gameId,
      answer,
      user,
    });
    return response.data;
  }
}
