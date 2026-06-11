import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronDown, Check, ChevronRight } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

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

  // 🌟 DATASET COMPLETO DE COMUNAS ACTUALIZADO
  const comunasDataset = [
    { label: "Iquique", id: "1101" },
    { label: "Alto Hospicio", id: "1211" },
    { label: "Pozo Almonte", id: "1401" },
    { label: "Antofagasta", id: "2101" },
    { label: "Calama", id: "2301" },
    { label: "Copiapó", id: "3101" },
    { label: "Freirina", id: "3302" },
    { label: "La Serena", id: "4101" },
    { label: "Coquimbo", id: "4102" },
    { label: "Paihuano", id: "4106" },
    { label: "Los Vilos", id: "4203" },
    { label: "Punitaqui", id: "4204" },
    { label: "Ovalle", id: "4301" },
    { label: "Valparaiso", id: "5101" },
    { label: "Casablanca", id: "5102" },
    { label: "Concón", id: "5103" },
    { label: "Quilpué", id: "5106" },
    { label: "Quintero", id: "5107" },
    { label: "Viña del Mar", id: "5109" },
    { label: "Los Andes", id: "5301" },
    { label: "Rinconada", id: "5303" },
    { label: "Quillota", id: "5501" },
    { label: "Hijuelas", id: "5503" },
    { label: "Limache", id: "5505" },
    { label: "Olmue", id: "5507" },
    { label: "San Antonio", id: "5601" },
    { label: "Algarrobo", id: "5602" },
    { label: "Cartagena", id: "5603" },
    { label: "El Quisco", id: "5604" },
    { label: "Santo Domingo", id: "5606" },
    { label: "El Tabo", id: "5607" },
    { label: "San Felipe", id: "5701" },
    { label: "Catemu", id: "5702" },
    { label: "Putaendo", id: "5705" },
    { label: "Rancagua", id: "6101" },
    { label: "Codegua", id: "6102" },
    { label: "Las Cabras", id: "6107" },
    { label: "Machalí", id: "6108" },
    { label: "La Estrella", id: "6202" },
    { label: "Litueche", id: "6203" },
    { label: "San Fernando", id: "6301" },
    { label: "Chimbarongo", id: "6303" },
    { label: "Santa Cruz", id: "6310" },
    { label: "Talca", id: "7101" },
    { label: "Constitución", id: "7102" },
    { label: "Romeral", id: "7103" },
    { label: "Cauquenes", id: "7201" },
    { label: "Maule", id: "7206" },
    { label: "Curicó", id: "7301" },
    { label: "Linares", id: "7401" },
    { label: "Longaví", id: "7403" },
    { label: "Parral", id: "7404" },
    { label: "Concepción", id: "8101" },
    { label: "San Carlos", id: "8109" },
    { label: "Hualpén", id: "8212" },
    { label: "Los Angeles", id: "8301" },
    { label: "Chillán", id: "8401" },
    { label: "Temuco", id: "9101" },
    { label: "Pucón", id: "9115" },
    { label: "Villarrica", id: "9120" },
    { label: "Puerto Montt", id: "10101" },
    { label: "Futrono", id: "10105" },
    { label: "Panguipulli", id: "10108" },
    { label: "Puerto Varas", id: "10109" },
    { label: "Río Bueno", id: "10111" },
    { label: "Castro", id: "10201" },
    { label: "Puerto Octay", id: "10203" },
    { label: "Osorno", id: "10301" },
    { label: "Llanquihue", id: "10306" },
    { label: "Chonchi", id: "10402" },
    { label: "Ancud", id: "10406" },
    { label: "Valdivia", id: "10501" },
    { label: "Chile Chico", id: "11101" },
    { label: "Aysén", id: "11201" },
    { label: "Natales", id: "12101" },
    { label: "Punta Arenas", id: "12205" },
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
    { label: "Pedro Aguirre Cerda", id: "13121" },
    { label: "Peñalolén", id: "13122" },
    { label: "Providencia", id: "13123" },
    { label: "Pudahuel", id: "13124" },
    { label: "Quilicura", id: "13125" },
    { label: "Quinta Normal", id: "13126" },
    { label: "Recoleta", id: "13127" },
    { label: "Renca", id: "13128" },
    { label: "San Joaquín", id: "13129" },
    { label: "San Miguel", id: "13130" },
    { label: "San Ramón", id: "13131" },
    { label: "Vitacura", id: "13132" },
    { label: "Laguna de Aculeo", id: "13134" },
    { label: "Puente Alto", id: "13201" },
    { label: "Pirque", id: "13202" },
    { label: "San José de Maipo", id: "13203" },
    { label: "Colina", id: "13301" },
    { label: "Lampa", id: "13302" },
    { label: "Tiltil", id: "13303" },
    { label: "San Bernardo", id: "13401" },
    { label: "Buin", id: "13402" },
    { label: "Calera de Tango", id: "13403" },
    { label: "Paine", id: "13404" },
    { label: "Melipilla", id: "13501" },
    { label: "Alhué", id: "13502" },
    { label: "Curacaví", id: "13503" },
    { label: "María Pinto", id: "13504" },
    { label: "San Pedro", id: "13505" },
    { label: "Talagante", id: "13601" },
    { label: "El Monte", id: "13602" },
    { label: "Isla de Maipo", id: "13603" },
    { label: "Padre Hurtado", id: "13604" },
    { label: "Peñaflor", id: "13605" },
    { label: "Llay-Llay", id: "13608" },
    { label: "La Ligua", id: "13609" },
    { label: "Requinoa", id: "13612" },
    { label: "Frutillar", id: "13617" },
    { label: "Isla de Pascua", id: "13619" },
    { label: "Puchuncavi", id: "13620" },
    { label: "Placilla", id: "13621" },
    { label: "Vallenar", id: "13622" },
    { label: "Illapel", id: "13623" },
    { label: "Salamanca", id: "13624" },
    { label: "La Ligua", id: "13625" },
    { label: "Pichilemu", id: "13626" },
    { label: "Zapallar", id: "13627" },
    { label: "Tome", id: "13628" },
    { label: "Villa Alemana", id: "13629" },
    { label: "Arauco", id: "13630" },
    { label: "Papudo", id: "13631" },
    { label: "Cochamo", id: "13632" },
    { label: "Los Muermos", id: "13633" },
    { label: "San Juan de la Costa", id: "13634" },
    { label: "Santa Maria", id: "13635" },
    { label: "Coronel", id: "13636" },
    { label: "San Pedro de la Paz", id: "13637" },
    { label: "Navidad", id: "13638" },
    { label: "Arica", id: "13639" },
    { label: "Vicuña", id: "13670" },
    { label: "Talcahuano", id: "13671" },
    { label: "La Cruz", id: "13672" },
    { label: "La Unión", id: "14201" },
    { label: "Nuble", id: "16101" },
    { label: "San Francisco de Mostazal", id: "16103" }
  ];

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
        { label: "Hotelería", id: 13 },
        { label: "Edificios Corporativos", id: 12 },
        { label: "Propiedades con Renta",id: 51}
      ] 
    },
    { 
      nombre: "Terreno para proyecto", 
      sub: [
        { label: "Terrenos para Proyectos", id: 6 },
        { label: "Parcela / Sitio", id: 10 }, 
        { label: "Campos", id: 15 },
      ] 
    },
    { 
      nombre: "Industrial", 
      sub: [
        { label: "Galpones", id: 8 }, 
        { label: "Bodega Industrial", id: 17 },         
        { label: "Terreno Industrial", id: 7 }         
      ] 
    },
    { 
      nombre: "Otros", 
      sub: [
        
        
        { label: "Estacionamientos",id: 50}
      ] 
    },
  ];

  const filteredComunas = searchQuery.length > 1 
    ? comunasDataset.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearch = () => {
    // 🌟 1. Si está en la pestaña "Vender", redirige directo al formulario
    if (accionActiva === "Vender") {
      navigate('/vender');
      return;
    }

    const textInput = searchQuery.trim();
    const numericCode = textInput.replace(/\D/g, "");
    
    if (numericCode !== "" && (textInput.toLowerCase().startsWith("id") || !isNaN(textInput))) {
      navigate(`/buscar?q=${numericCode}`);
      return;
    }

    const objID = accionActiva === "Comprar" ? 1 : 2;
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
    <div className="relative z-30 px-4 pt-22 font-[Outfit]">
      <div className="max-w-6xl mx-auto bg-gray-200/20 backdrop-blur-md p-4 flex flex-wrap items-center gap-3 justify-center rounded-[40px] border border-white/20 shadow-2xl">
        
        {/* Selector de Objetivo */}
        <div className="flex bg-black/60 p-1 rounded-xl border border-white/5">
          {["Comprar", "Arrendar", "Vender"].map((accion) => (
            <button
              key={accion}
              onClick={() => {
                setAccionActiva(accion);
                // 🌟 2. Si presiona la pestaña "Vender", navega inmediatamente
                if (accion === "Vender") {
                  navigate('/vender');
                }
              }}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                accionActiva === accion ? "bg-[#24B6C1] text-white shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              {accion}
            </button>
          ))}
        </div>

        {/* Dropdown Tipo Propiedad */}
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
                      
                      {/* Contenedor invisible que actúa como puente */}
                      <div className="absolute top-0 left-full pl-2 w-66 hidden group-hover:block z-50">
                        <ul className="bg-[#1a1a1a] backdrop-blur-2xl rounded-xl border border-white/10 p-2 shadow-2xl space-y-0.5">
                          {prop.sub.map((sub, j) => (
                            <li key={j} onClick={() => { setTipoPropiedad(sub); setOpenDropdown(false); }}
                              className="flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer text-sm text-gray-300 hover:bg-[#24B6C1]/10 hover:text-[#24B6C1] whitespace-nowrap"
                            >
                              {sub.label} {tipoPropiedad?.id === sub.id && <Check size={14} className="text-[#24B6C1]" />}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Comuna con Autocomplete */}
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
                {filteredComunas.map((c, index) => (
                  <div key={`${c.id}-${index}`} onClick={() => {
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