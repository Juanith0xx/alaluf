import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

const AlalufToast = ({ visible, message, type = "success", onClose }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // initial: Aparece desde 100px a la derecha y oculto
          initial={{ opacity: 0, x: 100 }}
          // animate: Se desliza a su posición original (0) y se vuelve visible
          animate={{ opacity: 1, x: 0 }}
          // exit: Se desliza de vuelta a la derecha al cerrar
          exit={{ opacity: 0, x: 100 }}
          // transition: Tipo 'spring' para un efecto físico suave y natural
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-4 bg-[#0f0f0f] text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-800 min-w-[320px] max-w-sm font-[Outfit]"
        >
          {type === 'success' ? (
            <CheckCircle2 className="text-[#24B6C1]" size={24} />
          ) : (
            <AlertCircle className="text-[#24B6C1]" size={24} />
          )}
          
          <p className="flex-1 text-sm font-medium">{message}</p>
          
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlalufToast;