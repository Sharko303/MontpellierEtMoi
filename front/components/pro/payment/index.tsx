import { CommercantApi } from "@/api/commerceApi";
import { Subscription } from "@/api/subscription";
import { UserApi } from "@/api/userApi";
import { useAuthSession } from "@/context/UserContext";
import { SubscriptionType } from "@/entities/Types";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

interface PlanFeature {
  id: string;
  title: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: PlanFeature[];
  recommended?: boolean;
}
const registerSchema = z.object({
  subscriptionType: z.enum(["basic", "premium", "enterprise"], {
    required_error: "Veuillez choisir un abonnement",
  }),
  cardNumber: z.string().min(6, "Votre carte n'est pas valide"),
  expiryDate: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  cvv: z.string(),
});
const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const authSession = useAuthSession();
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  useEffect(() => {
    // on récupére les plan
    const fetchSubscriptions = async () => {
      const response = await Subscription.getAllSubscriptions();
      setSubscriptions(response);
      console.log(response);
    };
    fetchSubscriptions();
  }, []);

  const feature = [
    { id: "1", title: "Accès au tableau de bord", included: true },
    { id: "2", title: "Statistiques de base", included: true },
    { id: "3", title: "Support par email", included: true },
  ];
  const plan: Plan[] = [
    {
      id: "basic",
      name: "Basic",
      price: "10",
      period: "mois",
      features: [
        { id: "1", title: "Accès au tableau de bord", included: true },
        { id: "2", title: "Statistiques de base", included: true },
        { id: "3", title: "Support par email", included: true },
        { id: "4", title: "Analyses avancées", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "20",
      period: "mois",
      recommended: true,
      features: [
        { id: "1", title: "Accès au tableau de bord", included: true },
        { id: "2", title: "Statistiques de base", included: true },
        { id: "3", title: "Support par email", included: true },
        { id: "4", title: "Analyses avancées", included: true },
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "50",
      period: "mois",
      features: [
        { id: "1", title: "Accès au tableau de bord", included: true },
        { id: "2", title: "Statistiques de base", included: true },
        { id: "3", title: "Support prioritaire 24/7", included: true },
        { id: "4", title: "Analyses avancées personnalisées", included: true },
      ],
    },
  ];

  const handlePayment = async () => {
    // Implémenter la logique de paiement ici
    console.log(
      "Procéder au paiement pour le plan:",
      selectedPlan,
      cardNumber,
      expiryDate,
      cvv
    );

    const data = {
      subscriptionType: selectedPlan,
      cardNumber,
      expiryDate,
      cvv,
      user: authSession.user,
    };
    const response = await CommercantApi.payment(data);
    if (response.error) {
      console.log("Erreur lors du paiement", response.error);
      return;
    }
    console.log("Paiement effectué avec succès", response);
  };

  const formatCardNumber = (text: string) => {
    // Format: XXXX XXXX XXXX XXXX
    /* const cleaned = text.replace(/\s/g, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0; i < match.length && i < 16; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.join(' '); */
    return text;
  };

  const formatExpiryDate = (text: string) => {
    // Format: MM/YY
    const cleaned = text.replace(/[^\d]/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Choisissez votre abonnement</Text>
        <Text style={styles.subtitle}>
          Sélectionnez le plan qui correspond à vos besoins
        </Text>

        <View style={styles.plansContainer}>
          {subscriptions.map((subscription) => (
            <TouchableOpacity
              key={subscription.id}
              style={[
                styles.planCard,
                /* selectedPlan === subscription.id && styles.selectedPlan,
                subscription.recommended && styles.recommendedPlan, */
              ]}
              onPress={() => setSelectedPlan(subscription.id.toString())}
            >
              {/* {subscription.recommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>Recommandé</Text>
                </View>
              )} */}
              <Text style={styles.planName}>{subscription.name}</Text>
              <Text style={styles.planPrice}>
                {subscription.price}€<Text style={styles.planPeriod}>mois</Text>
              </Text>

              <View style={styles.featuresList}>
                {feature.map((feature) => (
                  <View key={feature.id} style={styles.featureItem}>
                    <Text
                      style={[
                        styles.featureText,
                        !subscription.accessToDasboard && styles.featureDisabled,
                      ]}
                    >
                      {feature.included ? "✓" : "×"} {feature.title}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {selectedPlan && (
          <View style={styles.paymentSection}>
            <Text style={styles.paymentTitle}>Informations de paiement</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Numéro de carte</Text>
              <TextInput
                style={styles.input}
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.rowInputs}>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}
              >
                <Text style={styles.inputLabel}>Date d'expiration</Text>
                <TextInput
                  style={styles.input}
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Text style={styles.payButtonText}>
                Payer {subscriptions.find((p) => p.id === selectedPlan)?.price}€
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 8,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  plansContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlan: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  recommendedPlan: {
    borderColor: "#28a745",
    borderWidth: 2,
  },
  recommendedBadge: {
    position: "absolute",
    top: -12,
    right: 16,
    backgroundColor: "#28a745",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  planName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  planPrice: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  planPeriod: {
    fontSize: 16,
    color: "#666",
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    fontSize: 14,
    color: "#333",
  },
  featureDisabled: {
    color: "#999",
  },
  paymentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: "row",
    gap: 16,
  },
  payButton: {
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SubscriptionPage;
