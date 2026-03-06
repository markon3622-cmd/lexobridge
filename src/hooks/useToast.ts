import { useState, useCallback } from 'react';
import type { ToastData, ToastType } from '../components/Toast';

let _nextId = 1;

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = _nextId++;
    setToasts(prev => [...prev, { id, type, title, message }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showSuccess = useCallback((title: string, message: string) => addToast('success', title, message), [addToast]);
  const showError   = useCallback((title: string, message: string) => addToast('error',   title, message), [addToast]);

  return { toasts, removeToast, showSuccess, showError };
}
