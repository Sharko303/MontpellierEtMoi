import { StyleSheet, VirtualizedList } from "react-native";
import { ShopApi } from "@/api/shop";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import MerchantCard from "@/components/MerchantCard";
import { ApiResultInterface } from "@/entities/apiResult";
import Partnership from "@/components/user/partnership";
import AccountPro from "@/components/pro/account";

export default function TabOneScreen() {
  return <AccountPro />;
}
