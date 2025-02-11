import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Form } from "@/entities/Types";

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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  plansContainer: {
    gap: 16,
    marginBottom: 32,
  },
  planCard: {
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlan: {
    borderColor: 'orange',
    borderWidth: 2,
    backgroundColor: '#f8f9ff',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  selectedText: {
    color: 'orange',
  },
  selectedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'orange',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  backButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default StepTwoForm;