import { useState } from "react";
import { 
  FaRulerCombined, FaBed, FaBath, FaCar, FaMapMarkerAlt, 
  FaChevronLeft, FaChevronRight, FaCalendarAlt, FaClock,
  FaCheckCircle, FaArrowLeft, FaWhatsapp, FaInfoCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MapView from "./MapView"; // Reutilizamos tu componente de mapa

const PropertyDetail = ({ property }) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  if (!property) return null;

  const imagenes = property.imagenes || [];
  const precioPrincipal = property.precios?.venta?.valor || property.precios?.arriendo?.valor;
  const moneda = property.precios?.venta?.moneda || property.precios?.arriendo?.moneda;

  // 💡 Función para buscar características específicas en el arreglo extra
  const getExtra = (label) => {
    return property.detalles?.caracteristicasExtra?.find(
      c => c.label.toLowerCase().includes(label.toLowerCase())
    )?.value || "No especificado";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-[Outfit] pb-20">
      
      {/* HEADER NAVEGACIÓN */}
      <div className="bg-black text-white py-4 px-6 sticky top-0 z-50 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm hover:text-[#24B6C1] transition">
          <FaArrowLeft /> Volver al listado
        </button>
        <div className="text-[10px] font-bold tracking-widest uppercase opacity-60">
          Código Alaluf: {property.codigo}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10 grid lg:grid-cols-12 gap-12">
        
        {/* COLUMNA IZQUIERDA: CONTENIDO PRINCIPAL */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* 1. GALERÍA DE IMÁGENES */}
          <section className="relative rounded-[40px] overflow-hidden group shadow-2xl bg-gray-100">
            <div className="aspect-[16/9] relative">
              <img 
                src={imagenes[activeImage]} 
                className="w-full h-full object-cover transition-opacity duration-500"
                alt="Vista propiedad"
              />
              
              {imagenes.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImage(prev => prev === 0 ? imagenes.length -1 : prev -1)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => prev === imagenes.length -1 ? 0 : prev +1)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition"
                  >
                    <FaChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="absolute bottom-6 right-6 bg-black/70 text-white px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md border border-white/10">
                {activeImage + 1} / {imagenes.length}
              </div>
            </div>
          </section>

          {/* 2. INFO PRINCIPAL */}
          <section className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#24B6C1] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {property.titulo}
              </span>
              <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {property.operacion}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-none">
              {property.ubicacion?.sector || "Ubicación Privilegiada"}
            </h1>
            
            <div className="flex items-center gap-2 text-gray-500 text-lg">
              <FaMapMarkerAlt className="text-[#24B6C1]" />
              <span>{property.ubicacion?.direccion}, {property.ubicacion?.comuna}</span>
            </div>

            <div className="pt-6 flex items-baseline gap-4">
              <span className="text-5xl font-black text-[#24B6C1]">{precioPrincipal} {moneda}</span>
              <span className="text-gray-400 text-sm font-medium">Gastos comunes: {getExtra("Gastos Comunes")}</span>
            </div>
          </section>

          {/* 3. CARACTERÍSTICAS TÉCNICAS (Grid) */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-gray-100">
            <div className="space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Superficie</span>
              <div className="flex items-center gap-2 font-bold text-lg italic">
                <FaRulerCombined className="text-[#24B6C1]" /> {property.detalles?.superficie} m²
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Dormitorios</span>
              <div className="flex items-center gap-2 font-bold text-lg italic">
                <FaBed className="text-[#24B6C1]" /> {property.detalles?.dormitorios || "0"} Dorm.
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Baños</span>
              <div className="flex items-center gap-2 font-bold text-lg italic">
                <FaBath className="text-[#24B6C1]" /> {property.detalles?.banos || "0"} Baños
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Estacionamiento</span>
              <div className="flex items-center gap-2 font-bold text-lg italic">
                <FaCar className="text-[#24B6C1]" /> {property.detalles?.estacionamientos || "0"} Estac.
              </div>
            </div>
          </section>

          {/* 4. DESCRIPCIÓN */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold uppercase italic tracking-tighter">Descripción de la propiedad</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
              {property.detalles?.descripcion || "Contáctanos para obtener más detalles sobre esta excelente oportunidad de inversión en Alaluf."}
            </p>
          </section>

          {/* 5. ENTORNO Y MAPA */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-bold uppercase italic tracking-tighter">Conoce el entorno</h3>
              <div className="flex gap-2">
                {["Transporte", "Servicios", "Educación"].map(tag => (
                  <button key={tag} className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-bold hover:bg-gray-50 transition">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[400px] rounded-[40px] overflow-hidden border border-gray-100 shadow-xl">
              <MapView propiedades={[property]} selectedProperty={property} />
            </div>
          </section>

        </div>

        {/* COLUMNA DERECHA: SIDEBAR DE CONTACTO */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-8">
            
            {/* WIDGET AGENDA (Estilo Houm) */}
            <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Agenda tu visita</h3>
              <p className="text-gray-500 text-sm mb-6">Selecciona una fecha y hora para que un asesor te muestre la propiedad.</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer hover:border-[#24B6C1] transition">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-[#24B6C1]" />
                    <span className="font-bold text-sm">Lunes, 15 de Mayo</span>
                  </div>
                  <FaChevronRight size={10} className="text-gray-300" />
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer hover:border-[#24B6C1] transition">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-[#24B6C1]" />
                    <span className="font-bold text-sm">10:00 AM</span>
                  </div>
                  <FaChevronRight size={10} className="text-gray-300" />
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-[#24B6C1] text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-[#24B6C1]/20 hover:scale-[1.02] transition">
                Confirmar Visita
              </button>
            </div>

            {/* WIDGET CONTACTO DIRECTO */}
            <div className="bg-black rounded-[40px] p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#24B6C1] flex items-center justify-center font-black">A</div>
                <div>
                  <div className="text-xs text-gray-400 font-bold">Asesor asignado</div>
                  <div className="font-bold">Consultoría Alaluf</div>
                </div>
              </div>
              <button className="w-full py-4 border border-white/20 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition">
                <FaWhatsapp size={16} className="text-[#25D366]" /> Contactar por WhatsApp
              </button>
            </div>

            {/* REQUISITOS (Basado en PDF Houm) */}
            <div className="px-4 space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <FaInfoCircle className="text-[#24B6C1]" /> ¿Qué necesitas para comprar? 
              </h4>
              <ul className="space-y-3">
                {[
                  "Crédito hipotecario pre-aprobado [cite: 175, 176]",
                  "Pie entre el 10% y 20% del valor [cite: 177, 178]",
                  "Comisión de corretaje 2% + IVA "
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                    <FaCheckCircle className="text-[#24B6C1] mt-0.5 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;