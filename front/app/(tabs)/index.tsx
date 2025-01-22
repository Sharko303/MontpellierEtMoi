import { StyleSheet } from 'react-native';

import { CommercantApi } from '@/api/commerceApi';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {

  const [commerceTab, setCommerceTab] = useState([]);

  const handleSearchCommerce = async () => {
    const result = await CommercantApi.getCommercants();
    console.log("result : ", result);
    setCommerceTab(result);
  }
  useEffect(() => {
    handleSearchCommerce();
    console.log("data : ", commerceTab);
  }
  , []);
console.log("data : ", commerceTab);
  return (
    <View>
      <Text style={styles.title}>Accueil</Text>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
/*   container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, */
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
