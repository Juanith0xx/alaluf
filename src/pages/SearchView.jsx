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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SearchView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [propiedadesData, setPropiedadesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // 🌟 ESTADO DE PAGINACIÓN
  const [totalPaginas, setTotalPaginas] = useState(1);
  const paginaActual = parseInt(searchParams.get("page")) || 1;

  // --- ESTADOS DEL BUSCADOR ---
  const [tipoPropiedad, setTipoPropiedad] = useState(null);
  const [searchQueryInput, setSearchQueryInput] = useState(searchParams.get("q") || ""); 
  const [selectedComuna, setSelectedComuna] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [accionActiva, setAccionActiva] = useState("Arrendar");
  
  const dropdownRef = useRef(null);
  const suggestionRef = useRef(null);

  // DATASET COMPLETO DE COMUNAS
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

  // CATEGORÍAS COMPLETAS DE PROPIEDADES
  const categoriasPropiedades = [
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

  const filteredComunas = searchQueryInput.length > 1 
    ? comunasDataset.filter(c => c.label.toLowerCase().includes(searchQueryInput.toLowerCase()))
    : [];

  const handleSearch = () => {
    const textInput = searchQueryInput.trim();
    const numericOnly = textInput.replace(/\D/g, "");
    
    // Búsqueda por ID o Código
    if (numericOnly !== "" && (textInput.toLowerCase().startsWith("id") || !isNaN(textInput))) {
      setSearchParams({ q: numericOnly });
      setShowSuggestions(false);
      return;
    }

    const objID = (accionActiva === "Comprar" || accionActiva === "Vender") ? 1 : 2;
    const comunaID = selectedComuna?.id || "";

    if (!tipoPropiedad || !comunaID) {
      alert("Por favor selecciona Tipo de Propiedad y una Comuna de la lista sugerida.");
      return;
    }

    // Al hacer una nueva búsqueda, forzamos iniciar en la página 1
    setSearchParams({
      tipo_prop: tipoPropiedad.id,
      obj: objID,
      comuna: comunaID,
      page: 1
    });
  };

  // FUNCIONES DE NAVEGACIÓN DE PÁGINAS
  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      const currentParams = Object.fromEntries([...searchParams]);
      setSearchParams({ ...currentParams, page: paginaActual + 1 });
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  };

  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      const currentParams = Object.fromEntries([...searchParams]);
      setSearchParams({ ...currentParams, page: paginaActual - 1 });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
          url = `${API_URL}/api/propiedades/${query}`;
        } else if (tipo_prop && obj && comuna) {
          url = `${API_URL}/api/propiedades/buscar?tipo_prop=${tipo_prop}&obj=${obj}&comuna=${comuna}&page=${paginaActual}&limit=10`;
        } else {
          setPropiedadesData([]);
          setLoading(false);
          return;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        let finalArray = [];

        if (query) {
          finalArray = (data && (data.id || data.codigo)) ? [data] : [];
          setTotalPaginas(1);
        } else if (data.data && data.paginacion) {
          finalArray = data.data;
          setTotalPaginas(data.paginacion.totalPaginas);
        } else {
          finalArray = Array.isArray(data) ? data : [];
          setTotalPaginas(1);
        }

        setPropiedadesData(finalArray);
        if (finalArray.length > 0) setSelectedProperty(finalArray[0]);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setPropiedadesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, [searchParams]);

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

      <div className="bg-[#111111] border-b border-white/5 pt-32 pb-12 shadow-xl relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 flex items-center gap-8">
          <button onClick={() => navigate('/')} className="p-4 border border-white/10 rounded-2xl hover:bg-[#24B6C1] transition-all">
            <FaArrowLeft />
          </button>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Resultados Alaluf</h1>
        </div>
      </div>

      <div style={fullSectionStyle} className="relative py-12 min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 grid lg:grid-cols-12 gap-10 relative z-10">
          
          <div className="lg:col-span-7 space-y-8">
            
            {/* SEARCHBAR INTEGRADO */}
            <div className="relative z-40 bg-black/60 backdrop-blur-xl p-3 rounded-[35px] border border-white/10 flex flex-wrap gap-2 items-center shadow-2xl">
              
              <div className="flex bg-white/5 p-1 rounded-xl">
                {["Comprar", "Vender", "Arrendar"].map((accion) => (
                  <button key={accion} onClick={() => setAccionActiva(accion)}
                    className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${accionActiva === accion ? "bg-[#24B6C1] text-white shadow-lg" : "text-white/40 hover:text-white"}`}
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
                      {categoriasPropiedades.map((cat, i) => (
                        <div key={i} className="group relative">
                          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-[#24B6C1]/10 text-xs font-bold text-gray-400">
                            {cat.nombre} <FaChevronRight size={10} />
                          </div>
                          <div className="absolute left-full top-0 ml-2 hidden group-hover:block bg-[#1a1a1a] border border-white/10 rounded-xl p-2 w-56 shadow-2xl">
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
                  placeholder="Comuna, ciudad o código..."
                  className="w-full px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#24B6C1]"
                />
                <AnimatePresence>
                  {showSuggestions && filteredComunas.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="absolute top-full mt-2 left-0 w-full bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto"
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
                <span className="text-xs font-bold uppercase tracking-widest">Buscar</span>
                <FaSearch size={16} />
              </button>
            </div>

            {/* GRILLA DE RESULTADOS */}
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {loading ? (
                <div className="col-span-2 py-40 text-center"><div className="w-12 h-12 border-4 border-[#24B6C1] border-t-transparent rounded-full animate-spin inline-block"></div></div>
              ) : propiedadesData.length > 0 ? (
                propiedadesData.map((prop) => {
                  // 🔧 FIX 1: Comparación hiper-robusta (String == Number seguro)
                  const esActiva = selectedProperty && (
                    selectedProperty.id == prop.id || 
                    selectedProperty.codigo == prop.codigo ||
                    selectedProperty.id == prop.codigo // A veces la API cruza estos valores
                  );

                  return (
                    <PropertyCard 
                      key={prop.id || prop.codigo} 
                      item={prop} 
                      onSelect={() => setSelectedProperty(prop)} 
                      isActive={esActiva} 
                    />
                  );
                })
              ) : (
                <div className="col-span-2 py-40 text-center bg-black/40 rounded-[40px] border border-dashed border-white/10">
                  <p className="text-gray-500 font-bold uppercase tracking-widest">Sin resultados en esta zona</p>
                </div>
              )}
            </div>

            {/* CONTROLES DE PAGINACIÓN */}
            {!loading && totalPaginas > 1 && !searchParams.get("q") && (
              <div className="flex justify-center items-center gap-6 mt-12 bg-black/40 p-4 rounded-3xl border border-white/10 backdrop-blur-md w-fit mx-auto shadow-2xl">
                <button
                  onClick={irPaginaAnterior}
                  disabled={paginaActual === 1}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                    paginaActual === 1 
                      ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                      : 'bg-[#24B6C1] text-white hover:bg-[#1e9aa3] shadow-lg shadow-[#24B6C1]/20'
                  }`}
                >
                  <FaArrowLeft size={12} /> Anterior
                </button>
                
                <span className="text-white/60 font-medium text-sm">
                  Página <span className="text-white font-bold">{paginaActual}</span> de <span className="text-white font-bold">{totalPaginas}</span>
                </span>
                
                <button
                  onClick={irPaginaSiguiente}
                  disabled={paginaActual === totalPaginas}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                    paginaActual === totalPaginas 
                      ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                      : 'bg-[#24B6C1] text-white hover:bg-[#1e9aa3] shadow-lg shadow-[#24B6C1]/20'
                  }`}
                >
                  Siguiente <span className="rotate-180 inline-block"><FaArrowLeft size={12} /></span>
                </button>
              </div>
            )}

          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-8">
              
              {/* MAPA */}
              <div className="h-[480px] relative overflow-hidden shadow-2xl rounded-[40px] border border-white/20 bg-black">
                {/* 🔧 FIX 2: Pasamos explícitamente setSelectedProperty al mapa */}
                <MapView 
                  propiedades={propiedadesData} 
                  selectedProperty={selectedProperty}
                  setSelectedProperty={setSelectedProperty} 
                />
              </div>

              {/* FORMULARIO DE CONTACTO */}
              <div className="bg-white text-gray-800 rounded-[40px] p-8 lg:p-10 shadow-2xl">
                <form className="space-y-6 font-[Outfit]">
                  <div className="grid md:grid-cols-2 gap-4">
                    
                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                      <label className="text-sm font-semibold">¿Qué estás buscando?</label>
                      <select className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1]">
                        <option>Selecciona</option>
                        <option value="propiedad">Comprar una propiedad</option>
                        <option value="arrendar">Arrendar una propiedad</option>
                        <option value="vender">Vender o arrendar lo que tengo</option>
                        <option value="asesoria">Asesoría de inversión</option>
                        <option value="licitacion">Licitación o terreno</option>
                        <option value="admin">Administración de arriendos</option>
                        <option value="duda">No sé por dónde empezar</option>
                      </select>
                    </div>

                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                      <label className="text-sm font-semibold">Nombre completo *</label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        className="w-full bg-white border border-gray-200 px-4 py-3 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1]"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                      <label className="text-sm font-semibold">Correo electrónico *</label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full bg-white border border-gray-200 px-4 py-3 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1]"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                      <label className="text-sm font-semibold">Teléfono</label>
                      <input
                        type="text"
                        placeholder="+56 9 1234 5678"
                        className="w-full bg-white border border-gray-200 px-4 py-3 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1]"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-semibold">Hablemos de lo que necesitas.</label>
                      <textarea
                        rows="4"
                        placeholder="Cuéntanos qué tienes en mente — una propiedad, una inversión o simplemente una duda que quieres resolver."
                        className="w-full bg-white border border-gray-200 px-4 py-4 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1] resize-none"
                      />
                    </div>

                  </div>

                  <button
                    type="submit"
                    className="w-full group bg-[#158F9B] hover:bg-[#127C86] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                  >
                     Continuar
                  </button>

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