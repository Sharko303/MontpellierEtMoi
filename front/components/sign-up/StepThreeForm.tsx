import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { ValidForm } from "@/entities/Types";

const StepThreeForm = ({ control, prevStep, handleSubmit, handleSubmitForm }: ValidForm) => {
  const renderInput = (
    name: string,
    label: string,
    options: {
      keyboardType?: 'default' | 'email-address' | 'phone-pad',
      secureTextEntry?: boolean,
      placeholder?: string
    } = {}
  ) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={options.placeholder || label}
            placeholderTextColor="#999"
            {...options}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informations personnelles</Text>

      <View style={styles.formContainer}>
        {renderInput("email", "Email", {
          keyboardType: "email-address",
          placeholder: "votremail@exemple.com"
        })}

        {renderInput("password", "Mot de passe", {
          secureTextEntry: true,
          placeholder: "••••••••"
        })}

        {renderInput("passwordRetype", "Confirmer le mot de passe", {
          secureTextEntry: true,
          placeholder: "••••••••"
        })}

        <View style={styles.nameContainer}>
          {renderInput("firstName", "Prénom")}
          {renderInput("lastName", "Nom")}
        </View>

        {renderInput("phoneNumber", "Numéro de téléphone", {
          keyboardType: "phone-pad",
          placeholder: "+33 6 XX XX XX XX"
        })}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={prevStep}
        >
          <Text style={styles.backButtonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit(handleSubmitForm)}
        >
          <Text style={styles.submitButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#dc3545',
    backgroundColor: '#fff8f8',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StepThreeForm;