import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Form } from "@/entities/Types";
import { ApiResultInterface } from "@/entities/apiResult";
import { ApiResult } from "@/api/apiResult";

const StepOneForm = ({ control, nextStep }: Form) => {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [apiResult, setApiResult] = useState<ApiResultInterface[]>([]);
  const [isSearching, setIsSearching] = useState(true);

  const handleSearchCommerce = async () => {
    try {
      const result = await ApiResult.getApiResult();
      if (result) {
        setApiResult(result);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
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
              <Text style={styles.resetButtonText}>Nouvelle recherche</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={apiResult.filter((e) => 
            e.name.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 5)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.resultItem,
                value?.id === item.id && styles.selectedItem
              ]}
              onPress={() => {
                // Ici, on s'assure de passer uniquement les champs nécessaires
                onChange({
                  id: item.id.toString(),
                  name: item.name
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

      <TouchableOpacity 
        style={styles.nextButton}
        onPress={nextStep}
      >
        <Text style={styles.nextButtonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  resultsList: {
    maxHeight: 200,
    marginBottom: 16,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
  },
  resultItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedContainer: {
    marginBottom: 16,
  },
  selectedEtablissement: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b8daff',
  },
  selectedName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  resetButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  imageSection: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  uploadButton: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default StepOneForm;