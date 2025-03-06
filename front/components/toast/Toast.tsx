// app/components/toast/Toast.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ToastType } from './ToastContext';

// Configuration des types de Toast
export const TOAST_TYPES = {
  success: {
    backgroundColor: '#00C851',
    icon: 'checkcircle',
  },
  info: {
    backgroundColor: '#33B5E5',
    icon: 'infocirlce',
  },
  warning: {
    backgroundColor: '#FFBB33',
    icon: 'warning',
  },
  danger: {
    backgroundColor: '#FF4444',
    icon: 'closecircle',
  },
};

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const { width } = Dimensions.get('window');
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const toastStyle = TOAST_TYPES[type] || TOAST_TYPES.info;

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Disparition automatique
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onClose());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: toastStyle.backgroundColor,
          width: width - 32,
        },
      ]}
    >
      <View style={styles.content}>
        <AntDesign name={toastStyle.icon as any} size={24} color="white" style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <AntDesign name="close" size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  message: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  closeButton: {
    padding: 2,
  },
});