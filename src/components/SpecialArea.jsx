import { useState, useEffect } from "react";
import { MapPin, Move, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import fondo from "../assets/Marmol.jpg";

// Imagen de respaldo
import propiedadImgFallback from "../assets/hero2.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const FEATURED_LIMIT = 8;
const CACHE_TTL_MS = 15 * 60 * 1000;
const CACHE_PREFIX = "alaluf_destacadas_v1";

// La caché vive fuera del componente para conservarse si el componente
// se desmonta y vuelve a montarse durante la navegación.
const memoryCache = new Map();

const tabs = ["Residencial", "Terrenos", "Industrial", "Comercial"];

const tabToPropId = {
  Residencial: "1A",
  Terrenos: "6",
  Industrial: "7A",
  Comercial: "4",
  Licitaciones: "12",
};

const getCacheKey = (tipoId) => `${CACHE_PREFIX}:${tipoId}:${FEATURED_LIMIT}`;

const isFreshCache = (entry) => (
  entry &&
  Array.isArray(entry.cards) &&
  Date.now() - entry.savedAt < CACHE_TTL_MS
);

const readSessionCache = (cacheKey) => {
  try {
    const raw = window.sessionStorage.getItem(cacheKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!isFreshCache(parsed)) {
      window.sessionStorage.removeItem(cacheKey);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const saveCache = (cacheKey, cards) => {
  const entry = {
    cards,
    savedAt: Date.now(),
  };

  memoryCache.set(cacheKey, entry);

  try {
    window.sessionStorage.setItem(cacheKey, JSON.stringify(entry));
  } catch {
    // Si sessionStorage no está disponible, la caché en memoria sigue activa.
  }
};

const getCachedCards = (cacheKey) => {
  const memoryEntry = memoryCache.get(cacheKey);
  if (isFreshCache(memoryEntry)) return memoryEntry.cards;

  if (memoryEntry) memoryCache.delete(cacheKey);

  const sessionEntry = readSessionCache(cacheKey);
  if (sessionEntry) {
    memoryCache.set(cacheKey, sessionEntry);
    return sessionEntry.cards;
  }

  return null;
};

const formatearMoneda = (valor, moneda) => {
  const numero = Number.parseFloat(valor || 0);
  const monedaNormalizada = String(moneda || "UF").trim().toUpperCase();

  if (!Number.isFinite(numero) || numero <= 0) return "Consultar";

  if (
    monedaNormalizada === "$" ||
    monedaNormalizada === "CLP" ||
    monedaNormalizada === "PESOS"
  ) {
    return `$ ${numero.toLocaleString("es-CL")}`;
  }

  return `${numero.toLocaleString("es-CL")} ${moneda || "UF"}`;
};

const mapearDestacadas = (propiedades, tab) => (
  propiedades.slice(0, FEATURED_LIMIT).map((item, index) => {
    const valVenta = Number.parseFloat(item.precios?.venta?.valor || 0);
    const monedaVenta = item.precios?.venta?.moneda || "UF";
    const valArriendo = Number.parseFloat(item.precios?.arriendo?.valor || 0);
    const monedaArriendo = item.precios?.arriendo?.moneda || "UF";

    const precioMostrar = valVenta > 0
      ? formatearMoneda(valVenta, monedaVenta)
      : formatearMoneda(valArriendo, monedaArriendo);

    const superficie = Number.parseFloat(item.detalles?.superficie || 0);

    return {
      id: item.id || item.codigo || `${tab}-${index}`,
      codigo: item.codigo || item.id,
      tipo: tab,
      titulo: item.titulo || "Propiedad Destacada",
      ubicacion: item.ubicacion?.comuna || "Consultar ubicación",
      size: Number.isFinite(superficie) && superficie > 0
        ? `${superficie.toLocaleString("es-CL")} m2`
        : "Consultar m2",
      precio: precioMostrar,
      img: item.imagenes?.[0] || propiedadImgFallback,
    };
  })
);

const fetchConTimeout = async (url, externalSignal, timeoutMs = 5000) => {
  const controller = new AbortController();
  const abortFromOutside = () => controller.abort();

  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    externalSignal.addEventListener("abort", abortFromOutside, { once: true });
  }

  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
  } finally {
    window.clearTimeout(timeoutId);
    externalSignal?.removeEventListener("abort", abortFromOutside);
  }
};

const solicitarDestacadas = async (tab, signal) => {
  const tipoId = tabToPropId[tab] || "1";
  const cacheKey = getCacheKey(tipoId);
  const cachedCards = getCachedCards(cacheKey);

  if (cachedCards) {
    return { cards: cachedCards, source: "frontend-cache" };
  }

  const params = new URLSearchParams({
    tipo_prop: tipoId,
    limit: String(FEATURED_LIMIT),
  });

  // Endpoint rápido: no construye el catálogo completo ni calcula todas las páginas.
  const endpointRapido = `${API_URL}/api/propiedades/destacadas?${params.toString()}`;
  let response = await fetchConTimeout(endpointRapido, signal);

  // Compatibilidad temporal mientras se despliega el nuevo endpoint backend.
  if (response.status === 404) {
    const fallbackParams = new URLSearchParams({
      tipo_prop: tipoId,
      destaq: "true",
      page: "1",
      limit: String(FEATURED_LIMIT),
    });

    response = await fetchConTimeout(
      `${API_URL}/api/propiedades/buscar?${fallbackParams.toString()}`,
      signal
    );
  }

  if (!response.ok) {
    let detail = "";
    try {
      const errorBody = await response.json();
      detail = errorBody?.error ? `: ${errorBody.error}` : "";
    } catch {
      // La respuesta podría no ser JSON.
    }

    throw new Error(`Error al contactar el backend${detail}`);
  }

  const dataBackend = await response.json();
  const propiedadesList = Array.isArray(dataBackend?.data)
    ? dataBackend.data
    : [];

  const cards = mapearDestacadas(propiedadesList, tab);
  saveCache(cacheKey, cards);

  return {
    cards,
    source: dataBackend?.meta?.cache ? "backend-cache" : "backend",
  };
};

const EspecialPorArea = () => {
  const [activeTab, setActiveTab] = useState("Residencial");
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchDestacadas = async () => {
      const tipoId = tabToPropId[activeTab] || "1";
      const cachedCards = getCachedCards(getCacheKey(tipoId));

      if (cachedCards) {
        setCards(cachedCards);
        setLoading(false);
      } else {
        setLoading(true);
      }

      const startTime = performance.now();

      try {
        const resultado = await solicitarDestacadas(activeTab, controller.signal);

        if (!mounted || controller.signal.aborted) return;

        setCards(resultado.cards);

        const tiempoEnSegundos = (
          (performance.now() - startTime) / 1000
        ).toFixed(2);

        console.log(
          `🚀 [PERFORMANCE] Destacadas '${activeTab}': ${tiempoEnSegundos}s (${resultado.source})`
        );
      } catch (error) {
        if (error?.name === "AbortError") return;

        console.error("Error obteniendo propiedades:", error);

        if (!cachedCards && mounted) {
          setCards([]);
        }
      } finally {
        if (mounted && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDestacadas();
    setActiveIndex(0);

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [activeTab]);

  // Precarga las otras pestañas cuando el navegador queda libre. Esto no
  // bloquea la primera tarjeta y hace instantáneos los cambios posteriores.
  useEffect(() => {
    if (loading) return undefined;

    let cancelled = false;
    let idleId;
    let timeoutId;

    const prefetch = async () => {
      for (const tab of tabs) {
        if (cancelled || tab === activeTab) continue;

        const tipoId = tabToPropId[tab];
        if (getCachedCards(getCacheKey(tipoId))) continue;

        try {
          await solicitarDestacadas(tab);
        } catch (error) {
          if (error?.name !== "AbortError") {
            console.warn(`No fue posible precargar '${tab}':`, error.message);
          }
        }
      }
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(prefetch, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(prefetch, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [activeTab, loading]);

  useEffect(() => {
    if (cards.length <= 1) return undefined;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, [cards.length]);

  const handlePrev = () => {
    if (cards.length > 0) {
      setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (cards.length > 0) {
      setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }
  };

  const getIndex = (index) => (index + cards.length) % cards.length;

  return (
    <section className="relative py-12 md:py-20 bg-cover bg-center text-white overflow-hidden" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Barra de Tabs */}
        <div className="relative flex items-center justify-center mb-8 md:mb-12 font-[Outfit] text-sm md:text-base w-full">
          <div className="hidden lg:block absolute -left-50 top-1/2 -translate-y-1/2 h-[1px] bg-[#05FFEA] w-[44%]"></div>
          <div className="relative flex gap-6 md:gap-8 px-2 md:px-6 overflow-x-auto whitespace-nowrap scrollbar-hide w-full lg:w-auto justify-start lg:justify-center pb-2">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`transition pb-1 ${activeTab === tab ? "text-cyan-400 font-semibold border-b border-cyan-400" : "text-gray-300 hover:text-white"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="hidden lg:block absolute -right-50 top-1/2 -translate-y-1/2 h-[1px] bg-[#05FFEA] w-[44%]"></div>
        </div>

        {/* Título */}
        <div className="text-center mb-8 md:mb-12 font-[Outfit] px-2">
          <h2 className="text-2xl md:text-[36px] font-medium text-[#0091A4] leading-tight mb-2">ESPECIAL POR ÁREA</h2>
          <p className="text-gray-300 text-sm md:text-base">Propiedades seleccionadas por nuestro equipo</p>
        </div>

        {/* Carga / Vacío */}
        {loading && <div className="text-center text-cyan-400 py-20 font-[Outfit] animate-pulse text-lg">Buscando propiedades destacadas...</div>}
        {!loading && cards.length === 0 && <div className="text-center text-gray-400 py-20 font-[Outfit] text-lg">No hay propiedades disponibles.</div>}

        {/* Carrusel */}
        {!loading && cards.length > 0 && (
          <div className="relative flex items-center justify-center gap-6 pt-10 md:pt-14 pb-8 md:pb-12">
            {cards.length > 1 && (
              <button onClick={handlePrev} className="hidden md:flex absolute -left-12 lg:-left-16 text-cyan-400 hover:scale-110 transition z-30">
                <ArrowLeft size={36} />
              </button>
            )}

            {[-1, 0, 1].map((offset) => {
              if (cards.length === 1 && offset !== 0) return null;
              const index = getIndex(activeIndex + offset);
              const isActive = offset === 0;

              return (
                <motion.div key={`${index}-${offset}`} initial={{ scale: 0.85, opacity: 0.6 }} animate={{ scale: isActive ? 1.25 : 0.85, opacity: isActive ? 1 : 0.6, y: isActive ? -20 : 0 }} transition={{ duration: 0.5 }} className={`flex flex-col md:flex-row shadow-2xl overflow-hidden relative rounded-xl md:rounded-none ${isActive ? "z-20 flex w-[260px] sm:w-[320px] md:w-[480px]" : "z-10 hidden md:flex md:w-[300px] grayscale"}`}>
                  <div className="relative w-full h-[180px] sm:h-[220px] md:h-auto md:w-1/2">
                    <img
                      src={cards[index].img}
                      alt="Propiedad"
                      className="w-full h-full object-cover"
                      loading={isActive ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={isActive ? "high" : "auto"}
                    />
                    <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-white text-black text-xs md:text-sm px-3 md:px-4 py-1 font-medium font-[Outfit]">{cards[index].tipo}</span>
                  </div>
                  <div className="w-full md:w-1/2 bg-[#3a3a3a]/95 p-5 md:p-6 flex flex-col justify-center font-[Outfit]">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 leading-tight truncate">{cards[index].titulo}</h3>
                    <div className="flex items-center gap-2 text-gray-300 mb-2 text-xs sm:text-sm md:text-base"><MapPin size={16} className="text-cyan-400 shrink-0" /><span className="truncate">{cards[index].ubicacion}</span></div>
                    <div className="flex items-center gap-2 text-gray-300 mb-4 md:mb-6 text-xs sm:text-sm md:text-base"><Move size={16} className="text-cyan-400 shrink-0" />{cards[index].size}</div>
                    <div className="w-full h-[1px] bg-cyan-400 mb-4 md:mb-6"></div>
                    <div className="mb-4 md:mb-6"><p className="text-gray-300 text-xs sm:text-sm">Precio</p><p className="text-cyan-400 text-lg md:text-xl font-semibold">{cards[index].precio}</p></div>
                    <div className="flex items-center gap-3 md:gap-4">
                      <Link to={`/propiedad/${cards[index].codigo}`} className="flex-1 border border-cyan-400 text-center text-white text-xs sm:text-sm py-2 hover:bg-cyan-400/10 transition block">Ver ficha</Link>
                      <button className="p-2 border border-cyan-400 hover:bg-cyan-400/10 transition flex items-center justify-center"><Phone size={18} className="text-cyan-400 md:w-5 md:h-5" /></button>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {cards.length > 1 && (
              <button onClick={handleNext} className="hidden md:flex absolute -right-12 lg:-right-16 text-cyan-400 hover:scale-110 transition z-30">
                <ArrowRight size={36} />
              </button>
            )}
          </div>
        )}

        {!loading && cards.length > 1 && (
          <div className="flex md:hidden items-center justify-center gap-8 mt-2">
            <button onClick={handlePrev} className="text-cyan-400 bg-white/10 p-2 rounded-full hover:bg-cyan-400/20 transition"><ArrowLeft size={24} /></button>
            <button onClick={handleNext} className="text-cyan-400 bg-white/10 p-2 rounded-full hover:bg-cyan-400/20 transition"><ArrowRight size={24} /></button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EspecialPorArea;