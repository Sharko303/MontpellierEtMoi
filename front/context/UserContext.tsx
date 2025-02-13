import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  MutableRefObject,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { UserApi } from "@/api/userApi";
import { User } from "@/entities/Types";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

// Création du contexte
const UserContext = createContext<{
  user: User | null;
  isLoading: boolean;
  signIn: (arg0: string) => void;
  signOut: () => void;
  token: MutableRefObject<string | null> | null;
}>({
  user: null,
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: true,
});

export function useAuthSession() {
  return useContext(UserContext);
}

function sleep(ms:number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Provider pour englober l'application
export default function UserProvider({ children }: { children: ReactNode }): ReactNode {
  const [user, setUser] = useState<User | null>(null);
  const tokenRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const userData = await UserApi.getMe();
      /* await sleep(1000) */
      
      setUser(userData);
      if (userData?.userType === "user") {
        router.replace("/(authorized)/(usertabs)");
      } else if (userData?.userType === "pro") {
        router.replace("/(authorized)/(protabs)");
      } else {
        router.replace("/login");
      }
    } catch (error) {
      console.error("Erreur", error);
    }
    setIsLoading(false);
    console.log('isloading',isLoading)
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signIn = useCallback(async (token: string) => {
    await SecureStore.setItemAsync("userToken", token);
    tokenRef.current = token;
    fetchUser();
  }, []);

  const signOut = useCallback(async () => {
    console.log("test");
    await SecureStore.deleteItemAsync("userToken");
    tokenRef.current = null;
    router.replace("/login");
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isLoading, signIn, signOut, token: tokenRef }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
