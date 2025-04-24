import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StepOneForm from "@/components/sign-up/StepOneForm";
import StepTwoForm from "@/components/sign-up/StepTwoForm";
import StepThreeForm from "@/components/sign-up/StepThreeForm";
import { UserApi } from "@/api/userApi";
import { styles } from "@/styles/styles";

const registerSchema = z
  .object({
    etablissement: z.object({
      id: z.string(),
      name: z.string(),
    }),
    image: z.string().optional(),
    subscriptionType: z.enum(["basic", "premium", "enterprise"], {
      required_error: "Veuillez choisir un abonnement",
    }),
    email: z.string().email("L'email est invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    passwordRetype: z.string(),
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom est requis"),
    phoneNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordRetype, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordRetype"],
  });

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleSubmitForm = async (data) => {
    console.log("Données soumises:", data);
    // Envoi au backend ici grace à UserApi
    const result = registerSchema.safeParse({ 
      email: data.email,
      password: data.password,
      passwordRetype: data.passwordRetype,
      firstName: data.firstName,
      lastName: data.lastName,
      etablissement: data.etablissement,
      subscriptionType: data.subscriptionType,
    });

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      console.log("fieldErrors", fieldErrors);
    } else {
      try {
        const response = await UserApi.registerPro(data);
        console.log("response", response);
      } catch (error) {
        console.error("Erreur lors de l'inscription", error);
      }
    }
    
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      establishment: null,
      image: "",
      subscriptionType: "basic",
      email: "",
      password: "",
      passwordRetype: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOneForm nextStep={nextStep} control={control} errors={errors} />;
      case 2:
        return <StepTwoForm nextStep={nextStep} prevStep={prevStep} control={control} errors={errors} />;
      case 3:
        return <StepThreeForm prevStep={prevStep} handleSubmit={handleSubmit} handleSubmitForm={handleSubmitForm} control={control} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Inscription</Text>
      {renderStep()}
      <Link replace href="/login">
        <Text style={styles.link}>J'ai déjà un compte</Text>
      </Link>
    </SafeAreaView>
  );
}