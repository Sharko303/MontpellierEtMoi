import { axiosInstance } from "./axios"; // Assurez-vous d'importer votre instance Axios correctement

export interface RegisterData {
  email: string; // Adresse e-mail de l'utilisateur
  password: string; // Mot de passe de l'utilisateur
  passwordRetype: string; // Confirmation du mot de passe
  phoneNumber?: string; // Numéro de téléphone optionnel
  firstName: string; // Prénom de l'utilisateur
  lastName: string; // Nom de l'utilisateur
}

export interface LoginData {
  email: string; // Adresse e-mail de l'utilisateur
  password: string; // Mot de passe de l'utilisateur
}

export class UserApi {
  private static baseRoute: string = "/users"; // Route de base pour les utilisateurs
  private static authenticate: string = "/users/login"; // Route de connexion
  private static authenticateToken: string = "/auth"; // Route d'authentification par token

  static async register(data: RegisterData) {
    const {
      email,
      password,
      passwordRetype,
      phoneNumber,
      firstName,
      lastName,
    } = data;

    console.log("data", data);
    console.log("helloooooooo", UserApi.baseRoute);

    // Vérification des données
    if (!email || !password || !passwordRetype || !firstName || !lastName) {
      throw new Error("Tous les champs doivent être remplis");
    }

    if (password !== passwordRetype) {
      throw new Error("Les mots de passe ne correspondent pas");
    }
    // Envoi de la requête de création d'utilisateur
    try {
      const response = await axiosInstance.post(UserApi.baseRoute, {
        email,
        password,
        phoneNumber,
        firstName,
        lastName,
      });
      return response.data;
    } catch (error: any) {
      // Gérer les erreurs de création d'utilisateur
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la création de l'utilisateur"
      );
    }
  }

  static async login(data: LoginData) {
    const { email, password } = data;

    console.log("data", data);

    // Vérification des données
    if (!email || !password) {
      return { error: { message: "Email et mot de passe requis" } };
    }

    try {
      const response = await axiosInstance.post(
        UserApi.authenticate,
        {
          username: email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error: any) {
      console.log("error: ", error);

      // Normaliser l'erreur en un format JSON
      if (error.response) {
        return {
          error: {
            message:
              error.response.data.message ||
              "Une erreur est survenue lors de la connexion.",
            status: error.response.status,
          },
        };
      } else {
        return {
          error: {
            message: "Mot de passe ou email incorrect.",
          },
        };
      }
    }
  }

  /*   static async signInToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      // Gérer le cas où le token est absent
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axiosInstance.post(UserApi.authenticateToken, {}, config);
    return res.data;
  }

  static async getUser(id: number) {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erreur lors de la récupération de l'utilisateur");
    }
  }
 */
  /*   static async logout(authorId: number) {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/;";
    try {
      return await axiosInstance.post("/users/logout", {
        authorId,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erreur lors de la déconnexion");
    }
  } */
}