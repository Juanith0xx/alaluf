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
import comunasDataset from "../data/comunas";

// IMPORTACIÓN DEL ASSET LOCAL
import fondoMarmol from '../assets/Marmol.jpg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// 🌟 Fallback compartido
const MapaFallback = () => (
  <div className="w-full h-full bg-black flex items-center justify-center text-white text-sm">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-[#24B6C1] border-t-transparent rounded-full animate-spin"></div>
      Cargando mapa...
    </div>
  </div>
);


const PropertyCardSkeleton = ({ index }) => (
  <motion.article
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.35,
      delay: index * 0.06,
      ease: "easeOut",
    }}
    className={`overflow-hidden rounded-[26px] border border-white/10 bg-white shadow-2xl sm:rounded-[30px] ${
      index > 1 ? "hidden md:block" : ""
    }`}
    aria-hidden="true"
  >
    <div className="relative h-56 overflow-hidden bg-gray-200 sm:h-64">
      <motion.div
        className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        initial={{ x: "-140%" }}
        animate={{ x: "230%" }}
        transition={{
          duration: 1.35,
          repeat: Infinity,
          ease: "linear",
          delay: index * 0.12,
        }}
      />
    </div>

    <div className="space-y-5 p-5 sm:p-6">
      <div className="space-y-3">
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-100" />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-100" />
      </div>

      <div className="border-t border-gray-100 pt-5">
        <div className="mb-2 h-3 w-20 animate-pulse rounded bg-[#24B6C1]/15" />
        <div className="h-8 w-36 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="flex justify-end">
        <div className="h-11 w-28 animate-pulse rounded-xl bg-[#24B6C1]/25" />
      </div>
    </div>
  </motion.article>
);

const SearchView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const comunaParam = searchParams.get("comuna");
  const query = searchParams.get("q"); // 🌟 Capturamos el query (código)

  const tieneComunaValida =
    comunaParam !== null &&
    comunaParam !== undefined &&
    comunaParam.trim() !== "";

  const faltaComuna = !tieneComunaValida;

  const [propiedadesData, setPropiedadesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [totalPropiedades, setTotalPropiedades] = useState(0);

  // ESTADOS EXCLUSIVOS DEL MAPA EN DESKTOP
  const [desktopMapLoading, setDesktopMapLoading] = useState(false);
  const [desktopMapError, setDesktopMapError] = useState("");
  const [desktopMapFocusRequest, setDesktopMapFocusRequest] = useState(0);

  // ESTADO DE PAGINACIÓN
  const [totalPaginas, setTotalPaginas] = useState(1);
  const paginaActual = parseInt(searchParams.get("page")) || 1;

  // --- ESTADOS DEL BUSCADOR ---
  const [tipoPropiedad, setTipoPropiedad] = useState(null);
  const [searchQueryInput, setSearchQueryInput] = useState(searchParams.get("q") || ""); 
  const [selectedComuna, setSelectedComuna] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  
  const [accionActiva, setAccionActiva] = useState(() => {
    return searchParams.get("obj") === "2" ? "Arrendar" : "Comprar";
  });
  
  const dropdownRef = useRef(null);
  const suggestionRef = useRef(null);
  const suggestionItemRefs = useRef([]);

  const normalizarTexto = (valor) =>
    String(valor || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  /*
   * Sincroniza el buscador interno con la búsqueda creada por SearchBar.
   * De esta forma la comuna seleccionada se conserva al entrar a /buscar.
   */
  useEffect(() => {
    const codigoPropiedad = searchParams.get("q");
    const comunaId = searchParams.get("comuna");
    const comunaNombre = searchParams.get("comuna_nombre");

    if (codigoPropiedad) {
      setSearchQueryInput(codigoPropiedad);
      setSelectedComuna(null);
      return;
    }

    if (!comunaId) {
      setSelectedComuna(null);
      setSearchQueryInput("");
      return;
    }

    const comunaEncontrada = comunasDataset.find(
      (comuna) => String(comuna.id) === String(comunaId)
    );

    const comunaDesdeUrl =
      comunaEncontrada ||
      (comunaNombre
        ? {
            id: comunaId,
            label: comunaNombre,
          }
        : null);

    setSelectedComuna(comunaDesdeUrl);
    setSearchQueryInput(comunaDesdeUrl?.label || "");
  }, [searchParams.toString()]);

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

  const filteredComunas =
    searchQueryInput.trim().length > 1
      ? comunasDataset.filter((comuna) =>
          normalizarTexto(comuna.label).includes(
            normalizarTexto(searchQueryInput)
          )
        )
      : [];


  const seleccionarComuna = (comuna) => {
    setSearchQueryInput(comuna.label);
    setSelectedComuna(comuna);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleComunaKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!showSuggestions) {
        setShowSuggestions(true);
      }

      if (filteredComunas.length === 0) return;

      setActiveSuggestionIndex((current) =>
        current < filteredComunas.length - 1 ? current + 1 : 0
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!showSuggestions) {
        setShowSuggestions(true);
      }

      if (filteredComunas.length === 0) return;

      setActiveSuggestionIndex((current) =>
        current > 0 ? current - 1 : filteredComunas.length - 1
      );

      return;
    }

    if (event.key === "Enter") {
      if (
        showSuggestions &&
        activeSuggestionIndex >= 0 &&
        filteredComunas[activeSuggestionIndex]
      ) {
        event.preventDefault();
        seleccionarComuna(filteredComunas[activeSuggestionIndex]);
        return;
      }

      event.preventDefault();
      handleSearch();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  useEffect(() => {
    const activeElement =
      suggestionItemRefs.current[activeSuggestionIndex];

    if (
      activeSuggestionIndex < 0 ||
      !showSuggestions ||
      !activeElement
    ) {
      return;
    }

    activeElement.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeSuggestionIndex, showSuggestions]);

  useEffect(() => {
    suggestionItemRefs.current =
      suggestionItemRefs.current.slice(
        0,
        filteredComunas.length
      );

    if (filteredComunas.length === 0) {
      setActiveSuggestionIndex(-1);
      return;
    }

    if (activeSuggestionIndex >= filteredComunas.length) {
      setActiveSuggestionIndex(
        filteredComunas.length - 1
      );
    }
  }, [
    filteredComunas.length,
    activeSuggestionIndex,
  ]);

  const handleSearch = () => {
    const textInput = searchQueryInput.trim();
    const numericOnly = textInput.replace(/\D/g, "");
    
    if (numericOnly !== "" && (textInput.toLowerCase().startsWith("id") || !isNaN(textInput))) {
      setSearchParams({ q: numericOnly });
      setShowSuggestions(false);
      return;
    }

    const objID =
      accionActiva === "Comprar" || accionActiva === "Vender"
        ? 1
        : 2;

    const comunaCoincidente =
      selectedComuna ||
      comunasDataset.find(
        (comuna) =>
          normalizarTexto(comuna.label) ===
          normalizarTexto(textInput)
      );

    const comunaID = comunaCoincidente?.id || "";
    const comunaNombre = comunaCoincidente?.label || "";
    const tipoID =
      tipoPropiedad?.id ||
      searchParams.get("tipo_prop") ||
      "";

    setSearchParams({ 
      ...(tipoID && { tipo_prop: tipoID }), 
      obj: objID, 
      ...(comunaID && { comuna: comunaID }),
      ...(comunaNombre && { comuna_nombre: comunaNombre }),
      page: 1 
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const convertirCoordenada = (valor) => {
    if (valor === null || valor === undefined || valor === "") {
      return null;
    }

    const valorNormalizado =
      typeof valor === "string"
        ? valor.trim().replace(",", ".")
        : valor;

    const numero = Number(valorNormalizado);

    return Number.isFinite(numero) ? numero : null;
  };

  const obtenerCoordenadasPropiedad = (propiedad) => {
    if (!propiedad) return null;

    const lat = convertirCoordenada(
      propiedad.coords?.lat ??
      propiedad.coords?.latitude ??
      propiedad.lat ??
      propiedad.latitude ??
      propiedad.latitud ??
      propiedad.ubicacion?.lat ??
      propiedad.ubicacion?.latitude ??
      propiedad.ubicacion?.latitud
    );

    const lng = convertirCoordenada(
      propiedad.coords?.lng ??
      propiedad.coords?.lon ??
      propiedad.coords?.longitude ??
      propiedad.lng ??
      propiedad.lon ??
      propiedad.longitude ??
      propiedad.longitud ??
      propiedad.ubicacion?.lng ??
      propiedad.ubicacion?.lon ??
      propiedad.ubicacion?.longitude ??
      propiedad.ubicacion?.longitud
    );

    const coordenadasValidas =
      lat !== null &&
      lng !== null &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180 &&
      !(lat === 0 && lng === 0);

    return coordenadasValidas ? { lat, lng } : null;
  };

  const normalizarPropiedadParaMapa = (propiedad) => {
    const coordenadas = obtenerCoordenadasPropiedad(propiedad);

    if (!coordenadas) return propiedad;

    return {
      ...propiedad,
      coords: {
        ...(propiedad.coords || {}),
        lat: coordenadas.lat,
        lng: coordenadas.lng,
      },
    };
  };

  const extraerPropiedadRespuesta = (respuesta) => {
    const candidatos = [
      respuesta?.data?.propiedad,
      respuesta?.propiedad,
      respuesta?.data,
      respuesta,
    ];

    for (const candidato of candidatos) {
      if (Array.isArray(candidato) && candidato.length > 0) {
        return candidato[0];
      }

      if (
        candidato &&
        typeof candidato === "object" &&
        !Array.isArray(candidato)
      ) {
        return candidato;
      }
    }

    return null;
  };

  const combinarPropiedadConDetalle = (propiedadLista, detalle) => ({
    ...propiedadLista,
    ...detalle,
    ubicacion: {
      ...(propiedadLista?.ubicacion || {}),
      ...(detalle?.ubicacion || {}),
    },
    coords: {
      ...(propiedadLista?.coords || {}),
      ...(detalle?.coords || {}),
    },
    precios: {
      ...(propiedadLista?.precios || {}),
      ...(detalle?.precios || {}),
    },
    detalles: {
      ...(propiedadLista?.detalles || {}),
      ...(detalle?.detalles || {}),
    },
    imagenes:
      detalle?.imagenes?.length > 0
        ? detalle.imagenes
        : propiedadLista?.imagenes || [],
  });

  const handlePropertyClick = async (prop) => {
    if (window.innerWidth < 1024) {
      const idParaNavegar = prop.codigo || prop.id;
      navigate(`/propiedad/${idParaNavegar}`);
      return;
    }

    // Marca inmediatamente la tarjeta seleccionada.
    setSelectedProperty(prop);
    setDesktopMapError("");

    const coordenadasListado = obtenerCoordenadasPropiedad(prop);

    if (coordenadasListado) {
      setSelectedProperty(normalizarPropiedadParaMapa(prop));
      setDesktopMapFocusRequest((current) => current + 1);
      return;
    }

    const codigoPropiedad = prop.codigo || prop.id;

    if (!codigoPropiedad) {
      setDesktopMapError(
        "La propiedad seleccionada no tiene un código válido."
      );
      return;
    }

    setDesktopMapLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/propiedades/codigo/${encodeURIComponent(
          codigoPropiedad
        )}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));

        throw new Error(
          payload.error ||
          payload.message ||
          `No fue posible obtener la ubicación (${response.status}).`
        );
      }

      const respuestaDetalle = await response.json();
      const detalle = extraerPropiedadRespuesta(respuestaDetalle);

      if (!detalle) {
        throw new Error(
          "El backend no entregó el detalle de la propiedad."
        );
      }

      const propiedadCompleta = normalizarPropiedadParaMapa(
        combinarPropiedadConDetalle(prop, detalle)
      );

      const coordenadasDetalle =
        obtenerCoordenadasPropiedad(propiedadCompleta);

      if (!coordenadasDetalle) {
        throw new Error(
          "La propiedad no tiene latitud y longitud registradas."
        );
      }

      setSelectedProperty(propiedadCompleta);

      // Obliga a MapView a reconstruirse y centrar la coordenada nueva.
      setDesktopMapFocusRequest((current) => current + 1);
    } catch (error) {
      console.error(
        "Error obteniendo geolocalización de la propiedad:",
        error
      );

      setDesktopMapError(
        error.message ||
        "No fue posible ubicar la propiedad seleccionada."
      );
    } finally {
      setDesktopMapLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchResultados = async () => {
      setLoading(true);
      try {
        const tipo_prop = searchParams.get("tipo_prop");
        const obj = searchParams.get("obj");
        const comuna = searchParams.get("comuna");
        const comunaNombre = searchParams.get("comuna_nombre") || "";
        const codigo = searchParams.get("q");

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

        if (codigo) {
          url = `${API_URL}/api/propiedades/codigo/${encodeURIComponent(codigo)}`;
        } else {
          const params = new URLSearchParams({
            tipo_prop: tipo_prop || "",
            obj: obj || "1",
            comuna: comuna || "",
            comuna_nombre: comunaNombre,
            sup_desde: supDesde,
            sup_hasta: supHasta,
            precio_desde: precioDesde,
            precio_hasta: precioHasta,
            moneda,
            orden,
            page: String(paginaActual),
            limit: "10"
          });

          url = `${API_URL}/api/propiedades/buscar?${params.toString()}`;
        }

        const response = await fetch(url, {
          signal: controller.signal
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => ({}));
          throw new Error(errorPayload.error || `Error HTTP ${response.status}`);
        }

        const json = await response.json();

        if (controller.signal.aborted) return;

        if (json.paginacion && Array.isArray(json.data)) {
          setPropiedadesData(json.data);
          setTotalPropiedades(json.paginacion.totalPropiedades || 0);
          setTotalPaginas(Math.max(json.paginacion.totalPaginas || 1, 1));
          setSelectedProperty(json.data.length > 0 ? json.data[0] : null);
        } else if (Array.isArray(json)) {
          setPropiedadesData(json);
          setTotalPropiedades(json.length);
          setTotalPaginas(1);
          setSelectedProperty(json.length > 0 ? json[0] : null);
        } else if (json.id || json.codigo) {
          setPropiedadesData([json]);
          setTotalPropiedades(1);
          setTotalPaginas(1);
          setSelectedProperty(json);
        } else {
          setPropiedadesData([]);
          setTotalPropiedades(0);
          setTotalPaginas(1);
          setSelectedProperty(null);
        }
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Error buscando propiedades:", error);
        setPropiedadesData([]);
        setTotalPropiedades(0);
        setTotalPaginas(1);
        setSelectedProperty(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchResultados();

    return () => controller.abort();
  }, [searchParams.toString(), paginaActual]);

  const fullSectionStyle = {
    backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 0.4)), url(${fondoMarmol})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed' 
  };

  const selectedDesktopCoordinates =
    obtenerCoordenadasPropiedad(selectedProperty);

  const propiedadesConCoordenadas = propiedadesData
    .map(normalizarPropiedadParaMapa)
    .filter((propiedad) => obtenerCoordenadasPropiedad(propiedad));

  // Solo muestra la propiedad seleccionada cuando ya posee coordenadas.
  // Mientras se obtiene el detalle, conserva los puntos disponibles.
  const propiedadesMapaDesktop =
    selectedProperty && selectedDesktopCoordinates
      ? [normalizarPropiedadParaMapa(selectedProperty)]
      : propiedadesConCoordenadas;


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-[Outfit]">
      <Navbar />

      <div className="bg-[#111111] border-b border-white/5 pt-28 lg:pt-32 pb-8 lg:pb-12 shadow-xl relative z-20">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 flex items-center gap-4 lg:gap-8">
          <button onClick={() => navigate('/')} className="p-3 lg:p-4 border border-white/10 rounded-xl lg:rounded-2xl hover:bg-[#24B6C1] transition-all shrink-0">
            <FaArrowLeft />
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
            <h1 className="text-lg lg:!text-2xl font-bold !font-[Outfit] tracking-tighter uppercase italic leading-tight">
              Total {obtenerLabelPorId(searchParams.get("tipo_prop"))} encontradas <span className="text-[#24B6C1]"> {totalPropiedades}</span> 
            </h1>
          </div>
        </div>
      </div>

      <div style={fullSectionStyle} className="relative py-8 lg:py-12 min-h-screen">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
          
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            
            {/* 🌟 SEARCHBAR PRINCIPAL (Oculto si hay un 'query' de código activo) */}
            {!query && (
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
                    onChange={(e) => {
                      setSearchQueryInput(e.target.value);
                      setActiveSuggestionIndex(-1);
                      setShowSuggestions(true);

                      if (selectedComuna) {
                        setSelectedComuna(null);
                      }
                    }}
                    onFocus={() => {
                      setShowSuggestions(true);
                      setOpenDropdown(false);
                    }}
                    onKeyDown={handleComunaKeyDown}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={
                      showSuggestions &&
                      filteredComunas.length > 0
                    }
                    aria-controls="search-view-comuna-suggestions"
                    aria-activedescendant={
                      activeSuggestionIndex >= 0
                        ? `search-view-comuna-${activeSuggestionIndex}`
                        : undefined
                    }
                    placeholder="Comuna, ciudad o código..."
                    className="w-full px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#24B6C1]"
                  />
                  <AnimatePresence>
                    {showSuggestions && filteredComunas.length > 0 && (
                      <motion.div
                        id="search-view-comuna-suggestions"
                        role="listbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full mt-2 left-0 w-full bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto"
                      >
                        {filteredComunas.map((comuna, index) => (
                          <button
                            type="button"
                            id={`search-view-comuna-${index}`}
                            role="option"
                            aria-selected={
                              activeSuggestionIndex === index
                            }
                            ref={(element) => {
                              suggestionItemRefs.current[index] =
                                element;
                            }}
                            key={`${comuna.id}-${index}`}
                            onMouseEnter={() =>
                              setActiveSuggestionIndex(index)
                            }
                            onClick={() =>
                              seleccionarComuna(comuna)
                            }
                            className={`flex w-full cursor-pointer justify-between px-6 py-4 text-left text-xs transition lg:py-3 ${
                              activeSuggestionIndex === index
                                ? "bg-[#24B6C1]/20 text-[#24B6C1]"
                                : "text-gray-300 hover:bg-[#24B6C1]/20"
                            }`}
                          >
                            <span>{comuna.label}</span>
                            <span className="text-[10px] text-gray-600">
                              ID: {comuna.id}
                            </span>
                          </button>
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
            )}

            {/* AVISO INFORMATIVO CONDICIONAL */}
            <AnimatePresence>
              {faltaComuna && !query && (
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

            {/* FILTROS AVANZADOS */}
            <div className="relative z-30 mb-8">
               {faltaComuna && !query && (
                  <FiltrosAvanzados />
               )}
            </div>

            {/* GRILLA DE RESULTADOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
              {loading ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-1 flex items-center gap-3 rounded-2xl border border-[#24B6C1]/25 bg-black/55 px-4 py-3 shadow-xl backdrop-blur-md md:col-span-2 sm:px-5"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#24B6C1]/10">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#24B6C1]/30 border-t-[#24B6C1]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white sm:text-base">
                        Buscando propiedades
                      </p>
                      <p className="truncate text-xs text-white/50 sm:text-sm">
                        Estamos preparando las mejores coincidencias para ti.
                      </p>
                    </div>
                  </motion.div>

                  {Array.from({ length: 4 }, (_, index) => (
                    <PropertyCardSkeleton
                      key={`property-skeleton-${index}`}
                      index={index}
                    />
                  ))}
                </>
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

            {/* PAGINACIÓN */}
            {!loading && totalPaginas > 1 && !query && (
              <div className="flex justify-center items-center gap-2 mt-12 bg-black/40 p-3 lg:p-4 rounded-3xl border border-white/10 backdrop-blur-md w-full sm:w-fit mx-auto shadow-2xl">
                <button
                  onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), page: paginaActual - 1 })}
                  disabled={paginaActual === 1}
                  className={`flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] lg:text-xs transition-all ${
                    paginaActual === 1 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-[#24B6C1] text-white hover:bg-[#1e9aa3] shadow-lg shadow-[#24B6C1]/20'
                  }`}
                >
                  <FaArrowLeft size={10} className="hidden sm:block" /> Ant
                </button>
                
                <div className="flex gap-1 overflow-x-auto max-w-[150px] sm:max-w-[250px] scrollbar-hide px-2">
                  {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), page: index + 1 })}
                      className={`min-w-[32px] h-8 lg:min-w-[36px] lg:h-9 rounded-lg font-bold transition-all text-xs flex items-center justify-center shrink-0 ${
                        paginaActual === index + 1 ? 'bg-[#24B6C1] text-white shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), page: paginaActual + 1 })}
                  disabled={paginaActual === totalPaginas}
                  className={`flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] lg:text-xs transition-all ${
                    paginaActual === totalPaginas ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-[#24B6C1] text-white hover:bg-[#1e9aa3] shadow-lg shadow-[#24B6C1]/20'
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
              <div className="hidden lg:block h-[480px] relative overflow-hidden shadow-2xl rounded-[40px] border border-white/20 bg-black">
                <Suspense fallback={<MapaFallback />}>
                  <MapView
                    propiedades={propiedadesMapaDesktop}
                    selectedProperty={
                      selectedDesktopCoordinates
                        ? normalizarPropiedadParaMapa(selectedProperty)
                        : null
                    }
                    setSelectedProperty={setSelectedProperty}
                    focusRequest={desktopMapFocusRequest}
                    focusZoom={15.5}
                    focusDuration={1600}
                    focusDesktopOnly
                  />
                </Suspense>

                <AnimatePresence>
                  {desktopMapLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 backdrop-blur-[2px]"
                    >
                      <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/75 px-5 py-4 shadow-2xl">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#24B6C1]/30 border-t-[#24B6C1]" />
                        <span className="text-sm font-bold text-white">
                          Ubicando propiedad...
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!desktopMapLoading && desktopMapError && (
                  <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-amber-300/30 bg-black/80 px-4 py-3 text-xs font-medium text-white shadow-xl backdrop-blur-md">
                    {desktopMapError}
                  </div>
                )}
              </div>

              {/* FORMULARIO */}
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
                      <textarea rows="4" placeholder="Cuéntanos qué tienes en mente" className="w-full bg-white border border-gray-200 px-4 py-4 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24B6C1] resize-none" />
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