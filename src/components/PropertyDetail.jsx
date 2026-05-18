import React, { useState } from "react";
import { 
  FaRulerCombined, FaBed, FaBath, FaCar, FaMapMarkerAlt, 
  FaChevronLeft, FaChevronRight, FaCalendarAlt, FaClock,
  FaCheckCircle, FaArrowLeft, FaInfoCircle, FaWhatsapp, 
  FaFacebookF, FaEnvelope, FaInstagram, FaTiktok, FaTimes,
  FaSun, FaMoon 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MapView from "./MapView"; 
import ContactForm from "./ContacForm"; 

// Importamos el asset del fondo de mármol
import fondoMarmol from '../assets/Marmol.jpg'; 

const PropertyDetail = ({ property }) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  // 🌟 ESTADOS PARA EL AGENDAMIENTO DE VISITAS
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [bloqueHorario, setBloqueHorario] = useState(null); // 'manana' o 'tarde'
  const [horaSeleccionada, setHoraSeleccionada] = useState(null); // 🌟 NUEVO ESTADO: Guarda la hora exacta elegida

  if (!property) return null;

  const imagenes = property.imagenes || [];
  const precioPrincipal = property.precios?.venta?.valor || property.precios?.arriendo?.valor;
  const moneda = property.precios?.venta?.moneda || property.precios?.arriendo?.moneda;

  // 🌟 DEFINICIÓN DE RANGOS HORARIOS DISPONIBLES (Intervalos de 30 minutos)
  const rangoManana = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
  const rangoTarde = ["14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

  const getExtra = (label) => {
    return property.detalles?.caracteristicasExtra?.find(
      c => c.label.toLowerCase().includes(label.toLowerCase())
    )?.value || "No especificado";
  };

  const handleContactSubmit = (data) => {
    console.log("Contacto para propiedad:", property.codigo, data);
  };

  const openLightbox = (index) => {
    setActiveImage(index);
    setIsLightboxOpen(true);
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % imagenes.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const currentUrl = encodeURIComponent(window.location.href);

  const copiarEnlace = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("¡Enlace de la propiedad copiado al portapapeles! Ya puedes pegarlo en tus redes sociales.");
  };

  const handleFilterClick = (tag) => {
    setActiveFilter(prev => prev === tag ? null : tag);
  };

  // GENERADOR DINÁMICO DE LOS PRÓXIMOS 7 DÍAS
  const generarProximosDias = () => {
    const dias = [];
    const opcionesDia = { weekday: "short" };
    const opcionesNumero = { day: "numeric" };

    for (let i = 0; i < 7; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + i);

      if (fecha.getDay() === 0) continue; // Saltar domingos

      dias.push({
        id: fecha.toISOString().split("T")[0],
        nombre: fecha.toLocaleDateString("es-CL", opcionesDia).replace(".", "").toUpperCase(),
        numero: fecha.toLocaleDateString("es-CL", opcionesNumero),
        fechaCompleta: fecha.toLocaleDateString("es-CL", { day: 'numeric', month: 'long' })
      });
    }
    return dias;
  };

  const diasDisponibles = generarProximosDias();

  if (!diaSeleccionado && diasDisponibles.length > 0) {
    setDiaSeleccionado(diasDisponibles[0]);
  }

  // Confirmar el agendamiento de la visita
  const handleConfirmarVisita = () => {
    if (!diaSeleccionado || !bloqueHorario || !horaSeleccionada) {
      alert("Por favor, selecciona un día, un bloque y la hora exacta de tu visita.");
      return;
    }
    
    alert(`¡Solicitud de visita enviada!\nPropiedad: ${property.codigo}\nFecha: ${diaSeleccionado.fechaCompleta}\nHora: ${horaSeleccionada} hrs\nUn asesor Alaluf se contactará contigo para confirmar.`);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed font-[Outfit] pb-20 text-gray-900"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      <div className="max-w-[1400px] mx-auto px-6 pt-32 pb-10 grid lg:grid-cols-12 gap-12">
        
        {/* COLUMNA IZQUIERDA: CONTENIDO PRINCIPAL */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. GALERÍA ASIMÉTRICA DE FOTOS */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-[40px] overflow-hidden shadow-2xl bg-black/5 md:h-[480px]">
            <div 
              className="col-span-1 md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer h-64 md:h-full"
              onClick={() => openLightbox(0)}
            >
              <img src={imagenes[0] || "/placeholder.jpg"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Vista principal" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-300" />
            </div>

            {[1, 2, 3].map((idx) => (
              <div key={idx} className="hidden md:block md:col-span-1 relative overflow-hidden group cursor-pointer h-full" onClick={() => openLightbox(idx)}>
                <img src={imagenes[idx] || imagenes[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={`Vista interior ${idx}`} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-300" />
              </div>
            ))}

            <div className="hidden md:block md:col-span-1 relative overflow-hidden group cursor-pointer h-full" onClick={() => openLightbox(4)}>
              <img src={imagenes[4] || imagenes[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Vista complementaria" />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-end justify-end p-4">
                <span className="bg-white hover:bg-[#24B6C1] hover:text-white text-[#24B6C1] px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-[#24B6C1]/20 transition-all duration-300 transform group-hover:scale-105">
                  Ver más fotos
                </span>
              </div>
            </div>
          </section>

          {/* 2. BARRA DE CONTROL INTEGRADA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/30 px-6 py-4 rounded-[24px] backdrop-blur-md border border-white/10 text-white shadow-lg">
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-[#24B6C1] transition font-semibold bg-white/10 px-4 py-2 rounded-full border border-white/5 text-sm">
                <FaArrowLeft size={12} /> Volver al listado
              </button>
              <span className="text-white/20 hidden sm:inline">|</span>
              <div className="text-[11px] font-bold tracking-widest uppercase opacity-90 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                Código Alaluf: {property.codigo}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs uppercase font-bold tracking-wider text-gray-300 mr-1 hidden md:inline">Compartir:</span>
              <a href={`https://api.whatsapp.com/send?text=Mira%20esta%20propiedad%20en%20Alaluf:%20${currentUrl}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/10 hover:bg-[#25D366] rounded-full transition-colors text-white">
                <FaWhatsapp size={14} />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/10 hover:bg-[#1877F2] rounded-full transition-colors text-white">
                <FaFacebookF size={14} />
              </a>
              <a href={`mailto:?subject=Propiedad%20Alaluf%20-%20${property.titulo}&body=Mira%20esta%20oportunidad%20en%20Alaluf:%20${currentUrl}`} className="p-2.5 bg-white/10 hover:bg-[#24B6C1] rounded-full transition-colors text-white">
                <FaEnvelope size={14} />
              </a>
              <button onClick={copiarEnlace} className="p-2.5 bg-white/10 hover:bg-[#E1306C] rounded-full transition-colors text-white">
                <FaInstagram size={14} />
              </button>
              <button onClick={copiarEnlace} className="p-2.5 bg-white/10 hover:bg-black rounded-full transition-colors text-white border border-white/5">
                <FaTiktok size={14} />
              </button>
            </div>
          </div>

          {/* 3. BLOQUE BLANCO DE DETALLES INMUEBLE */}
          <div className="bg-white/95 backdrop-blur-sm rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-100 space-y-10">
            
            {/* Info Principal */}
            <section className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <span className="bg-[#24B6C1] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {property.titulo}
                </span>
                <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {property.operacion}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-none">
                {property.ubicacion?.sector || "Ubicación Privilegiada"}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-base md:text-lg">
                <FaMapMarkerAlt className="text-[#24B6C1]" />
                <span>{property.ubicacion?.direccion}, {property.ubicacion?.comuna}</span>
              </div>
              <div className="pt-4 flex flex-wrap items-baseline gap-4">
                <span className="text-4xl md:text-5xl font-black text-[#24B6C1]">{precioPrincipal} {moneda}</span>
                <span className="text-gray-400 text-sm font-medium">Gastos comunes: {getExtra("Gastos Comunes")}</span>
              </div>
            </section>

            {/* Características Técnicas */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100">
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

            {/* Descripción */}
            <section className="space-y-4">
              <h3 className="text-2xl font-bold uppercase italic tracking-tighter">Descripción de la propiedad</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base md:text-lg">
                {property.detalles?.descripcion || "Contáctanos para obtener más detalles."}
              </p>
            </section>

            {/* 5. ENTORNO Y MAPA */}
            <section className="space-y-6">
              <div className="flex flex-wrap justify-between items-end gap-4">
                <h3 className="text-2xl font-bold uppercase italic tracking-tighter">Conoce el entorno</h3>
                <div className="flex gap-2">
                  {["Transporte", "Servicios", "Educación"].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => handleFilterClick(tag)}
                      className={`px-4 py-1.5 border rounded-lg text-[10px] font-bold transition-all duration-300 ${
                        activeFilter === tag
                          ? "bg-[#24B6C1] text-white border-[#24B6C1] shadow-md scale-105"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="w-full h-[350px] md:h-[400px] rounded-[30px] overflow-hidden border border-gray-100 shadow-lg">
                <MapView 
                  propiedades={[property]} 
                  selectedProperty={property} 
                  activeFilter={activeFilter} 
                />
              </div>
            </section>

          </div>
        </div>

        {/* COLUMNA DERECHA: SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            
            {/* WIDGET DE AGENDA CON TOPES HORARIOS DINÁMICOS */}
            <div className="bg-white/95 backdrop-blur-sm rounded-[40px] p-6 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-1 text-gray-900">Agenda tu visita</h3>
              <p className="text-gray-400 text-xs mb-6">Elige el día y rango horario que más te acomode.</p>
              
              {/* Selector de Días Horizontal */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-[#24B6C1]" /> 1. Selecciona el día
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin snap-x">
                  {diasDisponibles.map((dia) => {
                    const isSelected = diaSeleccionado?.id === dia.id;
                    return (
                      <button
                        key={dia.id}
                        type="button"
                        onClick={() => setDiaSeleccionado(dia)}
                        className={`flex flex-col items-center justify-center min-w-[55px] h-[65px] rounded-2xl border transition-all snap-center ${
                          isSelected
                            ? "bg-[#24B6C1] text-white border-[#24B6C1] shadow-md scale-105"
                            : "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-[10px] font-bold tracking-tight opacity-80">{dia.nombre}</span>
                        <span className="text-lg font-black tracking-tighter mt-0.5">{dia.numero}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector de Bloques Horarios Modificado */}
              <div className="space-y-4 mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <FaClock className="text-[#24B6C1]" /> 2. Selecciona el horario
                </label>
                
                <div className="grid grid-cols-1 gap-3">
                  {/* Opción Bloque Mañana */}
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => { setBloqueHorario("manana"); setHoraSeleccionada(null); }}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                        bloqueHorario === "manana"
                          ? "border-[#24B6C1] bg-[#24B6C1]/5 shadow-sm"
                          : "border-gray-100 bg-gray-50/50 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${bloqueHorario === "manana" ? "bg-[#24B6C1] text-white" : "bg-gray-100 text-gray-500"}`}>
                          <FaSun size={14} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-800">Bloque Mañana</div>
                          <div className="text-xs text-gray-500 mt-0.5">09:00 a 13:00 hrs</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${bloqueHorario === "manana" ? "border-[#24B6C1]" : "border-gray-300"}`}>
                        {bloqueHorario === "manana" && <div className="w-2 h-2 bg-[#24B6C1] rounded-full" />}
                      </div>
                    </button>

                    {/* 🌟 Horas detalladas para el Bloque Mañana */}
                    {bloqueHorario === "manana" && (
                      <div className="grid grid-cols-4 gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 animate-fadeIn">
                        {rangoManana.map((hora) => (
                          <button
                            key={hora}
                            type="button"
                            onClick={() => setHoraSeleccionada(hora)}
                            className={`py-2 text-xs font-bold rounded-xl text-center border transition-all ${
                              horaSeleccionada === hora
                                ? "bg-[#24B6C1] text-white border-[#24B6C1] shadow-sm"
                                : "bg-white text-gray-700 border-gray-200/60 hover:bg-gray-100"
                            }`}
                          >
                            {hora}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Opción Bloque Tarde */}
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => { setBloqueHorario("tarde"); setHoraSeleccionada(null); }}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                        bloqueHorario === "tarde"
                          ? "border-[#24B6C1] bg-[#24B6C1]/5 shadow-sm"
                          : "border-gray-100 bg-gray-50/50 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${bloqueHorario === "tarde" ? "bg-[#24B6C1] text-white" : "bg-gray-100 text-gray-500"}`}>
                          <FaMoon size={14} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-800">Bloque Tarde</div>
                          <div className="text-xs text-gray-500 mt-0.5">14:30 a 18:00 hrs</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${bloqueHorario === "tarde" ? "border-[#24B6C1]" : "border-gray-300"}`}>
                        {bloqueHorario === "tarde" && <div className="w-2 h-2 bg-[#24B6C1] rounded-full" />}
                      </div>
                    </button>

                    {/* 🌟 Horas detalladas para el Bloque Tarde */}
                    {bloqueHorario === "tarde" && (
                      <div className="grid grid-cols-4 gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 animate-fadeIn">
                        {rangoTarde.map((hora) => (
                          <button
                            key={hora}
                            type="button"
                            onClick={() => setHoraSeleccionada(hora)}
                            className={`py-2 text-xs font-bold rounded-xl text-center border transition-all ${
                              horaSeleccionada === hora
                                ? "bg-[#24B6C1] text-white border-[#24B6C1] shadow-sm"
                                : "bg-white text-gray-700 border-gray-200/60 hover:bg-gray-100"
                            }`}
                          >
                            {hora}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botón de Confirmación */}
              <button 
                type="button"
                onClick={handleConfirmarVisita}
                className="w-full py-4 bg-[#24B6C1] hover:bg-[#1da0ab] text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-[#24B6C1]/20 active:scale-[0.98] transition-all duration-200"
              >
                Confirmar Visita
              </button>
            </div>

            {/* Formulario de Contacto Modular */}
            <ContactForm 
              className="!rounded-[40px] !p-8 border border-gray-100 shadow-sm md:w-full bg-white/95 backdrop-blur-sm"
              onSubmitSuccess={handleContactSubmit}
            />
          </div>
        </div>

      </div>

      {/* MODAL LIGHTBOX FULL-SCREEN CON NAVEGACIÓN */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 shadow-xl">
          <button 
            onClick={() => setIsLightboxOpen(false)} 
            className="absolute right-6 top-6 text-white/70 hover:text-white p-3 bg-white/10 rounded-full transition z-10"
          >
            <FaTimes size={24} />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
            <img 
              src={imagenes[activeImage]} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg select-none" 
              alt={`Zoom imagen ${activeImage + 1}`} 
            />

            {imagenes.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 bg-black/30 hover:bg-black/50 rounded-full transition group z-10"
                >
                  <FaChevronLeft size={30} className="group-hover:scale-110 transition-transform"/>
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 bg-black/30 hover:bg-black/50 rounded-full transition group z-10"
                >
                  <FaChevronRight size={30} className="group-hover:scale-110 transition-transform"/>
                </button>
              </>
            )}
          </div>
          
          <div className="text-white/70 mt-4 font-light">
            {activeImage + 1} / {imagenes.length}
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertyDetail;