import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Controller } from "react-hook-form";
import { ValidForm } from "@/entities/Types";
import { styles } from "@/styles/styles";

const StepThreeForm = ({
  control,
  prevStep,
  handleSubmit,
  handleSubmitForm,
}: ValidForm) => {
  const renderInput = (
    name: string,
    label: string,
    options: {
      keyboardType?: "default" | "email-address" | "phone-pad";
      secureTextEntry?: boolean;
      placeholder?: string;
    } = {}
  ) => (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
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
    <KeyboardAvoidingView 
    style={{ flex: 1, backgroundColor: "white" }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
  >
    <View style={styles.container}>

      <View style={styles.row}>
        {renderInput("firstName", "Prénom*")}
        {renderInput("lastName", "Nom*")}
      </View>
      <View style={styles.formContainer}>
        {renderInput("email", "Email*", {
          keyboardType: "email-address",
          placeholder: "votremail@exemple.com",
        })}

        {renderInput("password", "Mot de passe*", {
          secureTextEntry: true,
          placeholder: "••••••••",
        })}

        {renderInput("passwordRetype", "Confirmer le mot de passe*", {
          secureTextEntry: true,
          placeholder: "••••••••",
        })}

        {renderInput("phoneNumber", "Numéro de téléphone*", {
          keyboardType: "phone-pad",
          placeholder: "+33 6 XX XX XX XX",
        })}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
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
    </KeyboardAvoidingView>
  );
};

export default StepThreeForm;
