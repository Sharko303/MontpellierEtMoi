import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/styles'; // Assurez-vous que le chemin est correct

export default function CategoryList() {
  // Définition des catégories avec leurs icônes
  const categories = [
    { id: '1', name: 'Tout', icon: 'grid-outline', background: '#4558C8' },
    { id: '2', name: 'Food', icon: 'restaurant-outline', background: '#EB9A9A' },
    { id: '3', name: 'Vêtements', icon: 'shirt-outline', background: '#F6D9C2'},
    { id: '4', name: 'Culture', icon: 'book-outline', background: '#F79467'},
    { id: '5', name: 'Sport', icon: 'basketball-outline', background: '#C899D0'}
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity 
          key={category.id} 
          style={styles.categoryItem}
          onPress={() => console.log(`Catégorie sélectionnée: ${category.name}`)}
        >
          <View style={[styles.iconBubble, { backgroundColor: category.background }]}>
            <Ionicons name={category.icon} size={24} color="white" />
          </View>
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}