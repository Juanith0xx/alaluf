import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaRulerCombined, FaMapMarkerAlt, FaPhoneAlt, 
  FaChevronLeft, FaChevronRight, FaBed, FaBath, 
  FaCar, FaBuilding, FaTag 
} from "react-icons/fa";

const PropertyCard = ({ item, onSelect, isActive }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return null;

  const imagenes = item.imagenes || [];
  const tieneArriendo = item.precios?.arriendo?.valor && item.precios.arriendo.valor !== "0";
  const tieneVenta = item.precios?.venta?.valor && item.precios.venta.valor !== "0";

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

  const renderizarDetalles = () => {
    const tipo = (item.titulo || "").toLowerCase();
    
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
        <div className="flex flex-wrap gap-2 mt-3">
          <InfoItem icon={FaRulerCombined} text={`${m2Construidos} m² Const.`} />
          <InfoItem icon={FaRulerCombined} text={`${m2Terreno} m² Terr.`} />
          {dorms > 0 && <InfoItem icon={FaBed} text={`${dorms} Dorm`} />}
          {banos > 0 && <InfoItem icon={FaBath} text={`${banos} Baños`} />}
        </div>
      );
    }
    
    if (tipo.includes("departamento")) {
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          <InfoItem icon={FaRulerCombined} text={`${m2Totales} m² Totales`} />
          <InfoItem icon={FaRulerCombined} text={`${m2Utiles} m² Útiles`} />
          {dorms > 0 && <InfoItem icon={FaBed} text={`${dorms} Dorm`} />}
          {banos > 0 && <InfoItem icon={FaBath} text={`${banos} Baños`} />}
        </div>
      );
    }

    if (tipo.includes("oficina")) {
      const tipoEdificio = obtenerCampoExtra("tipo edificio");
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          <InfoItem icon={FaRulerCombined} text={`${m2Construidos} m² Const.`} />
          {estac > 0 && <InfoItem icon={FaCar} text={`${estac} Estac.`} />}
          {tipoEdificio && <InfoItem icon={FaBuilding} text={`Clase ${tipoEdificio}`} />}
        </div>
      );
    }

    if (tipo.includes("local")) {
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          <InfoItem icon={FaRulerCombined} text={`${m2Construidos} m² Const.`} />
          {estac > 0 && <InfoItem icon={FaCar} text={`${estac} Estac.`} />}
        </div>
      );
    }

    if (tipo.includes("comercial")) {
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          <InfoItem icon={FaRulerCombined} text={`${m2Construidos} m² Const.`} />
          <InfoItem icon={FaRulerCombined} text={`${m2Terreno} m² Terr.`} />
          {estac > 0 && <InfoItem icon={FaCar} text={`${estac} Estac.`} />}
        </div>
      );
    }

    if (tipo.includes("terreno") && tipo.includes("proyecto")) {
      const uso = obtenerCampoExtra("uso") || obtenerCampoExtra("destino");
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          <InfoItem icon={FaRulerCombined} text={`${m2Terreno} m² Terr.`} />
          {uso && <InfoItem icon={FaTag} text={uso} />}
        </div>
      );
    }

    if (tipo.includes("terreno") && tipo.includes("industrial")) {
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          <InfoItem icon={FaRulerCombined} text={`${m2Terreno} m² Terr.`} />
        </div>
      );
    }

    if (tipo.includes("galpón") || tipo.includes("galpon")) {
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          <InfoItem icon={FaRulerCombined} text={`${m2Construidos} m² Const.`} />
          <InfoItem icon={FaRulerCombined} text={`${m2Terreno} m² Terr.`} />
        </div>
      );
    }

    if (tipo.includes("parcela") || tipo.includes("fundo")) {
      const supTerreno = obtenerCampoExtra("superficie") || m2Terreno;
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          <InfoItem icon={FaRulerCombined} text={`${supTerreno} m² Terr.`} />
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        <InfoItem icon={FaRulerCombined} text={`${item.detalles?.superficie || "0"} m²`} />
      </div>
    );
  };

  return (
    <div 
      onClick={onSelect} 
      className={`bg-white rounded-2xl overflow-hidden shadow-xl group cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-4 ring-[#24B6C1] scale-[1.02]' : 'hover:shadow-2xl'
      }`}
    >
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img 
          src={imagenes.length > 0 ? imagenes[currentImageIndex] : "https://via.placeholder.com/600x400?text=Imagen+No+Disponible+Alaluf"} 
          className="w-full h-full object-cover transition-opacity duration-500"
          alt={`${item.titulo} - Imagen ${currentImageIndex + 1}`}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/600x400?text=Error+al+cargar+foto+de+servidor";
          }}
        />

        {imagenes.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <FaChevronLeft size={12} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <FaChevronRight size={12} />
            </button>
            
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md font-bold backdrop-blur-sm">
              {currentImageIndex + 1} / {imagenes.length}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">
            {item.titulo || "Propiedad"}
          </span>
        </div>
      </div>

      <div className="p-6 text-black">
        <h3 className="text-xl font-bold mb-3 leading-tight uppercase line-clamp-1 text-ellipsis">
          {item.ubicacion?.sector || "Sector No Especificado"}
        </h3>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaMapMarkerAlt className="text-[#24B6C1]" /> 
            <span>{item.ubicacion?.comuna || "Sin Comuna"}, {item.ubicacion?.region || "Chile"}</span>
          </div>
          
          {renderizarDetalles()}

          <div className="text-[10px] text-gray-400 mt-3 font-medium tracking-wide">
            CÓDIGO {item.codigo || item.id}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {tieneArriendo && (
              <div>
                <span className="block text-[10px] text-[#24B6C1] uppercase font-bold tracking-widest leading-none">Arriendo</span>
                <span className="text-gray-900 font-black text-lg">
                  {item.precios.arriendo.valor} <span className="text-xs font-semibold text-gray-500">{item.precios.arriendo.moneda || "UF/m²"}</span>
                </span>
              </div>
            )}
            
            {tieneVenta && (
              <div>
                <span className="block text-[10px] text-[#24B6C1] uppercase font-bold tracking-widest leading-none">Venta</span>
                <span className="text-gray-900 font-black text-lg">
                  {item.precios.venta.valor} <span className="text-xs font-semibold text-gray-500">{item.precios.venta.moneda || "UF/m²"}</span>
                </span>
              </div>
            )}

            {!tieneArriendo && !tieneVenta && (
              <span className="text-[#24B6C1] font-bold text-sm tracking-tight uppercase">Consultar Precio</span>
            )}
          </div>

          <div className="flex gap-2 items-end">
            <button 
              className="p-3 bg-[#24B6C1]/10 text-[#24B6C1] rounded-xl hover:bg-[#24B6C1] hover:text-white transition"
              onClick={(e) => e.stopPropagation()} 
            >
              <FaPhoneAlt size={14} />
            </button>
            <button 
              className="px-5 py-3 bg-[#24B6C1] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:bg-cyan-600 transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/propiedad/${item.codigo || item.id}`);
              }} 
            >
              Ficha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;