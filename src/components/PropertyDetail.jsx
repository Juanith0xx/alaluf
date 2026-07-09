import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import {
  FaRulerCombined,
  FaBed,
  FaBath,
  FaCar,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaArrowLeft,
  FaInfoCircle,
  FaWhatsapp,
  FaFacebookF,
  FaEnvelope,
  FaInstagram,
  FaTiktok,
  FaTimes,
  FaSun,
  FaMoon,
  FaBuilding,
  FaDoorClosed
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 🌟 Importación del componente de Toast personalizado
import AlalufToast from "./AlalufToast";

// 🌟 LAZY LOADING: MapView
const MapView = lazy(() => import("./MapView"));

import ContactForm from "./ContacForm"; 

// Importamos el asset del fondo de mármol
import fondoMarmol from '../assets/Marmol.jpg'; 

const PropertyDetail = ({ property }) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  // ESTADOS PARA EL AGENDAMIENTO DE VISITAS
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [bloqueHorario, setBloqueHorario] = useState(null); // 'manana' o 'tarde'

  // 🌟 ESTADO PARA EL CONTROL DEL TOAST
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  // ESTADOS PARA EL FLUJO DE AGENDA ADJUNTO AL FORMULARIO
  const [visitaAgendada, setVisitaAgendada] = useState(null);
  const [enviandoLead, setEnviandoLead] = useState(false);

  // 🌟 FUNCIÓN PARA MOSTRAR EL TOAST (Reemplaza al alert nativo)
  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    // Auto-ocultar después de 4 segundos
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  if (!property) return null;

  
console.log("PROPERTY", property);
console.log("PRECIOS", property.precios);

  const imagenes = property.imagenes || [];
  // Determinamos el precio y la moneda basándonos en si es venta o arriendo

  const formatearPrecioConMoneda = (precio) => {
  if (!precio || precio.valor == null) return null;

  const moneda = (precio.moneda || "").trim().toUpperCase();
  const numero = parseFloat(precio.valor);

  if (moneda === "$" || moneda === "CLP") {
    return `$${formatearPrecio(numero)}`;
  }

  if (moneda === "UF/M2" || moneda === "UF/M²") {
    return `${formatearPrecio(numero)} UF/M²`;
  }

  if (moneda === "UF" && numero % 1 !== 0) {
    return `${formatearPrecio(numero)} UF/M²`;
  }

  return `${formatearPrecio(numero)} ${precio.moneda}`;
};

  const tipo = (
    property.desc_tipo ||
    property.tipoPropiedad ||
    property.tipo ||
    property.categoria ||
    property.titulo ||
    ""
  ).toLowerCase();

  // 🌟 FORMATEO INTELIGENTE: Sin decimales para enteros, 2 decimales para fraccionarios
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

  const getExtra = (label) => {
    return property.detalles?.caracteristicasExtra?.find(
      c => c.label.toLowerCase().includes(label.toLowerCase())
    )?.value || "No especificado";
  };

  const getCampo = (texto) => {
    const campo = property.campos_especificos?.find(
      c => c.label?.toLowerCase().includes(texto.toLowerCase())
    );
    if (campo?.value === null || campo?.value === undefined || campo?.value === "") {
      return "Sin información";
    }
    return campo.value;
  };

  const handleContactSubmit = async (formData) => {
    const nombreContacto = formData?.nombre || formData?.razon_social || "";
    const email = formData?.email || formData?.correo || "";
    const fono = formData?.fono || formData?.telefono || "";
    const requerimiento = formData?.requerimiento || formData?.mensaje || "";

    if (!nombreContacto.trim()) {
      showToast("Por favor, completa tu Nombre Completo.", "error");
      return;
    }

    if (!email.trim() && !fono.trim()) {
      showToast("Por favor, ingresa al menos un Correo o Teléfono.", "error");
      return;
    }

    let requerimientoFinal = requerimiento.trim();
    if (visitaAgendada) {
      const detalleVisita = `--- ASUNTO: Solicitud de Visita Agendada ---\nDía: ${visitaAgendada.fechaFormateada}\nBloque: ${visitaAgendada.hora}`;
      requerimientoFinal = requerimientoFinal ? `${requerimientoFinal}\n\n${detalleVisita}` : detalleVisita;
    }

    setEnviandoLead(true);

    try {
      const leadData = {
        razon_social: nombreContacto.trim(),
        rut: formData?.rut || "12345678-9", 
        email: email.trim(),
        fono: fono.trim(),
        requerimiento: requerimientoFinal,
        id_objetivo_llamada: property.precios?.venta?.valor ? 1 : 2,
        id_tipo_propiedad: property.idtipo || null, 
        fk_comuna: property.ubicacion?.comuna_id || null,
        id_prop_pw: String(property.codigo) || "0",
        agendamiento: !!visitaAgendada,
        fecha_visita_meli: visitaAgendada ? visitaAgendada.fechaId : "",
        hora_visita_meli: visitaAgendada ? visitaAgendada.hora : ""
      };

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/save_lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });

      if (response.ok) {
        showToast("¡Solicitud enviada con éxito! Un asesor te contactará pronto.", "success");
        setVisitaAgendada(null);
      } else {
        showToast("Hubo un error al registrar tu solicitud.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Error de conexión con el servidor.", "error");
    } finally {
      setEnviandoLead(false);
    }
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
    showToast("¡Enlace copiado al portapapeles!", "success");
  };

  const generarProximosDias = () => {
    const dias = [];
    for (let i = 0; i < 7; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + i);
      if (fecha.getDay() === 0) continue; 
      dias.push({
        id: fecha.toISOString().split("T")[0],
        nombre: fecha.toLocaleDateString("es-CL", { weekday: "short" }).replace(".", "").toUpperCase(),
        numero: fecha.toLocaleDateString("es-CL", { day: "numeric" }),
        fechaCompleta: fecha.toLocaleDateString("es-CL", { day: 'numeric', month: 'long' })
      });
    }
    return dias;
  };

  const diasDisponibles = generarProximosDias();

  useEffect(() => {
    if (!diaSeleccionado && diasDisponibles.length > 0) {
      setDiaSeleccionado(diasDisponibles[0]);
    }
  }, [diasDisponibles, diaSeleccionado]);

  const getExtraValue = (texto) => {
    const campo = property.detalles?.caracteristicasExtra?.find(
      c => c.label?.toLowerCase().includes(texto.toLowerCase())
    );
    return (campo?.value === null || campo?.value === undefined || campo?.value === "") 
      ? "Sin información" 
      : campo.value;
  };

  const Feature = ({ icon: Icon, title, value }) => (
    <div className="space-y-1">
      <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest block">{title}</span>
      <div className="flex items-center gap-2 font-bold text-lg italic"><Icon className="text-[#24B6C1]" />{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed font-[Outfit] pb-20 text-gray-900" style={{ backgroundImage: `url(${fondoMarmol})` }}>
      
      <AlalufToast 
        visible={toast.visible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-24 sm:pt-28 lg:pt-32 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        
        <div className="col-span-1 lg:col-span-8 space-y-6">
          
          <section className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl bg-black/5 h-64 sm:h-80 md:h-[400px] lg:h-[480px]">
            <div className="col-span-1 md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer h-full" onClick={() => openLightbox(0)}>
              <img src={imagenes[0] || "/placeholder.jpg"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Principal" />
            </div>
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="hidden md:block md:col-span-1 relative overflow-hidden group cursor-pointer h-full" onClick={() => openLightbox(idx)}>
                <img src={imagenes[idx] || imagenes[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Interior" />
              </div>
            ))}
            <div className="hidden md:block md:col-span-1 relative overflow-hidden group cursor-pointer h-full" onClick={() => openLightbox(4)}>
              <img src={imagenes[4] || imagenes[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Mas" />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-end justify-end p-4">
                <span className="bg-white text-[#24B6C1] px-4 py-2 rounded-full text-xs font-bold shadow-lg">Ver más</span>
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/30 px-4 md:px-6 py-4 rounded-[20px] md:rounded-[24px] backdrop-blur-md border border-white/10 text-white shadow-lg">
            <div className="flex flex-row items-center gap-4">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-[#24B6C1] transition font-semibold bg-white/10 px-4 py-2 rounded-full text-xs">
                <FaArrowLeft size={12} /> Volver
              </button>
              <div className="text-[10px] font-bold tracking-widest uppercase bg-white/5 px-4 py-2 rounded-full border border-white/5">
                Código Alaluf: {property.codigo}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={`https://api.whatsapp.com/send?text=Mira%20esta%20propiedad:%20${currentUrl}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/10 hover:bg-[#25D366] rounded-full text-white transition-colors"><FaWhatsapp size={13} /></a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/10 hover:bg-[#1877F2] rounded-full text-white transition-colors"><FaFacebookF size={13} /></a>
              <button onClick={copiarEnlace} className="p-2.5 bg-white/10 hover:bg-[#24B6C1] rounded-full text-white transition-colors"><FaInstagram size={13} /></button>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-[24px] md:rounded-[40px] p-5 md:p-8 lg:p-10 shadow-xl border border-gray-100 space-y-8">
            <section className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#24B6C1] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{property.titulo}</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{property.operacion}</span>
              </div>
              <h1 className="text-2xl md:text-5xl font-bold tracking-tighter leading-tight text-gray-900">{property.ubicacion?.sector || "Ubicación Privilegiada"}</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm md:text-lg">
                <FaMapMarkerAlt className="text-[#24B6C1]" /> {property.ubicacion?.direccion}, {property.ubicacion?.comuna}
              </div>

<div className="space-y-2">

  {property.precios?.venta?.valor != null && (
    <div className="text-3xl md:text-3xl font-bold text-[#252525]  ">
      Venta: <span className="text-[#24B6C1] font-black">{formatearPrecioConMoneda(property.precios.venta)}</span>
    </div>
  )}

  {property.precios?.arriendo?.valor != null && (
    <div className="text-3xl md:text-3xl font-bold text-[#252525]">
      Arriendo: <span className="text-[#24B6C1] font-black">{formatearPrecioConMoneda(property.precios.arriendo)}</span>
    </div>
  )}

</div>



              </section>

            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-100">
              {tipo.includes("casa") && !tipo.includes("comercial") && (
                <>
                  <Feature icon={FaRulerCombined} title="Construidos" value={`${formatearPrecio(getExtraValue("construidos") || getCampo("terreno") || 0)} m²`} />
                  <Feature icon={FaRulerCombined} title="Terreno" value={`${formatearPrecio(getExtraValue("terreno") || property.detalles?.superficie || 0)} m²`} />
                  <Feature icon={FaBed} title="Dormitorios" value={property.detalles?.dormitorios || 0} />
                  <Feature icon={FaBath} title="Baños" value={property.detalles?.banos || 0} />
                </>
              )}
              {tipo.includes("departamento") && (
                <>
                  <Feature icon={FaRulerCombined} title="Totales" value={`${formatearPrecio(getExtraValue("totales") || 0)} m²`} />
                  <Feature icon={FaRulerCombined} title="Útiles" value={`${formatearPrecio(getExtraValue("útiles") || 0)} m²`} />
                  <Feature icon={FaBed} title="Dormitorios" value={property.detalles?.dormitorios || 0} />
                  <Feature icon={FaBath} title="Baños" value={property.detalles?.banos || 0} />
                </>
              )}
              {tipo.includes("oficina") && (
                <>
                  <Feature icon={FaRulerCombined} title="Superficie" value={`${formatearPrecio(getExtraValue("construidos") || property.detalles?.superficie || 0)} m²`} />
                  <Feature icon={FaBuilding} title="Edificio" value={getExtraValue("tipo edificio")} />
                  <Feature icon={FaDoorClosed} title="Privados" value={getExtraValue("privados")} />
                  <Feature icon={FaBath} title="Baños" value={property.detalles?.banos || 0} />
                </>
              )}
              {tipo.includes("local") && (
                <>
                  <Feature icon={FaRulerCombined} title="Superficie" value={`${formatearPrecio(property.detalles?.superficie || 0)} m²`} />
                  <Feature icon={FaCheckCircle} title="Habilitado" value={getExtraValue("habilitado")} />
                  <Feature icon={FaCar} title="Estacionamientos" value={property.detalles?.estacionamientos || 0} />
                  <Feature icon={FaBath} title="Baños" value={property.detalles?.banos || 0} />
                </>
              )}
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold uppercase italic tracking-tighter">Descripción de la propiedad</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-lg">
                {property.caracteristicas_internet || property.detalles?.descripcion}
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold uppercase italic tracking-tighter">Ubicación aproximada</h3>
              <div className="w-full h-[300px] md:h-[400px] rounded-[24px] overflow-hidden shadow-lg border border-gray-100">
                <Suspense fallback={<div className="w-full h-full bg-gray-100 animate-pulse" />}>
                  <MapView propiedades={[property]} selectedProperty={property} />
                </Suspense>
              </div>
            </section>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-[24px] md:rounded-[40px] p-5 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold mb-1 text-gray-900">Agenda tu visita</h3>
              <p className="text-gray-400 text-xs mb-6">Elige el bloque horario que más te acomode.</p>
              
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {diasDisponibles.map((dia) => (
                  <button key={dia.id} onClick={() => setDiaSeleccionado(dia)} className={`flex flex-col items-center justify-center min-w-[52px] h-[60px] rounded-xl border transition-all ${diaSeleccionado?.id === dia.id ? "bg-[#24B6C1] text-white border-[#24B6C1] shadow-md scale-105" : "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100"}`}>
                    <span className="text-[9px] font-bold uppercase opacity-80">{dia.nombre}</span>
                    <span className="text-base font-black mt-0.5">{dia.numero}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <button 
                  onClick={() => setBloqueHorario("manana")} 
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    bloqueHorario === "manana" 
                    ? "border-[#24B6C1] bg-[#24B6C1]/5 ring-1 ring-[#24B6C1]" 
                    : "border-gray-100 bg-gray-50/50 hover:bg-gray-50"
                  }`}
                >
                   <div className="flex items-center gap-3">
                      <FaSun className={bloqueHorario === "manana" ? "text-[#24B6C1]" : "text-gray-400"} size={16} />
                      <span className={`text-sm font-bold ${bloqueHorario === "manana" ? "text-gray-900" : "text-gray-600"}`}>Mañana</span>
                   </div>
                   <span className="text-[11px] text-gray-400 font-medium tracking-tight">09:30 a 12:30 hrs</span>
                </button>

                <button 
                  onClick={() => setBloqueHorario("tarde")} 
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    bloqueHorario === "tarde" 
                    ? "border-[#24B6C1] bg-[#24B6C1]/5 ring-1 ring-[#24B6C1]" 
                    : "border-gray-100 bg-gray-50/50 hover:bg-gray-50"
                  }`}
                >
                   <div className="flex items-center gap-3">
                      <FaMoon className={bloqueHorario === "tarde" ? "text-[#24B6C1]" : "text-gray-400"} size={16} />
                      <span className={`text-sm font-bold ${bloqueHorario === "tarde" ? "text-gray-900" : "text-gray-600"}`}>Tarde</span>
                   </div>
                   <span className="text-[11px] text-gray-400 font-medium tracking-tight">15:00 a 17:30 hrs</span>
                </button>
              </div>

              <button 
                onClick={() => {
                  if (!diaSeleccionado || !bloqueHorario) {
                    showToast("Por favor, selecciona un día y un bloque horario.", "error");
                    return;
                  }
                  
                  const rango = bloqueHorario === "manana" ? "09:30 a 12:30 hrs" : "15:00 a 17:30 hrs";
                  
                  setVisitaAgendada({ 
                    fechaFormateada: diaSeleccionado.fechaCompleta, 
                    hora: rango, 
                    fechaId: diaSeleccionado.id 
                  });
                  showToast(`¡Bloque ${bloqueHorario === "manana" ? "Mañana" : "Tarde"} cargado correctamente! , Ahora completa los datos del formulario para finalizar`, "success");
                }}
                className="w-full py-4 bg-[#24B6C1] hover:bg-[#1da0ab] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-[0.98]"
              >
                + Agregar Agendamiento
              </button>
            </div>

            <ContactForm 
              propiedadId={String(property.codigo)}
              comunaId={property.ubicacion?.comuna_id || 0}
              objetivoLlamada={property.precios?.venta?.valor ? 1 : 2}
              tipoPropiedadNombre={property.titulo || ""}
              onSubmitSuccess={handleContactSubmit}
            />
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4">
          <button onClick={() => setIsLightboxOpen(false)} className="absolute right-4 top-4 text-white/70 hover:text-white p-2.5 bg-white/10 rounded-full z-20 backdrop-blur-md transition-all">
            <FaTimes size={20} />
          </button>

          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            <motion.div
              key={activeImage}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(e, { offset }) => {
                const swipeThreshold = 50;
                if (offset.x < -swipeThreshold) nextImage();
                else if (offset.x > swipeThreshold) prevImage();
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <img 
                src={imagenes[activeImage]} 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl select-none" 
                draggable="false"
                alt={`Slide ${activeImage + 1}`}
              />
            </motion.div>

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
              <button onClick={prevImage} className="pointer-events-auto p-3 bg-black/40 hover:bg-[#24B6C1] rounded-full text-white transition-colors hidden md:block">
                <FaChevronLeft size={24} />
              </button>
              <button onClick={nextImage} className="pointer-events-auto p-3 bg-black/40 hover:bg-[#24B6C1] rounded-full text-white transition-colors hidden md:block">
                <FaChevronRight size={24} />
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-white/60 text-xs font-bold tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
            {activeImage + 1} / {imagenes.length}
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertyDetail;