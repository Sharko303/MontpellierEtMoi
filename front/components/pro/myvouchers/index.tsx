import { CommercantApi } from '@/api/commerceApi';
import { useAuthSession } from '@/context/UserContext';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

const QRCodeGeneratorScreen = () => {
  const [numberOfQRCodes, setNumberOfQRCodes] = useState('');
  const [description, setDescription] = useState('');
  const authSession = useAuthSession(); 

  const handleGenerate = async () => {
    const number = parseInt(numberOfQRCodes);
    const data = { number, description, user: authSession.user };
    const response = await CommercantApi.createPromoCode(data);
    if(response.error) {
      Alert.alert('Erreur', response.error);
      return;
    }
    console.log('Succès', `Génération de ${number} QR codes en cours...`);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Générateur de QR Codes</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre de QR codes à générer</Text>
            <TextInput
              style={styles.input}
              value={numberOfQRCodes}
              onChangeText={setNumberOfQRCodes}
              keyboardType="numeric"
              placeholder="Entrez le nombre de QR codes"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Entrez la description"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity 
            style={styles.generateButton}
            onPress={handleGenerate}
          >
            <Text style={styles.generateButtonText}>Générer les QR Codes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  generateButton: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QRCodeGeneratorScreen;