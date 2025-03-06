// app/components/toast/ToastContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Définir les types
export type ToastType = 'success' | 'info' | 'warning' | 'danger';

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toasts: ToastData[];
  show: (type: ToastType, message: string) => void;
  hide: (id: string) => void;
}

// Créer le contexte
export const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le Toast
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast doit être utilisé à l\'intérieur de ToastProvider');
  }
  return context;
};

// Provider pour le Toast
export const ToastProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = (type: ToastType, message: string) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
  };

  const hide = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const contextValue: ToastContextType = {
    toasts,
    show,
    hide
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};