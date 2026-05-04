import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronDown, Check, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [tipoPropiedad, setTipoPropiedad] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedComuna, setSelectedComuna] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [accionActiva, setAccionActiva] = useState("Arrendar");
  
  const dropdownRef = useRef(null);
  const suggestionRef = useRef(null);
  const navigate = useNavigate();

  // Dataset actualizado según hoja 'Comunas'
  const comunasDataset = [
    { label: "Santiago", id: "13101" },
    { label: "Cerrillos", id: "13102" },
    { label: "Cerro Navia", id: "13103" },
    { label: "Conchalí", id: "13104" },
    { label: "El Bosque", id: "13105" },
    { label: "Estación Central", id: "13106" },
    { label: "Huechuraba", id: "13107" },
    { label: "Independencia", id: "13108" },
    { label: "La Cisterna", id: "13109" },
    { label: "La Florida", id: "13110" },
    { label: "La Granja", id: "13111" },
    { label: "La Pintana", id: "13112" },
    { label: "La Reina", id: "13113" },
    { label: "Las Condes", id: "13114" },
    { label: "Lo Barnechea", id: "13115" },
    { label: "Lo Espejo", id: "13116" },
    { label: "Lo Prado", id: "13117" },
    { label: "Macul", id: "13118" },
    { label: "Maipú", id: "13119" },
    { label: "Ñuñoa", id: "13120" },
    { label: "Providencia", id: "13123" },
    { label: "Vitacura", id: "13132" },
    { label: "Colina", id: "13301" },
  ];

  // Categorías actualizadas según hoja 'Tipos Propiedad'
  const propiedades = [
    { 
      nombre: "Residencial", 
      sub: [
        { label: "Casas", id: 1 }, 
        { label: "Departamentos", id: 2 } 
      ] 
    },
    { 
      nombre: "Comercial / Oficinas", 
      sub: [
        { label: "Oficinas", id: 3 }, 
        { label: "Locales", id: 4 },
        { label: "Casa Comercial", id: 5 },
        { label: "Hotelería", id: 13 }
      ] 
    },
    { 
      nombre: "Industrial / Terrenos", 
      sub: [
        { label: "Galpones", id: 8 }, 
        { label: "Bodega Industrial", id: 17 },
        { label: "Terreno Proyectos", id: 6 }, 
        { label: "Terreno Industrial", id: 7 } 
      ] 
    },
    { 
      nombre: "Otros", 
      sub: [
        { label: "Parcela / Sitio", id: 10 }, 
        { label: "Parcela", id: 11 },
        { label: "Edificios Corporativos", id: 12 },
        { label: "Campos", id: 15 }
      ] 
    },
  ];

  const filteredComunas = searchQuery.length > 1 
    ? comunasDataset.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearch = () => {
    const textInput = searchQuery.trim();
    
    // Detección mejorada de Código o ID (ej: 26250 o ID14653)
    const numericCode = textInput.replace(/\D/g, "");
    
    if (numericCode !== "" && (textInput.toLowerCase().startsWith("id") || !isNaN(textInput))) {
      navigate(`/buscar?q=${numericCode}`);
      return;
    }

    // Mapeo según hoja 'Objetivos': Venta = 1, Arriendo = 2
    const objID = (accionActiva === "Comprar" || accionActiva === "Vender") ? 1 : 2;
    const comunaID = selectedComuna?.id || "";

    if (!tipoPropiedad || !comunaID) {
      alert("Por favor, selecciona un tipo de propiedad y una comuna de la lista sugerida.");
      return;
    }

    const params = new URLSearchParams({
      tipo_prop: tipoPropiedad.id,
      obj: objID,
      comuna: comunaID
    });

    navigate(`/buscar?${params.toString()}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenDropdown(false);
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative -mt-80 z-30 px-4 pb-25 font-[Outfit]">
      <div className="max-w-6xl mx-auto bg-gray-200/20 backdrop-blur-md p-4 flex flex-wrap items-center gap-3 justify-center rounded-[40px] border border-white/20 shadow-2xl">
        
        {/* Selector de Objetivo (Hoja Objetivos) */}
        <div className="flex bg-black/60 p-1 rounded-xl border border-white/5">
          {["Comprar", "Vender", "Arrendar"].map((accion) => (
            <button
              key={accion}
              onClick={() => setAccionActiva(accion)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                accionActiva === accion ? "bg-[#24B6C1] text-white shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              {accion}
            </button>
          ))}
        </div>

        {/* Dropdown Tipo Propiedad (Hoja Tipos Propiedad) */}
        <div className="relative w-full sm:w-56" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="px-5 py-4 bg-gray-600/60 text-white rounded-xl flex items-center justify-between w-full border border-white/10"
          >
            <span className="text-sm truncate">{tipoPropiedad?.label || "Tipo de propiedad"}</span>
            <ChevronDown size={16} className={`text-[#24B6C1] transition-transform ${openDropdown ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {openDropdown && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-3 left-0 bg-[#1a1a1a]/95 backdrop-blur-2xl p-3 shadow-2xl w-72 border border-white/10 rounded-2xl z-50"
              >
                <ul className="space-y-1">
                  {propiedades.map((prop, i) => (
                    <li key={i} className="relative group">
                      <div className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#24B6C1]/10 text-white/80 hover:text-[#24B6C1] transition flex items-center justify-between cursor-default">
                        <span className="text-sm font-semibold">{prop.nombre}</span>
                        <ChevronRight size={14} className="text-gray-600" />
                      </div>
                      <ul className="absolute top-0 left-full ml-2 hidden group-hover:block bg-[#1a1a1a] backdrop-blur-2xl w-64 rounded-xl border border-white/10 p-2 shadow-2xl">
                        {prop.sub.map((sub, j) => (
                          <li key={j} onClick={() => { setTipoPropiedad(sub); setOpenDropdown(false); }}
                            className="flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer text-sm text-gray-300 hover:bg-[#24B6C1]/10 hover:text-[#24B6C1]"
                          >
                            {sub.label} {tipoPropiedad?.id === sub.id && <Check size={14} className="text-[#24B6C1]" />}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Comuna con Autocomplete (Hoja Comunas) */}
        <div className="flex-1 min-w-[240px] relative" ref={suggestionRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
              if (selectedComuna) setSelectedComuna(null);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Comuna, ciudad o código..."
            className="w-full px-6 py-4 bg-gray-400/90 text-white rounded-xl placeholder-white/90 focus:outline-none focus:ring-1 focus:ring-[#24B6C1] text-sm"
          />

          <AnimatePresence>
            {showSuggestions && filteredComunas.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute top-full mt-2 left-0 w-full bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto"
              >
                {filteredComunas.map((c) => (
                  <div key={c.id} onClick={() => {
                      setSearchQuery(c.label);
                      setSelectedComuna(c);
                      setShowSuggestions(false);
                    }}
                    className="px-6 py-3 hover:bg-[#24B6C1]/20 cursor-pointer text-sm text-gray-300 flex items-center justify-between"
                  >
                    {c.label} <span className="text-[10px] text-gray-500">ID: {c.id}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={handleSearch}
          className="px-8 py-4 bg-[#24B6C1] hover:bg-cyan-600 text-white rounded-xl flex items-center gap-2 transition-all group shadow-lg"
        >
          <span className="text-sm font-bold">Buscar</span>
          <Search size={18} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;