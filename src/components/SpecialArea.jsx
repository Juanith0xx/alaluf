import { useState, useEffect } from "react";
import { MapPin, Move, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import fondo from "../assets/Marmol.jpg";

// Imagen de respaldo
import propiedadImgFallback from "../assets/hero2.jpg";

const EspecialPorArea = () => {
  const [activeTab, setActiveTab] = useState("Residencial");
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["Residencial", "Terrenos", "Industrial", "Comercial"];

  // Mapeo de pestañas a IDs de tu BD
  const tabToPropId = {
    "Residencial": "1",  
    "Terrenos": "6",     
    "Industrial": "7",   
    "Comercial": "4",    
    "Licitaciones": "12" 
  };

  // 🌟 LLAMADA A TU BACKEND EXPRESS
  useEffect(() => {
    const fetchDestacadas = async () => {
      setLoading(true);
      try {
        const tipoId = tabToPropId[activeTab] || "1";
        
        const urlBackend = `http://localhost:5000/api/propiedades/buscar?tipo_prop=${tipoId}&destaq=true`; 
        
        const response = await fetch(urlBackend);
        if (!response.ok) throw new Error("Error en la red al contactar el backend");
        
        const dataBackend = await response.json();
        
        const propiedadesList = dataBackend.data || [];

        const propiedadesMapeadas = propiedadesList.map((item) => {
          const valVenta = parseFloat(item.precios?.venta?.valor || 0);
          const monedaVenta = item.precios?.venta?.moneda || "UF";

          const valArriendo = parseFloat(item.precios?.arriendo?.valor || 0);
          const monedaArriendo = item.precios?.arriendo?.moneda || "UF";
          
          // 🌟 AQUÍ ESTÁ EL CAMBIO: Función para detectar y formatear UF o $
          const formatearMoneda = (valor, moneda) => {
            const monedaLimpia = moneda.trim().toUpperCase();
            if (monedaLimpia === '$' || monedaLimpia === 'CLP' || monedaLimpia === 'PESOS') {
              return `$ ${valor.toLocaleString('es-CL')}`;
            }
            // Si es UF u otra moneda, la pone al final
            return `${valor.toLocaleString('es-CL')} ${moneda}`;
          };

          const precioMostrar = valVenta > 0 
            ? formatearMoneda(valVenta, monedaVenta)
            : (valArriendo > 0 ? formatearMoneda(valArriendo, monedaArriendo) : "Consultar");

          return {
            id: item.id || Math.random(),
            codigo: item.codigo || item.id, 
            tipo: activeTab,
            titulo: item.titulo || "Propiedad Destacada",
            ubicacion: item.ubicacion?.comuna || "Consultar ubicación",
            size: item.detalles?.superficie ? `${parseFloat(item.detalles.superficie).toLocaleString('es-CL')} m2` : "Consultar m2",
            precio: precioMostrar,
            img: item.imagenes?.[0] || propiedadImgFallback,
          };
        });

        setCards(propiedadesMapeadas);
      } catch (error) {
        console.error("Error obteniendo propiedades destacadas:", error);
        setCards([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchDestacadas();
    setActiveIndex(0); 
  }, [activeTab]);

  // Auto-play cada 8 segundos
  useEffect(() => {
    if (cards.length <= 1) return; 

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const handlePrev = () => {
    if (cards.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (cards.length === 0) return;
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const getIndex = (index) => (index + cards.length) % cards.length;

  return (
    <section
      className="relative py-12 md:py-20 bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Barra de Tabs */}
        <div className="relative flex items-center justify-center mb-8 md:mb-12 font-[Outfit] text-sm md:text-base w-full">
          <div className="hidden lg:block absolute -left-50 top-1/2 -translate-y-1/2 h-[1px] bg-[#05FFEA] w-[44%]"></div>

          <div className="relative flex gap-6 md:gap-8 px-2 md:px-6 overflow-x-auto whitespace-nowrap scrollbar-hide w-full lg:w-auto justify-start lg:justify-center pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition pb-1 ${
                  activeTab === tab
                    ? "text-cyan-400 font-semibold border-b border-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="hidden lg:block absolute -right-50 top-1/2 -translate-y-1/2 h-[1px] bg-[#05FFEA] w-[44%]"></div>
        </div>

        {/* Título principal */}
        <div className="text-center mb-8 md:mb-12 font-[Outfit] px-2">
          <h2 className="text-2xl md:text-[36px] font-medium text-[#0091A4] leading-tight mb-2">
            ESPECIAL POR ÁREA
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Propiedades seleccionadas por nuestro equipo
          </p>
        </div>

        {/* ESTADOS DE CARGA Y VACÍO */}
        {loading && (
          <div className="text-center text-cyan-400 py-20 font-[Outfit] animate-pulse text-lg">
            Buscando propiedades destacadas...
          </div>
        )}

        {!loading && cards.length === 0 && (
          <div className="text-center text-gray-400 py-20 font-[Outfit] text-lg">
            No hay propiedades destacadas en esta categoría por el momento.
          </div>
        )}

        {/* Carrusel */}
        {!loading && cards.length > 0 && (
          <div className="relative flex items-center justify-center gap-6 pt-10 md:pt-14 pb-8 md:pb-12">
            {/* Flecha izquierda (Desktop) */}
            {cards.length > 1 && (
              <button
                onClick={handlePrev}
                className="hidden md:flex absolute -left-12 lg:-left-16 text-cyan-400 hover:scale-110 transition z-30"
              >
                <ArrowLeft size={36} />
              </button>
            )}

            {[-1, 0, 1].map((offset) => {
              if (cards.length === 1 && offset !== 0) return null;

              const index = getIndex(activeIndex + offset);
              const isActive = offset === 0;

              return (
                <motion.div
                  key={`${index}-${offset}`}
                  initial={{ scale: 0.85, opacity: 0.6 }}
                  animate={{
                    scale: isActive ? 1.25 : 0.85,
                    opacity: isActive ? 1 : 0.6,
                    y: isActive ? -20 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`flex flex-col md:flex-row shadow-2xl overflow-hidden relative rounded-xl md:rounded-none ${
                    isActive
                      ? "z-20 flex w-[260px] sm:w-[320px] md:w-[480px]"
                      : "z-10 hidden md:flex md:w-[300px] grayscale"
                  }`}
                >
                  {/* Imagen */}
                  <div className="relative w-full h-[180px] sm:h-[220px] md:h-auto md:w-1/2">
                    <img
                      src={cards[index].img}
                      alt="Propiedad"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-white text-black text-xs md:text-sm px-3 md:px-4 py-1 font-medium font-[Outfit]">
                      {cards[index].tipo}
                    </span>
                  </div>

                  {/* Panel derecho */}
                  <div className="w-full md:w-1/2 bg-[#3a3a3a]/95 p-5 md:p-6 flex flex-col justify-center font-[Outfit]">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 leading-tight truncate">
                      {cards[index].titulo}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                      <MapPin size={16} className="text-cyan-400 shrink-0" />
                      <span className="truncate">{cards[index].ubicacion}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 mb-4 md:mb-6 text-xs sm:text-sm md:text-base">
                      <Move size={16} className="text-cyan-400 shrink-0" />
                      {cards[index].size}
                    </div>

                    <div className="w-full h-[1px] bg-cyan-400 mb-4 md:mb-6"></div>

                    <div className="mb-4 md:mb-6">
                      <p className="text-gray-300 text-xs sm:text-sm">Precio</p>
                      <p className="text-cyan-400 text-lg md:text-xl font-semibold">
                        {cards[index].precio}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                      <Link 
                        to={`/propiedad/${cards[index].codigo}`} 
                        className="flex-1 border border-cyan-400 text-center text-white text-xs sm:text-sm py-2 hover:bg-cyan-400/10 transition block"
                      >
                        Ver ficha
                      </Link>
                      
                      <button className="p-2 border border-cyan-400 hover:bg-cyan-400/10 transition flex items-center justify-center">
                        <Phone size={18} className="text-cyan-400 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Flecha derecha (Desktop) */}
            {cards.length > 1 && (
              <button
                onClick={handleNext}
                className="hidden md:flex absolute -right-12 lg:-right-16 text-cyan-400 hover:scale-110 transition z-30"
              >
                <ArrowRight size={36} />
              </button>
            )}
          </div>
        )}

        {/* Controles de navegación táctil (Solo Móvil) */}
        {!loading && cards.length > 1 && (
          <div className="flex md:hidden items-center justify-center gap-8 mt-2">
            <button
              onClick={handlePrev}
              className="text-cyan-400 bg-white/10 p-2 rounded-full hover:bg-cyan-400/20 transition"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="text-cyan-400 bg-white/10 p-2 rounded-full hover:bg-cyan-400/20 transition"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        )}

        {/* Indicadores */}
        {!loading && cards.length > 1 && (
          <div className="flex justify-center gap-3 mt-6 md:mt-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-[#05FFEA] scale-110" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EspecialPorArea;