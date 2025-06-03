import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Form } from "@/entities/Types";
import { ApiResultInterface } from "@/entities/apiResult";
import { ShopApi } from "@/api/shop";
import { styles } from "@/styles/styles";

const StepOneForm = ({ control, nextStep }: Form) => {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [apiResult, setApiResult] = useState<ApiResultInterface[]>([]);
  const [isSearching, setIsSearching] = useState(true);

  const handleSearchCommerce = async () => {
      const result = await ShopApi.getShop();
      if (result) {
        setApiResult(result);
      }
  };

  useEffect(() => {
    handleSearchCommerce();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recherchez votre établissement :</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Nom de l'établissement"
        style={styles.input}
        placeholderTextColor="#666"
      />

      <Controller
        control={control}
        name="etablissement"
        render={({ field: { onChange, value } }) => (
          <>
            {value && !isSearching ? (
              <View style={styles.selectedContainer}>
                <View style={styles.selectedEtablissement}>
                  <Text style={styles.selectedName}>{value.name}</Text>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => {
                      onChange(null);
                      setIsSearching(true);
                    }}
                  >
                    <Text style={styles.resetButtonText}>
                      Nouvelle recherche
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <FlatList
                data={apiResult
                  .filter((e) =>
                    e.name.toLowerCase().includes(query.toLowerCase())
                  )
                  .slice(0, 5)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.resultItem,
                      value?.id === item.id && styles.selectedItem,
                    ]}
                    onPress={() => {
                      // Ici, on s'assure de passer uniquement les champs nécessaires
                      onChange({
                        id: item.id.toString(),
                        name: item.name,
                      });
                      setIsSearching(false);
                    }}
                  >
                    <Text style={styles.resultItemText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                style={styles.resultsList}
              />
            )}
          </>
        )}
      />

      <View style={styles.imageSection}>
        <Text style={styles.subtitle}>
          Téléchargez une image de votre établissement :
        </Text>
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value: imageValue } }) => (
            <>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => {
                  const newImage = "image_placeholder.png";
                  setImage(newImage);
                  onChange(newImage);
                }}
              >
                <Text style={styles.uploadButtonText}>Choisir une image</Text>
              </TouchableOpacity>
              {imageValue && (
                <Image
                  source={{ uri: imageValue }}
                  style={styles.previewImage}
                />
              )}
            </>
          )}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
        <Text style={styles.nextButtonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StepOneForm;
