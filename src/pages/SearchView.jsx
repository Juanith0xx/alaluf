import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, animate } from "framer-motion"; 
import { 
  FaSearch, FaArrowLeft, FaChevronDown, 
  FaChevronRight, FaCheck 
} from "react-icons/fa"; 

// Componentes del proyecto
import Navbar from "../components/Navbar"; 
import PropertyCard from "../components/PropertyCard"; 

// 🌟 LAZY LOADING: MapView (incluye mapbox-gl) 
const MapView = lazy(() => import("../components/MapView"));

import FiltrosAvanzados from "../components/FiltrosAvanzados"; 

// IMPORTACIÓN DEL ASSET LOCAL
import fondoMarmol from '../assets/Marmol.jpg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log("API_URL:", API_URL);

// 🌟 Fallback compartido para ambas instancias del mapa (móvil y desktop)
const MapaFallback = () => (
  <div className="w-full h-full bg-black flex items-center justify-center text-white text-sm">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-[#24B6C1] border-t-transparent rounded-full animate-spin"></div>
      Cargando mapa...
    </div>
  </div>
);

const SearchView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const comunaParam = searchParams.get("comuna");

  const tieneComunaValida =
    comunaParam !== null &&
    comunaParam !== undefined &&
    comunaParam.trim() !== "";

  const faltaComuna = !tieneComunaValida;

  const [propiedadesData, setPropiedadesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // ⏱️ NUEVO ESTADO PARA MEDIR EL TIEMPO
  const [tiempoBusqueda, setTiempoBusqueda] = useState(null);

  // Estado para el conteo total
  const [totalPropiedades, setTotalPropiedades] = useState(0);

  // ESTADO DE PAGINACIÓN
  const [totalPaginas, setTotalPaginas] = useState(1);
  const paginaActual = parseInt(searchParams.get("page")) || 1;

  // --- ESTADOS DEL BUSCADOR ---
  const [tipoPropiedad, setTipoPropiedad] = useState(null);
  const [searchQueryInput, setSearchQueryInput] = useState(searchParams.get("q") || ""); 
  const [selectedComuna, setSelectedComuna] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  
  // Sincroniza automáticamente el botón "Comprar" o "Arrendar" según la URL
  const [accionActiva, setAccionActiva] = useState(() => {
    return searchParams.get("obj") === "2" ? "Arrendar" : "Comprar";
  });
  
  const dropdownRef = useRef(null);
  const suggestionRef = useRef(null);

  // EFECTO DE SCROLL AUTOMÁTICO LENTO AL CAMBIAR PÁGINA
  useEffect(() => {
    const currentScroll = window.scrollY;
    if (currentScroll > 0) {
      animate(currentScroll, 0, {
        type: "tween",
        duration: 1.8, 
        ease: "easeInOut",
        onUpdate: (latest) => window.scrollTo(0, latest),
      });
    }
  }, [paginaActual]);

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
    { nombre: "Residencial", sub: [{ label: "Casas", id: 1 }, { label: "Departamentos", id: 2 }] },
    { nombre: "Comercial / Oficinas", sub: [{ label: "Oficinas", id: 3 }, { label: "Locales", id: 4 }, { label: "Casa Comercial", id: 5 }, { label: "Hotelería", id: 13 }] },
    { nombre: "Industrial ", sub: [{ label: "Galpones", id: 8 }, { label: "Bodega Industrial", id: 17 }, { label: "Terreno Industrial", id: 7 }] },
    { nombre: "Terrenos para proyectos", sub: [{ label: "Terrenos para Proyectos", id: 6 }, { label: "Parcela / Sitio", id: 10 }, { label: "Campos", id: 15 }] },
  ];

  const obtenerLabelPorId = (id) => {
    if (!id) return "Propiedades";
    for (let cat of categoriasPropiedades) {
      const subEncontrada = cat.sub.find(s => s.id == id);
      if (subEncontrada) return subEncontrada.label;
    }
    return "Propiedades";
  };

  const filteredComunas = searchQueryInput.length > 1 
    ? comunasDataset.filter(c => c.label.toLowerCase().includes(searchQueryInput.toLowerCase()))
    : [];

  const handleSearch = () => {
    const textInput = searchQueryInput.trim();
    const numericOnly = textInput.replace(/\D/g, "");
    
    if (numericOnly !== "" && (textInput.toLowerCase().startsWith("id") || !isNaN(textInput))) {
      setSearchParams({ q: numericOnly });
      setShowSuggestions(false);
      return;
    }

    const objID = (accionActiva === "Comprar" || accionActiva === "Vender") ? 1 : 2;
    const comunaID = selectedComuna?.id || "";
    const tipoID = tipoPropiedad?.id || "";

    setSearchParams({ 
      ...(tipoID && { tipo_prop: tipoID }), 
      obj: objID, 
      ...(comunaID && { comuna: comunaID }), 
      page: 1 
    });
  };

  const handlePropertyClick = (prop) => {
    if (window.innerWidth < 1024) {
      const idParaNavegar = prop.codigo || prop.id;
      navigate(`/propiedad/${idParaNavegar}`);
    } else {
      setSelectedProperty(prop);
    }
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      const currentParams = Object.fromEntries([...searchParams]);
      setSearchParams({ ...currentParams, page: paginaActual + 1 });
    }
  };

  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      const currentParams = Object.fromEntries([...searchParams]);
      setSearchParams({ ...currentParams, page: paginaActual - 1 });
    }
  };

  // 🌟 FETCH OPTIMIZADO CON PAGINACIÓN DE SERVIDOR Y CRONÓMETRO
  useEffect(() => {
    const fetchResultados = async () => {
      setLoading(true);
      // ⏱️ 1. Iniciamos el cronómetro
      const startTime = performance.now();

      try {
        const query = searchParams.get("q");
        const tipo_prop = searchParams.get("tipo_prop");
        const obj = searchParams.get("obj");
        const comuna = searchParams.get("comuna");

        const supDesde = searchParams.get("sup_desde") || "";
        const supHasta = searchParams.get("sup_hasta") || "";
        const precioDesde = searchParams.get("precio_desde") || "";
        const precioHasta = searchParams.get("precio_hasta") || "";
        const moneda = searchParams.get("moneda") || "CLP";
        const orden = searchParams.get("orden") || "reciente"; 

        if (tipo_prop && (!tipoPropiedad || tipoPropiedad.id != tipo_prop)) {
          setTipoPropiedad({ label: obtenerLabelPorId(tipo_prop), id: tipo_prop });
        }

        let url = "";
        if (query) {
          url = `${API_URL}/api/propiedades/${query}`;
        } else {
          const safeTipoProp = tipo_prop || ""; 
          const safeObj = obj || "1"; 
          const safeComuna = comuna || ""; 
          
          // Enviamos paginaActual y limit=10 al backend
          url = `${API_URL}/api/propiedades/buscar?tipo_prop=${safeTipoProp}&obj=${safeObj}&comuna=${safeComuna}&sup_desde=${supDesde}&sup_hasta=${supHasta}&precio_desde=${precioDesde}&precio_hasta=${precioHasta}&moneda=${moneda}&orden=${orden}&page=${paginaActual}&limit=10`;
        }
        
        const response = await fetch(url);
        const json = await response.json();
        
        // ⏱️ 2. Detenemos el cronómetro justo al recibir la data
        const endTime = performance.now();
        const tiempoEnSegundos = ((endTime - startTime) / 1000).toFixed(2);
        
        // ⏱️ 3. Guardamos el tiempo en el estado y lo mostramos en consola
        setTiempoBusqueda(tiempoEnSegundos);
        console.log(`🚀 [PERFORMANCE] La búsqueda tardó: ${tiempoEnSegundos} segundos`);

        // Usamos la metadata del backend directo
        if (json.paginacion && json.data) {
            setPropiedadesData(json.data);
            setTotalPropiedades(json.paginacion.totalPropiedades);
            setTotalPaginas(json.paginacion.totalPaginas);
            
            if (json.data.length > 0) {
                setSelectedProperty(json.data[0]);
            } else {
                setSelectedProperty(null);
            }
        } else if (Array.isArray(json)) {
            // Fallback para endpoints individuales (ej. ID directo)
            setPropiedadesData(json);
            setTotalPropiedades(json.length);
            setTotalPaginas(1);
            if (json.length > 0) setSelectedProperty(json[0]);
        } else if (json.id || json.codigo) {
            setPropiedadesData([json]);
            setTotalPropiedades(1);
            setTotalPaginas(1);
            setSelectedProperty(json);
        }

      } catch (error) {
        console.error("Error fetching properties:", error);
        setPropiedadesData([]);
        setTotalPropiedades(0);
        setTotalPaginas(1);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResultados();
  }, [searchParams, paginaActual]);

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

      <div className="bg-[#111111] border-b border-white/5 pt-28 lg:pt-32 pb-8 lg:pb-12 shadow-xl relative z-20">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 flex items-center gap-4 lg:gap-8">
          <button onClick={() => navigate('/')} className="p-3 lg:p-4 border border-white/10 rounded-xl lg:rounded-2xl hover:bg-[#24B6C1] transition-all shrink-0">
            <FaArrowLeft />
          </button>
          
          {/* ⏱️ BADGE Y CONTADOR EN EL HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
            <h1 className="text-lg lg:!text-2xl font-bold !font-[Outfit] tracking-tighter uppercase italic leading-tight">
              Total {obtenerLabelPorId(searchParams.get("tipo_prop"))} encontradas <span className="text-[#24B6C1]"> {totalPropiedades}</span> 
            </h1>
            
            {tiempoBusqueda && (
              <div className="flex items-center gap-1.5 bg-[#24B6C1]/10 border border-[#24B6C1]/30 text-[#24B6C1] px-3 py-1 rounded-full text-xs font-bold tracking-wider w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                {tiempoBusqueda}s
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={fullSectionStyle} className="relative py-8 lg:py-12 min-h-screen">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
          
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            
            {/* SEARCHBAR PRINCIPAL */}
            <div className="relative z-40 bg-black/60 backdrop-blur-xl p-4 lg:p-3 rounded-[25px] lg:rounded-[35px] border border-white/10 flex flex-col lg:flex-row flex-wrap gap-3 lg:gap-2 items-stretch lg:items-center shadow-2xl">
              
              <div className="flex w-full lg:w-auto bg-white/5 p-1 rounded-xl">
                {["Comprar", "Vender", "Arrendar"].map((accion) => (
                  <button key={accion} onClick={() => {
                    setAccionActiva(accion);
                    if (accion === "Vender") {
                      navigate('/vender');
                    } else {
                      const params = new URLSearchParams(searchParams);
                      params.set("obj", accion === "Comprar" ? "1" : "2");
                      params.set("page", "1");
                      navigate(`/buscar?${params.toString()}`);
                    }
                  }}
                    className={`flex-1 lg:flex-none px-2 sm:px-6 py-2.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${accionActiva === accion ? "bg-[#24B6C1] text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                  >
                    {accion}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-auto lg:flex-1 lg:min-w-[160px]" ref={dropdownRef}>
                <button onClick={() => setOpenDropdown(!openDropdown)}
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="truncate">{tipoPropiedad?.label || "Tipo Propiedad"}</span>
                  <FaChevronDown className={`text-[#24B6C1] transition-transform ${openDropdown ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openDropdown && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 left-0 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-full lg:w-64 z-50 p-2"
                    >
                      {categoriasPropiedades.map((cat, i) => (
                        <div key={i} className="group relative">
                          <div className="flex items-center justify-between px-4 py-3 lg:py-2.5 rounded-xl hover:bg-[#24B6C1]/10 text-xs font-bold text-gray-400">
                            {cat.nombre} <FaChevronRight size={10} className="hidden lg:block"/>
                          </div>
                          <div className="lg:absolute lg:left-full lg:top-0 lg:ml-2 lg:hidden lg:group-hover:block bg-[#1a1a1a] lg:border lg:border-white/10 rounded-xl p-2 w-full lg:w-56 lg:shadow-2xl">
                            {cat.sub.map((sub, j) => (
                              <div key={j} onClick={() => { setTipoPropiedad(sub); setOpenDropdown(false); }}
                                className="px-4 py-3 lg:py-2 rounded-lg hover:bg-[#24B6C1]/20 text-xs text-gray-300 flex justify-between cursor-pointer"
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

              <div className="relative w-full lg:w-auto lg:flex-[2] lg:min-w-[220px]" ref={suggestionRef}>
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
                          className="px-6 py-4 lg:py-3 hover:bg-[#24B6C1]/20 cursor-pointer text-xs text-gray-300 flex justify-between"
                        >
                          {c.label} <span className="text-[10px] text-gray-600">ID: {c.id}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={handleSearch} className="w-full lg:w-auto px-6 py-3.5 bg-[#24B6C1] hover:bg-cyan-600 rounded-xl transition-all flex items-center justify-center lg:justify-start gap-2 shadow-lg">
                <span className="text-xs font-bold uppercase tracking-widest">Buscar</span>
                <FaSearch size={16} />
              </button>
            </div>

            {/* AVISO INFORMATIVO CONDICIONAL */}
            <AnimatePresence>
              {faltaComuna && (
                <motion.div 
                  initial={{ opacity: 0, y: -20, height: 0 }} 
                  animate={{ opacity: 1, y: 0, height: "auto" }} 
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  className="relative z-30 overflow-hidden"
                >
                  <div className="bg-[#24B6C1]/10 border border-[#24B6C1]/30 text-white px-4 py-3 rounded-2xl mb-4 text-xs sm:text-sm flex items-center gap-3 shadow-lg">
                    <span>Estás viendo resultados generales. Puedes acotar tu búsqueda usando los filtros opcionales.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FILTROS AVANZADOS HORIZONTALES */}
            <div className="relative z-30 mb-8">
               {faltaComuna && (
                  <FiltrosAvanzados />
                )}
            </div>

            {/* GRILLA DE RESULTADOS (Directamente desde propiedadesData) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
              {loading ? (
                <div className="col-span-1 md:col-span-2 py-40 text-center"><div className="w-12 h-12 border-4 border-[#24B6C1] border-t-transparent rounded-full animate-spin inline-block"></div></div>
              ) : propiedadesData.length > 0 ? (
                propiedadesData.map((prop) => {
                  const esActiva = selectedProperty && (
                    selectedProperty.id == prop.id || 
                    selectedProperty.codigo == prop.codigo
                  );

                  return (
                    <PropertyCard 
                      key={prop.id || prop.codigo} 
                      item={prop} 
                      onSelect={() => handlePropertyClick(prop)} 
                      isActive={esActiva} 
                    />
                  );
                })
              ) : (
                <div className="col-span-1 md:col-span-2 py-40 text-center bg-black/40 rounded-[30px] lg:rounded-[40px] border border-dashed border-white/10">
                  <p className="text-gray-500 font-bold uppercase tracking-widest">Sin resultados en esta zona</p>
                </div>
              )}
            </div>

            {/* PAGINACIÓN CON BOTONES NUMERADOS */}
            {!loading && totalPaginas > 1 && !searchParams.get("q") && (
              <div className="flex justify-center items-center gap-2 mt-12 bg-black/40 p-3 lg:p-4 rounded-3xl border border-white/10 backdrop-blur-md w-full sm:w-fit mx-auto shadow-2xl">
                
                <button
                  onClick={irPaginaAnterior}
                  disabled={paginaActual === 1}
                  className={`flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] lg:text-xs transition-all ${
                    paginaActual === 1 
                      ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                      : 'bg-[#24B6C1] text-white hover:bg-[#1e9aa3] shadow-lg shadow-[#24B6C1]/20'
                  }`}
                >
                  <FaArrowLeft size={10} className="hidden sm:block" /> Ant
                </button>
                
                <div className="flex gap-1 overflow-x-auto max-w-[150px] sm:max-w-[250px] scrollbar-hide px-2">
                  {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => {
                        const currentParams = Object.fromEntries([...searchParams]);
                        setSearchParams({ ...currentParams, page: index + 1 });
                      }}
                      className={`min-w-[32px] h-8 lg:min-w-[36px] lg:h-9 rounded-lg font-bold transition-all text-xs flex items-center justify-center shrink-0 ${
                        paginaActual === index + 1 
                        ? 'bg-[#24B6C1] text-white shadow-md' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={irPaginaSiguiente}
                  disabled={paginaActual === totalPaginas}
                  className={`flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] lg:text-xs transition-all ${
                    paginaActual === totalPaginas 
                      ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                      : 'bg-[#24B6C1] text-white hover:bg-[#1e9aa3] shadow-lg shadow-[#24B6C1]/20'
                  }`}
                >
                  Sig <span className="rotate-180 inline-block hidden sm:block"><FaArrowLeft size={10} /></span>
                </button>
              </div>
            )}

            {/* MAPA MÓVIL AL FINAL */}
            <div className="block lg:hidden h-[350px] md:h-[400px] mt-10 relative overflow-hidden shadow-2xl rounded-[30px] border border-white/20 bg-black z-20">
              <Suspense fallback={<MapaFallback />}>
                <MapView 
                  propiedades={propiedadesData} 
                  selectedProperty={selectedProperty}
                  setSelectedProperty={setSelectedProperty} 
                />
              </Suspense>
            </div>

          </div>

          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <div className="lg:sticky lg:top-28 space-y-8">
              
              {/* MAPA VERSIÓN DESKTOP */}
              <div className="hidden lg:block h-[480px] relative overflow-hidden shadow-2xl rounded-[40px] border border-white/20 bg-black">
                <Suspense fallback={<MapaFallback />}>
                  <MapView 
                    propiedades={propiedadesData} 
                    selectedProperty={selectedProperty}
                    setSelectedProperty={setSelectedProperty} 
                  />
                </Suspense>
              </div>

              {/* FORMULARIO DE CONTACTO */}
              <div className="bg-white text-gray-800 rounded-[30px] lg:rounded-[40px] p-6 sm:p-8 lg:p-10 shadow-2xl">
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
                      <input type="text" placeholder="Tu nombre" className="w-full bg-white border border-gray-200 px-4 py-3 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1]" />
                    </div>

                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                      <label className="text-sm font-semibold">Correo electrónico *</label>
                      <input type="email" placeholder="tu@email.com" className="w-full bg-white border border-gray-200 px-4 py-3 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1]" />
                    </div>

                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                      <label className="text-sm font-semibold">Teléfono</label>
                      <input type="text" placeholder="+56 9 1234 5678" className="w-full bg-white border border-gray-200 px-4 py-3 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1]" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-semibold">Hablemos de lo que necesitas.</label>
                      <textarea rows="4" placeholder="Cuéntanos qué tienes en mente — una propiedad, una inversión o simplemente una duda que quieres resolver." className="w-full bg-white border border-gray-200 px-4 py-4 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1] resize-none" />
                    </div>
                  </div>

                  <button type="submit" className="w-full group bg-[#158F9B] hover:bg-[#127C86] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-lg">
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