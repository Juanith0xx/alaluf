import React, { useState } from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

const AdvancedSearch = ({ onSearch, initialData }) => {
  const [filters, setFilters] = useState(initialData || { obj: 1, comuna: "", super_min: "", super_max: "", precio_min: "", precio_max: "" });

  return (
    <div className="bg-[#111111] border border-white/10 p-8 rounded-[40px] shadow-2xl space-y-6">
      <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Búsqueda Avanzada</h3>
      
      {/* TABS COMPRAR/ARRENDAR */}
      <div className="grid grid-cols-2 bg-white/5 rounded-2xl p-1">
        {[{l: "Comprar", v: 1}, {l: "Arrendar", v: 2}].map((opt) => (
          <button key={opt.v} onClick={() => setFilters({...filters, obj: opt.v})}
            className={`py-3 text-xs font-bold rounded-xl transition-all ${filters.obj === opt.v ? "bg-[#24B6C1] text-white" : "text-white/40"}`}>
            {opt.l}
          </button>
        ))}
      </div>

      {/* INPUTS ESTILO ALALUF */}
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-2">
            <label className="text-[10px] uppercase text-white/50">Comuna</label>
            <input className="w-full bg-transparent py-2 text-xs text-white focus:outline-none" placeholder="Seleccionar comuna..." />
        </div>
        
        <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-2">
            <div>
                <label className="text-[10px] uppercase text-white/50">Superficie Desde</label>
                <input className="w-full bg-transparent py-2 text-xs text-white focus:outline-none" placeholder="0 m²" />
            </div>
            <div>
                <label className="text-[10px] uppercase text-white/50">Hasta</label>
                <input className="w-full bg-transparent py-2 text-xs text-white focus:outline-none" placeholder="999 m²" />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-2">
            <div>
                <label className="text-[10px] uppercase text-white/50">Precio Desde</label>
                <input className="w-full bg-transparent py-2 text-xs text-white focus:outline-none" placeholder="0" />
            </div>
            <div>
                <label className="text-[10px] uppercase text-white/50">Hasta</label>
                <input className="w-full bg-transparent py-2 text-xs text-white focus:outline-none" placeholder="999.999" />
            </div>
        </div>
      </div>

      <button className="w-full bg-[#24B6C1] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-cyan-600 transition-all flex items-center justify-center gap-2">
        <FaSearch /> Buscar
      </button>
    </div>
  );
};

export default AdvancedSearch;