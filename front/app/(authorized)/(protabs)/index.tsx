import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  VirtualizedList,
  ScrollView,
} from "react-native";
import axios from "axios";
import MerchantCard from "@/components/MerchantCard";
import { ApiResultInterface } from "@/entities/apiResult";
import { COLORS, styles } from "@/styles/styles";
import { CodePromo } from "@/api/codePromo";
import { useAuthSession } from "@/context/UserContext";
import { useFocusEffect } from "expo-router";

export default function SearchScreen() {
  const [results, setResults] = useState([]);
  const user = useAuthSession();

  const handleGetCodePromo = async () => {
    console.log("hello")
    if(user) {
    const response = await CodePromo.getAllByMerchant();
    if (response) {
      setResults(response);
    } else {
      setResults([]);
    }
    console.log("results:", results);
  }
  };
  useFocusEffect(
    useCallback(() => {
      handleGetCodePromo();
    }, [])
  ), [];
  // Calcul des statistiques des codes promo
  const promoStats = useMemo(() => {
    const enAttente = results.filter(promo => !promo.userId); // Pas d'userId = en attente
    const gagnes = results.filter(promo => promo.userId && promo.valid); // userId présent et valid = gagné mais pas utilisé
    const utilises = results.filter(promo => promo.userId && !promo.valid); // userId présent et !valid = utilisé

    return {
      enAttente,
      gagnes,
      utilises
    };
  }, [results]);

  const StatBlock = ({ title, count, data, color, icon }) => (
    <View style={[styles.statBlock, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={[styles.statCount, { color }]}>{count}</Text>
      {count > 0 && (
        <View style={styles.statDetails}>
          <Text style={styles.statSubtext}>
            {count === 1 ? 'code promo' : 'codes promo'}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView /* contentContainerStyle={styles.scrollContainer} */>
        <View style={[styles.container, { backgroundColor: "white" }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard Codes Promo</Text>
          <Text style={styles.headerSubtitle}>
            Aperçu de vos {results.length} codes promo générés
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <StatBlock
            title="En Attente"
            count={promoStats.enAttente.length}
            data={promoStats.enAttente}
            color="#b5b5b5"
            icon="⏳"
          />

          <StatBlock
            title="Gagnés"
            count={promoStats.gagnes.length}
            data={promoStats.gagnes}
            color={COLORS.primary}
            icon="🎉"
          />

          <StatBlock
            title="Utilisés"
            count={promoStats.utilises.length}
            data={promoStats.utilises}
            color={COLORS.success}
            icon="✅"
          />
        </View>

        {/* Section détaillée optionnelle */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Résumé</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total générés:</Text>
              <Text style={styles.summaryValue}>{results.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taux d'utilisation:</Text>
              <Text style={styles.summaryValue}>
                {results.length > 0 
                  ? `${Math.round((promoStats.utilises.length / results.length) * 100)}%`
                  : '0%'
                }
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>En cours:</Text>
              <Text style={styles.summaryValue}>
                {promoStats.enAttente.length + promoStats.gagnes.length}
              </Text>
            </View>
          </View>
        </View>
    </View>
      </ScrollView>
  );
};



