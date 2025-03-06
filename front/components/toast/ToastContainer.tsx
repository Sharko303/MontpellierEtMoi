// app/components/toast/ToastContainer.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Toast } from './Toast';
import { useToast } from './ToastContext';

export const ToastContainer: React.FC = () => {
  const { toasts, hide } = useToast();

  return (
    <View style={styles.toastContainer}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => hide(toast.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
});