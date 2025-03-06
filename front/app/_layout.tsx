import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ToastProvider, useToast } from "@/components/toast/ToastContext";
import { ToastContainer } from '@/components/toast/ToastContainer';
import { Toast } from './services/ToastService';
import Register from "./register";

import { useColorScheme } from "@/components/useColorScheme";
import UserProvider from "@/context/UserContext";
import { User } from "@/entities/Types";
import Login from "./login";
import { Text } from "react-native";

// Composant pour initialiser le service Toast
const ToastInitializer: React.FC = () => {
  const { show } = useToast();
  
  useEffect(() => {
    // Initialiser le service Toast global
    Toast.setShowToast(show);
  }, [show]);
  
  return null;
};


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //const { isLoading } = useUser(); // On récupère l'utilisateur

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ToastProvider>
      <UserProvider>
        <Slot />
        <ToastInitializer />
        <ToastContainer />
      </UserProvider>
</ToastProvider>
  );
}

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//   const { user, isLoading } = useUser(); // On récupère l'utilisateur
//   const [currentUser, setCurrentUser] = useState<User | null>(null); // État local pour forcer un re-render

//   useEffect(() => {
//     if (user !== null) {
//       setCurrentUser(user); // Mettre à jour l'utilisateur et forcer le re-render
//     }
//   }, [user]);

//   if (!user) {
//     return <Login />;
//   }

//   if (isLoading || currentUser === null) {
//     return <Slot />; // On attend que l'utilisateur soit chargé
//   }
//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen
//           name="login"
//           options={{ title: "Se connecter" }} // Option pour le titre
//         />
//         {/* {user?.userType === "pro" ? (
//             <Stack.Screen name="(protabs)" options={{ headerShown: false }} />
//           ) : (
//             <Stack.Screen name="(usertabs)" options={{ headerShown: false }} />
//           )} */}
//         <Stack.Screen name="modal" options={{ presentation: "modal" }} />
//         <Stack.Screen
//           name="register"
//           options={{ title: "S'enregistrer" }} // Option pour le titre
//         />
//         <Stack.Screen
//           name="registerpro"
//           options={{ title: "S'inscrire" }} // Option pour le titre
//         />
//       </Stack>
//     </ThemeProvider>
//   );
// }
