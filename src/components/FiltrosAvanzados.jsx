import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ArrowLeft } from "lucide-react";

const FiltrosAvanzados = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Estados
  const [comuna, setComuna] = useState(searchParams.get("comuna") || "");
  const [supDesde, setSupDesde] = useState(searchParams.get("sup_desde") || "");
  const [supHasta, setSupHasta] = useState(searchParams.get("sup_hasta") || "");
  const [precioDesde, setPrecioDesde] = useState(searchParams.get("precio_desde") || "");
  const [precioHasta, setPrecioHasta] = useState(searchParams.get("precio_hasta") || "");
  const [moneda, setMoneda] = useState(searchParams.get("moneda") || "CLP");
  const [orden, setOrden] = useState(searchParams.get("orden") || "desc");

  useEffect(() => {
    setComuna(searchParams.get("comuna") || "");
    setSupDesde(searchParams.get("sup_desde") || "");
    setSupHasta(searchParams.get("sup_hasta") || "");
    setPrecioDesde(searchParams.get("precio_desde") || "");
    setPrecioHasta(searchParams.get("precio_hasta") || "");
    setMoneda(searchParams.get("moneda") || "CLP");
    setOrden(searchParams.get("orden") || "desc");
  }, [searchParams]);

  const handleAplicar = () => {
    const params = new URLSearchParams(searchParams);
    
    if (comuna) params.set("comuna", comuna); else params.delete("comuna");
    if (supDesde) params.set("sup_desde", supDesde); else params.delete("sup_desde");
    if (supHasta) params.set("sup_hasta", supHasta); else params.delete("sup_hasta");
    if (precioDesde) params.set("precio_desde", precioDesde); else params.delete("precio_desde");
    if (precioHasta) params.set("precio_hasta", precioHasta); else params.delete("precio_hasta");
    params.set("moneda", moneda);
    params.set("orden", orden);
    params.set("page", "1"); // Reiniciar a página 1 al filtrar
    
    setSearchParams(params);
  };

  const handleVolver = () => {
    // Limpia los filtros avanzados pero conserva la propiedad y la acción base
    const params = new URLSearchParams();
    if (searchParams.get("tipo_prop")) params.set("tipo_prop", searchParams.get("tipo_prop"));
    if (searchParams.get("obj")) params.set("obj", searchParams.get("obj"));
    params.set("page", "1");
    
    setSearchParams(params);
    
    // Limpiar estados locales visuales
    setComuna("");
    setSupDesde("");
    setSupHasta("");
    setPrecioDesde("");
    setPrecioHasta("");
    setMoneda("CLP");
    setOrden("desc");
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#1a1a1a]/80 backdrop-blur-md border border-[#24B6C1]/30 p-5 rounded-[24px] shadow-xl font-[Outfit] text-white flex flex-col gap-5">
      
      {/* FILA 1: Título/Icono, Comuna y Precio | Moneda */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        
        {/* Icono y Título */}
        <div className="md:col-span-2 flex items-center gap-2 h-[42px]">
           <SlidersHorizontal size={20} className="text-[#24B6C1]" />
           <span className="font-semibold text-sm whitespace-nowrap">Filtros Opcionales:</span>
        </div>

        {/* Comuna */}
        <div className="md:col-span-4 flex flex-col gap-1.5">
          <label className="text-xs text-white/70 px-1">Comuna</label>
          <input 
            type="text" 
            value={comuna} 
            onChange={(e) => setComuna(e.target.value)} 
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-[#24B6C1] outline-none transition-colors placeholder-white/30" 
            placeholder="Ej: Las Condes" 
          />
        </div>

        {/* Precio | Moneda */}
        <div className="md:col-span-6 flex flex-col gap-1.5">
           <label className="text-xs text-white/70 px-1">Precio | Moneda</label>
           <div className="flex gap-2">
              <input 
                type="number" 
                value={precioDesde} 
                onChange={(e) => setPrecioDesde(e.target.value)} 
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-[#24B6C1] outline-none transition-colors placeholder-white/30" 
                placeholder="Desde" 
              />
              <input 
                type="number" 
                value={precioHasta} 
                onChange={(e) => setPrecioHasta(e.target.value)} 
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-[#24B6C1] outline-none transition-colors placeholder-white/30" 
                placeholder="Hasta" 
              />
              <select 
                value={moneda} 
                onChange={(e) => setMoneda(e.target.value)} 
                className="bg-black/60 border border-white/10 rounded-xl px-2 py-2.5 text-sm outline-none focus:border-[#24B6C1] transition-colors"
              >
                <option value="CLP">CLP</option>
                <option value="UF">UF</option>
              </select>
           </div>
        </div>

      </div>

      {/* FILA 2: Superficie, Ordenar por y Botones */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        
        {/* Superficie */}
        <div className="md:col-span-5 flex flex-col gap-1.5">
           <label className="text-xs text-white/70 px-1">Superficie (m²)</label>
           <div className="flex gap-2">
              <input 
                type="number" 
                value={supDesde} 
                onChange={(e) => setSupDesde(e.target.value)} 
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-[#24B6C1] outline-none transition-colors placeholder-white/30" 
                placeholder="Desde" 
              />
              <input 
                type="number" 
                value={supHasta} 
                onChange={(e) => setSupHasta(e.target.value)} 
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-[#24B6C1] outline-none transition-colors placeholder-white/30" 
                placeholder="Hasta" 
              />
           </div>
        </div>

        {/* Ordenar por */}
        <div className="md:col-span-3 flex flex-col gap-1.5">
           <label className="text-xs text-white/70 px-1">Ordenar por</label>
           <select 
             value={orden} 
             onChange={(e) => setOrden(e.target.value)} 
             className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#24B6C1] transition-colors text-white"
           >
             <option value="desc">Mayor precio</option>
             <option value="asc">Menor precio</option>
           </select>
        </div>

        {/* Botones de acción */}
        <div className="md:col-span-4 flex gap-2 items-end">
          <button 
            onClick={handleVolver}
            title="Quitar filtros y volver a la búsqueda base"
            className="bg-gray-600/60 hover:bg-gray-500 text-white h-[42px] px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-1.5 border border-white/10"
          >
            <ArrowLeft size={16} /> Volver
          </button>
          
          <button 
            onClick={handleAplicar} 
            className="flex-1 bg-[#24B6C1] hover:bg-cyan-600 h-[42px] rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(36,182,193,0.2)] whitespace-nowrap"
          >
            APLICAR
          </button>
        </div>

      </div>

    </div>
  );
};

export default FiltrosAvanzados;