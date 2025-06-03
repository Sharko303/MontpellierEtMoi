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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { styles } from "@/styles/styles";

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
  const [contract, setContract] = useState(null);
  useEffect(() => {
    // on récupére les plan
    const fetchSubscriptions = async () => {
      const response = await Subscription.getAllSubscriptions();
      setSubscriptions(response);
      const subscription = await CommercantApi.getContract()
      setContract(subscription);
      console.log(subscription)
    };
    fetchSubscriptions();
  }, []);

  const feature = [
    { id: "1", title: "Accès au tableau de bord", included: true },
    { id: "2", title: "Statistiques de base", included: true },
    { id: "3", title: "Support par email", included: true },
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
    <KeyboardAvoidingView 
    style={{ flex: 1, backgroundColor: "white" }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
  >
      <ScrollView style={{backgroundColor:"white"}}>
        <Text style={styles.title}>Choisissez votre abonnement</Text>
        <Text style={[styles.subtitle, styles.textCenter, {marginBottom: 40}]}>
          Sélectionnez le plan qui correspond à vos besoins
        </Text>

        <View style={styles.plansContainer}>
          {subscriptions.map((subscription) => (
            <TouchableOpacity
              key={subscription.id}
              style={[
                styles.planCard,
                selectedPlan === subscription.id.toString() &&
                styles.selectedPlan,
                subscription.id == contract?.typeId && styles.recommendedPlan,
              ]}
              onPress={() => setSelectedPlan(subscription.id.toString())}
            >
              {subscription.id == contract?.typeId && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>En cours</Text>
                </View>
              )}
              <Text style={styles.planName}>{subscription.name}</Text>
              <Text style={styles.planPrice}>
                {subscription.price}€ / <Text style={styles.planPeriod}>mois</Text>
              </Text>

              <View style={styles.featuresList}>
                {feature.map((feature) => (
                  <View key={feature.id} style={styles.featureItem}>
                    <Text
                      style={[
                        styles.featureText,
                        !subscription.accessToDasboard &&
                          styles.featureDisabled,
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
                style={styles.inputPayment}
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
                  style={styles.inputPayment}
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
                  style={styles.inputPayment}
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>
            <View style={styles.center}>
              <TouchableOpacity style={styles.button} onPress={handlePayment}>
                <Text style={[styles.payButtonText, styles.textCenter]}>
                  Payer{" "}
                  {
                    subscriptions.find((p) => p.id === parseInt(selectedPlan))
                      ?.price
                  }
                  €
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      </KeyboardAvoidingView>
  );
};

export default SubscriptionPage;
