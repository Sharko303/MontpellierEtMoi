import { ScrollView, StyleSheet, VirtualizedList } from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuthSession } from "@/context/UserContext";
import Search from "@/components/search";
import CategoryList from "@/components/CategoryList";
import PlayGame from "@/components/PlayGame";
import { styles } from "@/styles/styles";
import Favorite from "@/components/Favorite";
import Partnership from "@/components/user/partnership";

export default function TabOneScreen() {
  const user = useAuthSession();
  return (
    <>
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "white" }} nestedScrollEnabled={true}>
      <Text style={stylesOverride.titleOverride}>Bienvenue {user.user?.firstName}</Text>
      <Text style={[styles.muted, styles.font4, styles.mt2]}>Prêt à te challenger ?</Text>
      <Search />
      <CategoryList />
      <PlayGame />
      <Favorite />
      <View style={styles.hr} />
      <Text style={styles.subTitle}>Tendances</Text>
      <Partnership />
    </ScrollView>
    </>
  );
}

const stylesOverride = StyleSheet.create({
  titleOverride: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
