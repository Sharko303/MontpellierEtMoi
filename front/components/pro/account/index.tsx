import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserApi } from "@/api/userApi";
import SubscriptionPage from "@/components/pro/payment/";


export default function AccountPro() {
    const navigation = useNavigation();
    return <SubscriptionPage />
}
