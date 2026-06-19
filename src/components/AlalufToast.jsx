import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

const AlalufToast = ({ visible, message, type = "success", onClose }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-4 bg-[#0f0f0f] text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-800 min-w-[320px] max-w-sm font-[Outfit]"
        >
          {type === 'success' ? (
            <CheckCircle2 className="text-[#24B6C1]" size={24} />
          ) : (
            <AlertCircle className="text-[#24B6C1]" size={24} />
          )}
          
          <p className="flex-1 text-sm font-medium">{message}</p>
          
          <button onClick={onClose} className="text-gray-500 hover:text-white transition">
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlalufToast;