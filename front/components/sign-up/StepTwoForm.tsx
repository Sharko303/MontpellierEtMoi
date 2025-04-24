import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Form } from "@/entities/Types";
import { styles } from "@/styles/styles";

const StepTwoForm = ({ control, nextStep, prevStep }: Form) => {
  const abonnements = [
    { 
      id: "basic", 
      name: "Basic",
      price: "10€/mois",
      description: "Fonctionnalités de base pour démarrer"
    },
    { 
      id: "premium", 
      name: "Premium",
      price: "20€/mois",
      description: "Fonctionnalités avancées pour se développer"
    },
    { 
      id: "vip", 
      name: "VIP",
      price: "50€/mois",
      description: "Accès complet à toutes les fonctionnalités"
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre abonnement</Text>
      
      <View style={styles.plansContainer}>
        {abonnements.map((plan) => (
          <Controller
            key={plan.id}
            control={control}
            name="abonnement"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => onChange(plan.id)}
                style={[
                  styles.planCard,
                  value === plan.id && styles.selectedPlan
                ]}
              >
                <View style={styles.planHeader}>
                  <Text style={[
                    styles.planName,
                    value === plan.id && styles.selectedText
                  ]}>
                    {plan.name}
                  </Text>
                  <Text style={[
                    styles.planPrice,
                    value === plan.id && styles.selectedText
                  ]}>
                    {plan.price}
                  </Text>
                </View>
                <Text style={[
                  styles.planDescription,
                  value === plan.id && styles.selectedText
                ]}>
                  {plan.description}
                </Text>
                {value === plan.id && (
                  <View style={styles.selectedBadge}>
                    <Text style={styles.selectedBadgeText}>Sélectionné</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        ))}
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={prevStep}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={nextStep}
        >
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default StepTwoForm;