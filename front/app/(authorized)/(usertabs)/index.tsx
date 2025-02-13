import { StyleSheet, VirtualizedList } from "react-native";
import { ApiResult } from "@/api/apiResult";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import MerchantCard from "@/components/MerchantCard";
import { ApiResultInterface } from "@/entities/apiResult";
import Partnership from "@/components/user/partnership";
import AccountPro from "@/components/pro/account";

export default function TabOneScreen() {
  return <Partnership />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
