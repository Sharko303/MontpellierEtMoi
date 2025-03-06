// app/services/ToastService.ts
import { ToastType } from '@/components/toast/ToastContext';

type ShowToastFunction = (type: ToastType, message: string) => void;

// Singleton pour accéder au toast de n'importe où
class ToastService {
  private static instance: ToastService;
  private showToastFunction: ShowToastFunction | null = null;

  private constructor() {}

  public static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  public setShowToast(showToast: ShowToastFunction): void {
    this.showToastFunction = showToast;
  }

  public show(type: ToastType, message: string): void {
    if (this.showToastFunction) {
      this.showToastFunction(type, message);
    } else {
      console.warn('Toast non initialisé. Assurez-vous que ToastProvider est utilisé au niveau du layout.');
    }
  }
}

export const Toast = ToastService.getInstance();