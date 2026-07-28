import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  FaRulerCombined, FaMapMarkerAlt, FaPhoneAlt, 
  FaChevronLeft, FaChevronRight, FaBed, FaBath, 
  FaCar, FaBuilding, FaTag, FaRulerVertical,
  FaCheckCircle, FaDoorClosed 
} from "react-icons/fa";

const PropertyCard = ({ item, onSelect, isActive }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const actualizarModoResponsive = () => {
      setIsResponsive(mediaQuery.matches);
    };

    actualizarModoResponsive();
    mediaQuery.addEventListener("change", actualizarModoResponsive);

    return () => {
      mediaQuery.removeEventListener("change", actualizarModoResponsive);
    };
  }, []);

  if (!item) return null;

  const imagenes = item.imagenes || [];
  const tieneArriendo = item.precios?.arriendo?.valor && item.precios.arriendo.valor !== "0";
  const tieneVenta = item.precios?.venta?.valor && item.precios.venta.valor !== "0";

  // 🌟 LÓGICA DE FILTRADO ESTRICTO SEGÚN LA URL 🌟
  const objParam = searchParams.get("obj");
  if (objParam === "1" && !tieneVenta) return null;   
  if (objParam === "2" && !tieneArriendo) return null; 

  const nextImage = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const obtenerCampoExtra = (termino) => {
    if (!item.caracteristicasExtra) return null;
    const campo = item.caracteristicasExtra.find(c => c.label.toLowerCase().includes(termino.toLowerCase()));
    return campo && campo.value !== null ? campo.value : null;
  };

  // 🌟 FUNCIÓN FORMATO INTELIGENTE: 2 decimales si existen, ninguno si es entero
  const formatearPrecio = (valor) => {
    if (!valor) return "0";
    const numero = parseFloat(valor);
    if (isNaN(numero)) return valor;
    
    const esDecimal = numero % 1 !== 0;
    
    return numero.toLocaleString("es-CL", {
      minimumFractionDigits: esDecimal ? 2 : 0,
      maximumFractionDigits: esDecimal ? 2 : 0,
    });
  };

  const renderizarDetalles = () => {
    const tipo = (
      item.tipoPropiedad ||
      item.tipo ||
      item.categoria ||
      item.titulo ||
      ""
    ).toLowerCase();
    
    const dorms = item.detalles?.dormitorios || 0;
    const banos = item.detalles?.banos || 0;
    const estac = item.detalles?.estacionamientos || 0;
    
    const m2Construidos = obtenerCampoExtra("construidos") || item.detalles?.superficie || "0";
    const m2Terreno = obtenerCampoExtra("terreno") || item.detalles?.superficie || "0";
    const m2Utiles = obtenerCampoExtra("útiles") || item.detalles?.superficie || "0";
    const m2Totales = obtenerCampoExtra("totales") || item.detalles?.superficie || "0";

    const InfoItem = ({ icon: Icon, text }) => (
      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
        <Icon className="text-[#24B6C1] text-xs" />
        <span className="text-xs font-medium text-gray-600">{text}</span>
      </div>
    );

    if (tipo.includes("casa") && !tipo.includes("comercial")) {
      return (
        <div className="flex flex-wrap gap-2 mt-3 font-[Outfit]">
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Construidos)} m² Const.`} />
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Terreno)} m² Terr.`} />
          {dorms > 0 && <InfoItem icon={FaBed} text={`${dorms} Dorm`} />}
          {banos > 0 && <InfoItem icon={FaBath} text={`${banos} Baños`} />}
        </div>
      );
    }
    
    if (tipo.includes("departamento")) {
      return (
        <div className="flex flex-wrap gap-2 mt-3 font-[Outfit]">
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Totales)} m² Totales`} />
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Utiles)} m² Útiles`} />
          {dorms > 0 && <InfoItem icon={FaBed} text={`${dorms} Dorm`} />}
          {banos > 0 && <InfoItem icon={FaBath} text={`${banos} Baños`} />}
        </div>
      );
    }

    if (tipo.includes("oficina")) {
      const tipoEdificio = obtenerCampoExtra("tipo edificio");
      const habilitada = obtenerCampoExtra("habilitada");
      const privados = obtenerCampoExtra("privados");

      return (
        <div className="flex flex-wrap gap-2 mt-3 font-[Outfit]">
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Construidos)} m²`} />
          {habilitada && <InfoItem icon={FaCheckCircle} text={`Habitada: ${habilitada}`} />}
          {tipoEdificio && <InfoItem icon={FaBuilding} text={`Edificio ${tipoEdificio}`} />}
          {privados !== null && parseInt(privados) > 0 && (
            <InfoItem icon={FaDoorClosed} text={`${privados} Privados`} />
          )}
        </div>
      );
    }

    if (tipo.includes("local")) {
      const habilitado = obtenerCampoExtra("habilitado");
      const banosLocal = item.detalles?.banos || 0;

      return (
        <div className="flex flex-wrap gap-2 mt-3 font-[Outfit]">
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Construidos)} m²`} />
          {habilitado && <InfoItem icon={FaCheckCircle} text={`Habilitado: ${habilitado}`} />}
          {estac > 0 && <InfoItem icon={FaCar} text={`${estac} Estac.`} />}
          {banosLocal > 0 && <InfoItem icon={FaBath} text={`${banosLocal} Baños`} />}
        </div>
      );
    }

    if (tipo.includes("comercial")) {
      return (
        <div className="flex flex-wrap gap-2 mt-3 font-[Outfit]">
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Construidos)} m² Const.`} />
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Terreno)} m² Terr.`} />
          {estac > 0 && <InfoItem icon={FaCar} text={`${estac} Estac.`} />}
        </div>
      );
    }

    if (tipo.includes("terreno industrial") || tipo.includes("industrial")) {
      const frente = obtenerCampoExtra("frente");
      const fondo = obtenerCampoExtra("fondo");

      return (
        <div className="flex flex-wrap gap-2 mt-3 font-[Outfit]">
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Terreno)} m²`} />
          {frente && <InfoItem icon={FaRulerVertical} text={`Frente: ${frente} mts`} />}
          {fondo && <InfoItem icon={FaRulerVertical} text={`Fondo: ${fondo} mts`} />}
        </div>
      );
    }

    if (tipo.includes("terreno")) {
      const uso = obtenerCampoExtra("uso") || obtenerCampoExtra("destino");
      const densidad = obtenerCampoExtra("densidad");
      const altura = obtenerCampoExtra("altura");

      return (
        <div className="flex flex-wrap gap-2 mt-3 font-[Outfit]">
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Terreno)} m²`} />
          {uso && <InfoItem icon={FaTag} text={uso} />}
          {densidad && <InfoItem icon={FaBuilding} text={`Densidad: ${densidad}`} />}
          {altura && <InfoItem icon={FaRulerVertical} text={`Altura: ${altura}`} />}
        </div>
      );
    }

    if (tipo.includes("galpón") || tipo.includes("galpon")) {
      const trifasica = obtenerCampoExtra("trifásica") || obtenerCampoExtra("trifasica");
      const alturaGalpon = obtenerCampoExtra("altura");

      return (
        <div className="flex flex-wrap gap-2 mt-3 font-[Outfit]">
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Construidos)} m² Const.`} />
          <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(m2Terreno)} m² Terr.`} />
          {trifasica && <InfoItem icon={FaCheckCircle} text={`Trifásica: ${trifasica}`} />}
          {alturaGalpon && <InfoItem icon={FaRulerVertical} text={`Altura: ${alturaGalpon}`} />}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2 mt-3 font-[Outfit]">
        <InfoItem icon={FaRulerCombined} text={`${formatearPrecio(item.detalles?.superficie || "0")} m²`} />
      </div>
    );
  };

  const codigoPropiedad = item.codigo || item.id;

  const irAlDetalle = () => {
    if (!codigoPropiedad) return;
    navigate(`/propiedad/${codigoPropiedad}`);
  };

  const handleCardClick = () => {
    if (isResponsive) {
      irAlDetalle();
      return;
    }

    onSelect?.();
  };

  const handleCardKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    handleCardClick();
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      aria-label={`Ver propiedad ${codigoPropiedad || ""}`}
      className={`bg-white rounded-2xl overflow-hidden shadow-xl group cursor-pointer transition-all duration-300 font-[Outfit] ${
        isActive ? 'ring-4 ring-[#24B6C1] scale-[1.02]' : 'hover:shadow-2xl'
      }`}
    >
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img 
          src={imagenes.length > 0 ? imagenes[currentImageIndex] : "https://via.placeholder.com/600x400?text=Imagen+No+Disponible"} 
          className="w-full h-full object-cover transition-opacity duration-500"
          alt={item.titulo}
        />

        {imagenes.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 z-10"><FaChevronLeft size={12} /></button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 z-10"><FaChevronRight size={12} /></button>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md font-bold">{currentImageIndex + 1} / {imagenes.length}</div>
          </>
        )}
      </div>

      <div className="p-6 text-black font-[Outfit]">
        <h3 className="text-xl font-bold mb-3 leading-tight uppercase line-clamp-1">{item.ubicacion?.sector || "Sector No Especificado"}</h3>
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaMapMarkerAlt className="text-[#24B6C1]" /> 
            <span>{item.ubicacion?.comuna || "Sin Comuna"}, {item.ubicacion?.region || "Chile"}</span>
          </div>
          {renderizarDetalles()}
        </div>

        <div className="border-t border-gray-100 pt-4 flex flex-col gap-3 font-[Outfit]">
  {tieneVenta && (
    <div className="flex flex-col">
      <span className="text-[#24B6C1] text-[11px] font-black uppercase tracking-widest">Venta</span>
      <span className="text-black font-black text-2xl">
        {(item.precios.venta.moneda === "$" || item.precios.venta.moneda?.toUpperCase() === "CLP")
          ? `$${formatearPrecio(item.precios.venta.valor)}`
          : `${formatearPrecio(item.precios.venta.valor)} `
        }
        {!(item.precios.venta.moneda === "$" || item.precios.venta.moneda?.toUpperCase() === "CLP") && (
          <span className="text-base font-bold text-gray-600 ml-1">{item.precios.venta.moneda}</span>
        )}
      </span>
    </div>
  )}

  {tieneArriendo && (
    <div className="flex flex-col">
      <span className="text-[#24B6C1] text-[11px] font-black uppercase tracking-widest">Arriendo</span>
      <span className="text-black font-black text-2xl">
        {(item.precios.arriendo.moneda === "$" || item.precios.arriendo.moneda?.toUpperCase() === "CLP")
          ? `$${formatearPrecio(item.precios.arriendo.valor)}`
          : `${formatearPrecio(item.precios.arriendo.valor)} `
        }
        {!(item.precios.arriendo.moneda === "$" || item.precios.arriendo.moneda?.toUpperCase() === "CLP") && (
          <span className="text-base font-medium text-gray-500 ml-1">{item.precios.arriendo.moneda}</span>
        )}
      </span>
    </div>
  )}

  <div className="hidden lg:flex justify-end mt-2">
    <button 
      type="button"
      className="px-5 py-3 bg-[#24B6C1] text-white rounded-xl font-bold text-xs uppercase shadow-md hover:bg-cyan-600 transition"
      onClick={(e) => {
        e.stopPropagation();
        irAlDetalle();
      }} 
    >
      Ver Ficha
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default PropertyCard;