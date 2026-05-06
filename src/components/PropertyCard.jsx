import { useState, useEffect } from "react";
import { FaRulerCombined, FaMapMarkerAlt, FaPhoneAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Agregamos onSelect e isActive a los props
const PropertyCard = ({ item, onSelect, isActive }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // DEBUG: Revisa esto en la consola de tu navegador (F12)
  useEffect(() => {
    if (item) {
      console.log(`Datos de la propiedad ${item.codigo || item.id}:`, item.imagenes);
    }
  }, [item]);

  if (!item) return null;

  const imagenes = item.imagenes || [];
  const tieneArriendo = item.precios?.arriendo?.valor && item.precios.arriendo.valor !== "0";
  const tieneVenta = item.precios?.venta?.valor && item.precios.venta.valor !== "0";

  const nextImage = (e) => {
    e.stopPropagation(); // Evitamos que el clic en la flecha active el onSelect de la card
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation(); // Evitamos que el clic en la flecha active el onSelect de la card
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  return (
    <div 
      onClick={onSelect} // Disparador para centrar el mapa
      className={`bg-white rounded-2xl overflow-hidden shadow-xl group cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-4 ring-[#24B6C1] scale-[1.02]' : 'hover:shadow-2xl'
      }`}
    >
      {/* Carrusel de Imágenes */}
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

      {/* Contenido */}
      <div className="p-6 text-black">
        <h3 className="text-xl font-bold mb-4 leading-tight uppercase">
          {item.ubicacion?.sector || "Sector No Especificado"}
        </h3>
        
        <div className="space-y-3 text-gray-500 text-sm mb-6">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#24B6C1]" /> 
            <span>{item.ubicacion?.comuna || "Sin Comuna"}, {item.ubicacion?.region || "Chile"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRulerCombined className="text-[#24B6C1]" /> 
            <span>
              {item.detalles?.superficie || "0"} m² Útiles 
              {item.detalles?.privados ? ` | ${item.detalles.privados} Privados` : ""}
            </span>
          </div>
          <div className="text-[10px] text-gray-400 mt-2">
            Código {item.codigo || item.id}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            {tieneArriendo && (
              <div>
                <span className="block text-[10px] text-[#24B6C1] uppercase font-bold tracking-widest leading-none">Arriendo</span>
                <span className="text-gray-900 font-bold text-lg">
                  {item.precios.arriendo.valor} <span className="text-sm font-semibold">{item.precios.arriendo.moneda || "UF/m²"}</span>
                </span>
              </div>
            )}
            
            {tieneVenta && (
              <div>
                <span className="block text-[10px] text-[#24B6C1] uppercase font-bold tracking-widest leading-none">Venta</span>
                <span className="text-gray-900 font-bold text-lg">
                  {item.precios.venta.valor} <span className="text-sm font-semibold">{item.precios.venta.moneda || "UF/m²"}</span>
                </span>
              </div>
            )}

            {!tieneArriendo && !tieneVenta && (
              <span className="text-[#24B6C1] font-bold text-lg tracking-tight uppercase">Consultar Precio</span>
            )}
          </div>

          <div className="flex gap-2 items-end">
            <button 
              className="p-3 bg-[#24B6C1]/10 text-[#24B6C1] rounded-xl hover:bg-[#24B6C1] hover:text-white transition"
              onClick={(e) => e.stopPropagation()} // Evita activar el onSelect al querer llamar
            >
              <FaPhoneAlt size={14} />
            </button>
            <button 
              className="px-6 py-3 bg-[#24B6C1] text-white rounded-xl font-bold text-sm"
              onClick={(e) => e.stopPropagation()} // Evita activar el onSelect al ver ficha
            >
              Ver ficha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;