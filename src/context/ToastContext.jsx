import { createContext, useContext, useState } from "react";
import AlalufToast from "../components/AlalufToast"; 
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    // El toast se cierra solo después de 5 segundos
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 5000);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <AlalufToast 
        visible={toast.visible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
      />
    </ToastContext.Provider>
  );
};

// Hook personalizado para usarlo fácilmente
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe ser usado dentro de un ToastProvider");
  }
  return context;
};