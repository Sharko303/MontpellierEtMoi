import React, { useCallback, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useFocusEffect } from "@react-navigation/native";
import { UserApi } from "@/api/userApi";
import { User } from "@/entities/Types";
import { styles } from "@/styles/styles";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: styles.bgSecondary.backgroundColor,
        tabBarInactiveTintColor: styles.textWhite.color,
        tabBarStyle: {
          backgroundColor: styles.bgPrimary.backgroundColor,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: styles.bgPrimary.backgroundColor,
        },
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          /* headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ), */
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favoris",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="promoCode"
        options={{
          title: "Code promo",
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Mon compte",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
