import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, FaArrowLeft, FaChevronDown, 
  FaChevronRight, FaCheck 
} from "react-icons/fa"; 

// Componentes del proyecto
import Navbar from "../components/Navbar"; 
import PropertyCard from "../components/PropertyCard"; 
import MapView from "../components/MapView"; 

// IMPORTACIÓN DEL ASSET LOCAL
import fondoMarmol from '../assets/Marmol.jpg';

const SearchView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [propiedadesData, setPropiedadesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // --- ESTADOS DEL BUSCADOR (CLONADO DE TU SEARCHBAR) ---
  const [tipoPropiedad, setTipoPropiedad] = useState(null);
  const [searchQueryInput, setSearchQueryInput] = useState(searchParams.get("q") || ""); 
  const [selectedComuna, setSelectedComuna] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [accionActiva, setAccionActiva] = useState("Arrendar");
  
  const dropdownRef = useRef(null);
  const suggestionRef = useRef(null);

  // DATASETS (Igual a tu SearchBar principal)
  const comunasDataset = [
    { label: "Santiago", id: "13101" }, { label: "Las Condes", id: "13114" }, { label: "Providencia", id: "13123" },
    { label: "Vitacura", id: "13132" }, { label: "Lo Barnechea", id: "13115" }, { label: "Ñuñoa", id: "13120" },
    { label: "Colina", id: "13301" }, { label: "Huechuraba", id: "13107" }, { label: "Lo Espejo", id: "13116" },
  ];

  const tiposPropiedades = [
    { nombre: "Residencial", sub: [{ label: "Casas", id: 1 }, { label: "Departamentos", id: 2 }] },
    { nombre: "Comercial", sub: [{ label: "Oficinas", id: 3 }, { label: "Locales", id: 4 }, { label: "Casa Comercial", id: 5 }] },
    { nombre: "Industrial", sub: [{ label: "Galpones", id: 8 }, { label: "Bodega Industrial", id: 17 }] },
  ];

  const filteredComunas = searchQueryInput.length > 1 
    ? comunasDataset.filter(c => c.label.toLowerCase().includes(searchQueryInput.toLowerCase()))
    : [];

  // --- LÓGICA DE BÚSQUEDA CORREGIDA (ID / CÓDIGO / FILTROS) ---
  const handleSearch = () => {
    const textInput = searchQueryInput.trim();
    
    // Extraemos solo los números para ID o Código (Ej: 26140 o 14543)
    const numericOnly = textInput.replace(/\D/g, "");
    
    // Si el input es un ID/Código (es numérico o empieza con "ID")
    if (numericOnly !== "" && (textInput.toLowerCase().startsWith("id") || !isNaN(textInput))) {
      setSearchParams({ q: numericOnly });
      setShowSuggestions(false);
      return;
    }

    // Si es búsqueda por filtros
    const objID = (accionActiva === "Comprar") ? 1 : 2;
    const comunaID = selectedComuna?.id || "";

    if (!tipoPropiedad || !comunaID) {
      alert("Por favor selecciona Tipo de Propiedad y una Comuna de la lista.");
      return;
    }

    setSearchParams({
      tipo_prop: tipoPropiedad.id,
      obj: objID,
      comuna: comunaID
    });
  };

  // --- EFECTO DE CARGA DE DATOS ---
  useEffect(() => {
    const fetchResultados = async () => {
      setLoading(true);
      try {
        const query = searchParams.get("q");
        const tipo_prop = searchParams.get("tipo_prop");
        const obj = searchParams.get("obj");
        const comuna = searchParams.get("comuna");

        let url = "";
        if (query) {
          // Búsqueda por ID o Código
          url = `http://localhost:5000/api/propiedades/${query}`;
        } else if (tipo_prop && obj && comuna) {
          // Búsqueda por filtros
          url = `http://localhost:5000/api/propiedades/buscar?tipo_prop=${tipo_prop}&obj=${obj}&comuna=${comuna}`;
        } else {
          setPropiedadesData([]);
          setLoading(false);
          return;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        // CORRECCIÓN: Si el backend devuelve un objeto (ID), lo metemos en un array [data]
        const finalArray = Array.isArray(data) ? data : (data && (data.id || data.codigo)) ? [data] : [];
        setPropiedadesData(finalArray);
        
        if (finalArray.length > 0) setSelectedProperty(finalArray[0]);
      } catch (error) {
        console.error("Error en Fetch:", error);
        setPropiedadesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, [searchParams]);

  // Cierre de dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenDropdown(false);
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fullSectionStyle = {
    backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 0.4)), url(${fondoMarmol})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed' 
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-[Outfit]">
      <Navbar />

      {/* HEADER SÓLIDO */}
      <div className="bg-[#111111] border-b border-white/5 pt-32 pb-12 shadow-xl relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 flex items-center gap-8">
          <button onClick={() => navigate('/')} className="p-4 border border-white/10 rounded-2xl hover:bg-[#24B6C1] transition-all">
            <FaArrowLeft />
          </button>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Resultados Alaluf</h1>
        </div>
      </div>

      {/* SECCIÓN CON FONDO DE MÁRMOL COMPLETO */}
      <div style={fullSectionStyle} className="relative py-12 min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 grid lg:grid-cols-12 gap-10 relative z-10">
          
          <div className="lg:col-span-7 space-y-8">
            
            {/* SEARCHBAR INTEGRADO (CLON EXACTO) */}
            <div className="bg-black/60 backdrop-blur-xl p-3 rounded-[35px] border border-white/10 flex flex-wrap gap-2 items-center shadow-2xl">
              
              <div className="flex bg-white/5 p-1 rounded-xl">
                {["Comprar", "Arrendar"].map((accion) => (
                  <button key={accion} onClick={() => setAccionActiva(accion)}
                    className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${accionActiva === accion ? "bg-[#24B6C1] text-white" : "text-white/40 hover:text-white"}`}
                  >
                    {accion}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 min-w-[160px]" ref={dropdownRef}>
                <button onClick={() => setOpenDropdown(!openDropdown)}
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="truncate">{tipoPropiedad?.label || "Tipo Propiedad"}</span>
                  <FaChevronDown className={`text-[#24B6C1] transition-transform ${openDropdown ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openDropdown && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 left-0 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-64 z-50 p-2"
                    >
                      {tiposPropiedades.map((cat, i) => (
                        <div key={i} className="group relative">
                          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-[#24B6C1]/10 text-xs font-bold text-gray-400">
                            {cat.nombre} <FaChevronRight size={10} />
                          </div>
                          <div className="absolute left-full top-0 ml-2 hidden group-hover:block bg-[#1a1a1a] border border-white/10 rounded-xl p-2 w-48 shadow-2xl">
                            {cat.sub.map((sub, j) => (
                              <div key={j} onClick={() => { setTipoPropiedad(sub); setOpenDropdown(false); }}
                                className="px-4 py-2 rounded-lg hover:bg-[#24B6C1]/20 text-xs text-gray-300 flex justify-between cursor-pointer"
                              >
                                {sub.label} {tipoPropiedad?.id === sub.id && <FaCheck size={10} className="text-[#24B6C1]" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative flex-[2] min-w-[220px]" ref={suggestionRef}>
                <input 
                  type="text" 
                  value={searchQueryInput} 
                  onChange={(e) => { setSearchQueryInput(e.target.value); setShowSuggestions(true); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="ID, Código o Comuna..."
                  className="w-full px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#24B6C1]"
                />
                <AnimatePresence>
                  {showSuggestions && filteredComunas.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="absolute top-full mt-2 left-0 w-full bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 max-h-56 overflow-y-auto"
                    >
                      {filteredComunas.map((c) => (
                        <div key={c.id} onClick={() => { setSearchQueryInput(c.label); setSelectedComuna(c); setShowSuggestions(false); }}
                          className="px-6 py-3 hover:bg-[#24B6C1]/20 cursor-pointer text-xs text-gray-300 flex justify-between"
                        >
                          {c.label} <span className="text-[10px] text-gray-600">ID: {c.id}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={handleSearch} className="px-6 py-3.5 bg-[#24B6C1] hover:bg-cyan-600 rounded-xl transition-all flex items-center gap-2 shadow-lg">
                <span className="text-xs font-bold">BUSCAR</span>
                <FaSearch size={16} />
              </button>
            </div>

            {/* GRILLA */}
            <div className="grid md:grid-cols-2 gap-8">
              {loading ? (
                <div className="col-span-2 py-40 text-center"><div className="w-12 h-12 border-4 border-[#24B6C1] border-t-transparent rounded-full animate-spin inline-block"></div></div>
              ) : propiedadesData.length > 0 ? (
                propiedadesData.map((prop) => (
                  <PropertyCard key={prop.id || prop.codigo} item={prop} 
                    onSelect={() => setSelectedProperty(prop)} 
                    isActive={selectedProperty?.id === prop.id} 
                  />
                ))
              ) : (
                <div className="col-span-2 py-40 text-center bg-black/40 rounded-[40px] border border-dashed border-white/10">
                  <p className="text-gray-500 font-bold uppercase tracking-widest">Sin resultados</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-8">
              <div className="h-[480px] relative overflow-hidden shadow-2xl rounded-[40px] border border-white/20 bg-black">
                <MapView propiedades={propiedadesData} selectedProperty={selectedProperty} />
              </div>
              <div className="bg-white p-10 rounded-[40px] text-black shadow-2xl">
                <h3 className="text-2xl font-black mb-1 tracking-tighter uppercase italic">Asesoría Especializada</h3>
                <p className="text-gray-500 text-sm mb-6">Déjanos tus datos para contactarte.</p>
                <form className="space-y-3">
                  <input type="text" placeholder="Nombre completo" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100" />
                  <button className="w-full py-4 bg-black text-white font-black rounded-2xl hover:bg-[#24B6C1] transition-all uppercase text-xs tracking-widest">Enviar</button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchView;