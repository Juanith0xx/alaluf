import React, { useState, lazy, Suspense } from "react";
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

// 🌟 LAZY LOADING: MapView (incluye mapbox-gl, ~1.78MB) ahora se descarga
// solo cuando esta sección entra en pantalla, no en la carga inicial del sitio.
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
  const [bloqueHorario, setBloqueHorario] = useState(null); 
  const [horaSeleccionada, setHoraSeleccionada] = useState(null); 

  // ESTADOS PARA EL FLUJO DE AGENDA ADJUNTO AL FORMULARIO
  const [visitaAgendada, setVisitaAgendada] = useState(null);
  const [enviandoLead, setEnviandoLead] = useState(false);

  if (!property) return null;
  console.log("PROPERTY DETAIL:", property);

  const imagenes = property.imagenes || [];
  const precioPrincipal = property.precios?.venta?.valor || property.precios?.arriendo?.valor;
  const moneda = property.precios?.venta?.moneda || property.precios?.arriendo?.moneda;

  const tipo = (
    property.desc_tipo ||
    property.tipoPropiedad ||
    property.tipo ||
    property.categoria ||
    property.titulo ||
    ""
  ).toLowerCase();

  // DEFINICIÓN DE RANGOS HORARIOS DISPONIBLES (Intervalos de 30 minutos)
  const rangoManana = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
  const rangoTarde = ["14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

  // FUNCIÓN PARA AÑADIR SEPARADOR DE MILES EN FORMATO CHILENO
  const formatearPrecio = (valor) => {
    if (!valor) return "";
    const numero = parseFloat(valor);
    if (isNaN(numero)) return valor;
    return numero.toLocaleString("es-CL");
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

  if (
    campo?.value === null ||
    campo?.value === undefined ||
    campo?.value === ""
  ) {
    return "Sin información";
  }

  return campo.value;
};

  // 🌟 GESTOR DE ENVÍO DE FORMULARIO DE CONTACTO Y VISITA (Estructura Alaluf CRM)
  const handleContactSubmit = async (formData) => {
    console.log("Contacto para propiedad:", property.codigo, formData);
    
    // Mapeo y saneamiento de campos para el CRM de Alaluf
    const nombreContacto = formData?.nombre || formData?.razon_social || "";
    const email = formData?.email || formData?.correo || "";
    const fono = formData?.fono || formData?.telefono || "";
    const requerimiento = formData?.requerimiento || formData?.mensaje || "";

    if (!nombreContacto.trim()) {
      alert("Por favor, completa tu Nombre Completo en el formulario de contacto.");
      return;
    }

    if (!email.trim() && !fono.trim()) {
      alert("Por favor, ingresa al menos un Correo Electrónico o un Teléfono de contacto.");
      return;
    }

    // 🌟 ADJUNTA EL TEXTO DE LA VISITA AL REQUERIMIENTO / MENSAJE
    let requerimientoFinal = requerimiento.trim();
    if (visitaAgendada) {
      const detalleVisita = `--- ASUNTO: Solicitud de Visita Agendada ---\nDía: ${visitaAgendada.fechaFormateada}\nHora: ${visitaAgendada.hora} hrs.`;
      requerimientoFinal = requerimientoFinal 
        ? `${requerimientoFinal}\n\n${detalleVisita}` 
        : detalleVisita;
    }

    setEnviandoLead(true);

    try {
      const leadData = {
        razon_social: nombreContacto.trim(),
        rut: formData?.rut || "12345678-9", 
        email: email.trim(),
        fono: fono.trim(),
        requerimiento: requerimientoFinal, // 🌟 Usamos el requerimiento enriquecido con el agendamiento
        id_objetivo_llamada: property.precios?.venta?.valor ? 1 : 2, // 1 = Venta, 2 = Arriendo
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      });

      if (response.ok) {
        alert("¡Solicitud y agendamiento enviados con éxito! Un asesor se pondrá en contacto contigo a la brevedad.");
        
        // Resetear controles, campos y agendamiento tras éxito
        setDiaSeleccionado(diasDisponibles[0] || null);
        setBloqueHorario(null);
        setHoraSeleccionada(null);
        setVisitaAgendada(null);
      } else {
        alert("Hubo un error al registrar tu solicitud en el servidor.");
      }
    } catch (error) {
      console.error("Error enviando lead:", error);
      alert("Error de red. Revisa tu conexión con el servidor e inténtalo más tarde.");
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

      if (fecha.getDay() === 0) continue; 

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

const getExtraValue = (texto) => {
  const campo = property.detalles?.caracteristicasExtra?.find(
    c => c.label?.toLowerCase().includes(texto.toLowerCase())
  );

  if (
    campo?.value === null ||
    campo?.value === undefined ||
    campo?.value === ""
  ) {
    return "Sin información";
  }

  return campo.value;
};

const Feature = ({ icon: Icon, title, value }) => (
  <div className="space-y-1">
    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest block">
      {title}
    </span>

    <div className="flex items-center gap-2 font-bold text-lg italic">
      <Icon className="text-[#24B6C1]" />
      {value}
    </div>
  </div>
);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed font-[Outfit] pb-20 text-gray-900"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN CONTENEDORA GLOBAL CON FILAS ADAPTATIVAS */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-24 sm:pt-28 lg:pt-32 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        
        {/* COLUMNA IZQUIERDA: CONTENIDO PRINCIPAL */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          
          {/* 1. GALERÍA ASIMÉTRICA DE FOTOS RESPONSIVA */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl bg-black/5 h-64 sm:h-80 md:h-[400px] lg:h-[480px]">
            {/* Foto Grande Principal */}
            <div 
              className="col-span-1 md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer h-full"
              onClick={() => openLightbox(0)}
            >
              <img src={imagenes[0] || "/placeholder.jpg"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Vista principal" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-300" />
            </div>

            {/* Fotos Secundarias Cuadrícula Derecha */}
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="hidden md:block md:col-span-1 relative overflow-hidden group cursor-pointer h-full" onClick={() => openLightbox(idx)}>
                <img src={imagenes[idx] || imagenes[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={`Vista interior ${idx}`} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-300" />
              </div>
            ))}

            {/* Foto 5 (Último cuadrante con botón) */}
            <div 
              className="hidden md:block md:col-span-1 relative overflow-hidden group cursor-pointer h-full"
              onClick={() => openLightbox(4)}
            >
              <img src={imagenes[4] || imagenes[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Vista complementaria" />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-end justify-end p-4">
                <span className="bg-white hover:bg-[#24B6C1] hover:text-white text-[#24B6C1] px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-[#24B6C1]/20 transition-all duration-300 transform group-hover:scale-105">
                  Ver más fotos
                </span>
              </div>
            </div>
          </section>

          {/* 2. BARRA DE CONTROL INTEGRADA RESPONSIVA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/30 px-4 md:px-6 py-4 rounded-[20px] md:rounded-[24px] backdrop-blur-md border border-white/10 text-white shadow-lg">
            {/* Lado Izquierdo: Volver y Código */}
            <div className="flex flex-row items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-[#24B6C1] transition font-semibold bg-white/10 px-4 py-2 rounded-full border border-white/5 text-xs md:text-sm">
                <FaArrowLeft size={12} /> Volver al listado
              </button>
              <span className="text-white/20 hidden sm:inline">|</span>
              <div className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase opacity-90 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                Código Alaluf: {property.codigo}
              </div>
            </div>

            {/* Lado Derecho: Redes Sociales */}
            <div className="flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto border-t border-white/10 sm:border-0 pt-3 sm:pt-0">
              <span className="text-[11px] uppercase font-bold tracking-wider text-gray-300 mr-1 hidden md:inline">Compartir:</span>
              <a href={`https://api.whatsapp.com/send?text=Mira%20esta%20propiedad%20en%20Alaluf:%20${currentUrl}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/10 hover:bg-[#25D366] rounded-full transition-colors text-white">
                <FaWhatsapp size={13} />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/10 hover:bg-[#1877F2] rounded-full transition-colors text-white">
                <FaFacebookF size={13} />
              </a>
              <a href={`mailto:?subject=Propiedad%20Alaluf%20-%20${property.titulo}&body=Mira%20esta%20oportunidad%20en%20Alaluf:%20${currentUrl}`} className="p-2.5 bg-white/10 hover:bg-[#24B6C1] rounded-full transition-colors text-white">
                <FaEnvelope size={13} />
              </a>
              <button onClick={copiarEnlace} className="p-2.5 bg-white/10 hover:bg-[#E1306C] rounded-full transition-colors text-white">
                <FaInstagram size={13} />
              </button>
              <button onClick={copiarEnlace} className="p-2.5 bg-white/10 hover:bg-black rounded-full transition-colors text-white border border-white/5">
                <FaTiktok size={13} />
              </button>
            </div>
          </div>

          {/* 3. BLOQUE BLANCO DE DETALLES INMUEBLE */}
          <div className="bg-white/95 backdrop-blur-sm rounded-[24px] md:rounded-[40px] p-5 md:p-8 lg:p-10 shadow-xl border border-gray-100 space-y-8 md:space-y-10">
            
            {/* Info Principal */}
            <section className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#24B6C1] text-white px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                  {property.titulo}
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                  {property.operacion}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight md:leading-none">
                {property.ubicacion?.sector || "Ubicación Privilegiada"}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm md:text-lg">
                <FaMapMarkerAlt className="text-[#24B6C1] shrink-0" />
                <span className="line-clamp-2">{property.ubicacion?.direccion}, {property.ubicacion?.comuna}</span>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span className="text-3xl md:text-5xl font-black text-[#24B6C1]">
                  {formatearPrecio(precioPrincipal)} {moneda}
                </span>
                <span className="text-gray-400 text-xs md:text-sm font-medium">Gastos comunes: {getExtra("Gastos Comunes")}</span>
              </div>
            </section>

            {/* Características Técnicas (Grid fluido) */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 md:py-8 border-y border-gray-100">

              {/* CASAS */}
              {tipo.includes("casa") && !tipo.includes("comercial") && (
                <>
                  <Feature
                    icon={FaRulerCombined}
                    title="Construidos"
                    value={`${getExtraValue("construidos") || getCampo("terreno")|| 0} m²`}
                  />

                  <Feature
                    icon={FaRulerCombined}
                    title="Terreno"
                    value={`${getExtraValue("terreno") || property.detalles?.superficie || 0} m²`}
                  />

                  <Feature
                    icon={FaBed}
                    title="Dormitorios"
                    value={`${property.detalles?.dormitorios || 0}`}
                  />

                  <Feature
                    icon={FaBath}
                    title="Baños"
                    value={`${property.detalles?.banos || 0}`}
                  />
                </>
              )}

              {/* DEPARTAMENTOS */}
              {tipo.includes("departamento") && (
                <>
                  <Feature
                    icon={FaRulerCombined}
                    title="Superficie Total"
                    value={`${getExtraValue("totales") || 0} m²`}
                  />

                  <Feature
                    icon={FaRulerCombined}
                    title="Superficie Útil"
                    value={`${getExtraValue("útiles") || 0} m²`}
                  />

                  <Feature
                    icon={FaBed}
                    title="Dormitorios"
                    value={`${property.detalles?.dormitorios || 0}`}
                  />

                  <Feature
                    icon={FaBath}
                    title="Baños"
                    value={`${property.detalles?.banos || 0}`}
                  />
                </>
              )}

              {/* OFICINAS */}
              {tipo.includes("oficina") && (
                <>
                  <Feature
                    icon={FaRulerCombined}
                    title="Superficie"
                    value={`${getExtraValue("construidos") || property.detalles?.superficie || 0} m²`}
                  />

                  <Feature
                    icon={FaCheckCircle}
                    title="Habilitada"
                    value={getExtraValue("habilitada") || "No"}
                  />

                  <Feature
                    icon={FaBuilding}
                    title="Tipo Edificio"
                    value={getExtraValue("tipo edificio") || "-"}
                  />

                  <Feature
                    icon={FaDoorClosed}
                    title="Privados"
                    value={getExtraValue("privados") || "0"}
                  />
                </>
              )}

              {/* LOCALES */}
              {tipo.includes("local") && (
                <>
                  <Feature
                    icon={FaRulerCombined}
                    title="Superficie"
                    value={`${property.detalles?.superficie || 0} m²`}
                  />

                  <Feature
                    icon={FaCheckCircle}
                    title="Habilitado"
                    value={getExtraValue("habilitado") || "No"}
                  />

                  <Feature
                    icon={FaBath}
                    title="Baños"
                    value={`${property.detalles?.banos || 0}`}
                  />

                  <Feature
                    icon={FaCar}
                    title="Estacionamientos"
                    value={`${property.detalles?.estacionamientos || 0}`}
                  />
                </>
              )}

              {/* GALPONES */}
              {(tipo.includes("galpon") || tipo.includes("galpón")) && (
                <>
                  <Feature
                    icon={FaRulerCombined}
                    title="Construidos"
                    value={`${getExtraValue("construidos") || 0} m²`}
                  />

                  <Feature
                    icon={FaRulerCombined}
                    title="Terreno"
                    value={`${getExtraValue("terreno") || 0} m²`}
                  />

                  <Feature
                    icon={FaCheckCircle}
                    title="Trifásica"
                    value={getExtraValue("trifasica") || "No"}
                  />

                  <Feature
                    icon={FaRulerCombined}
                    title="Altura"
                    value={getExtraValue("altura") || "-"}
                  />
                </>
              )}

              {/* TERRENOS INDUSTRIALES */}
              {tipo.includes("industrial") && (
                <>
                  <Feature
                    icon={FaRulerCombined}
                    title="Superficie"
                    value={`${property.detalles?.superficie || 0} m²`}
                  />

                  <Feature
                    icon={FaRulerCombined}
                    title="Frente"
                    value={`${getExtraValue("frente") || 0} mts`}
                  />

                  <Feature
                    icon={FaRulerCombined}
                    title="Fondo"
                    value={`${getExtraValue("fondo") || 0} mts`}
                  />
                </>
              )}

              {/* TERRENOS */}
              {tipo.includes("terreno") && !tipo.includes("industrial") && (
                <>
                  <Feature
                    icon={FaRulerCombined}
                    title="Superficie"
                    value={`${getExtraValue("terreno")} m²`}
                  />

                  <Feature
                    icon={FaInfoCircle}
                    title="Uso"
                    value={getExtraValue("uso")}
                  />

                  <Feature
                    icon={FaInfoCircle}
                    title="Densidad"
                    value={getExtraValue("densidad")}
                  />

                  <Feature
                    icon={FaInfoCircle}
                    title="Altura"
                    value={getExtraValue("altura")}
                  />
                </>
              )}
            </section>

            {/* Descripción */}
            <section className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold uppercase italic tracking-tighter">Descripción de la propiedad</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-lg">
                {property.caracteristicas_internet || property.detalles?.descripcion || "Contáctanos para obtener más detalles."}
              </p>
            </section>

            {/* 5. ENTORNO Y MAPA */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
                <h3 className="text-xl md:text-2xl font-bold uppercase italic tracking-tighter">Conoce el entorno</h3>
                <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {["Transporte", "Servicios", "Educación"].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => handleFilterClick(tag)}
                      className={`px-3.5 py-1.5 border rounded-lg text-[9px] md:text-[10px] font-bold transition-all duration-300 shrink-0 ${
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
              
              <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] rounded-[24px] md:rounded-[30px] overflow-hidden border border-gray-100 shadow-lg">
                {/* 🌟 Suspense: muestra un fallback mientras se descarga el chunk de mapbox-gl */}
                <Suspense fallback={
                  <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#24B6C1] border-t-transparent rounded-full animate-spin"></div>
                      Cargando mapa...
                    </div>
                  </div>
                }>
                  <MapView 
                    propiedades={[property]} 
                    selectedProperty={property} 
                    activeFilter={activeFilter} 
                  />
                </Suspense>
              </div>
            </section>

          </div>
        </div>

        {/* COLUMNA DERECHA: SIDEBAR */}
        <div className="col-span-1 lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6 md:space-y-8">
            
            {/* WIDGET DE AGENDA */}
            <div className="bg-white/95 backdrop-blur-sm rounded-[24px] md:rounded-[40px] p-5 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold mb-1 text-gray-900">Agenda tu visita</h3>
              <p className="text-gray-400 text-xs mb-4 md:mb-6">Elige el día y rango horario que más te acomode.</p>
              
              {/* Selector de Días Horizontal */}
              <div className="space-y-2 mb-5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-[#24B6C1]" /> 1. Selecciona el día
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin snap-x">
                  {diasDisponibles.map((dia) => {
                    const isSelected = diaSeleccionado?.id === dia.id;
                    return (
                      <button
                        key={dia.id}
                        type="button"
                        onClick={() => {
                          setDiaSeleccionado(dia);
                          setBloqueHorario(null); 
                          setHoraSeleccionada(null);
                        }}
                        className={`flex flex-col items-center justify-center min-w-[52px] h-[60px] rounded-xl border transition-all snap-center ${
                          isSelected
                            ? "bg-[#24B6C1] text-white border-[#24B6C1] shadow-md scale-105"
                            : "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-[9px] font-bold tracking-tight opacity-80">{dia.nombre}</span>
                        <span className="text-base font-black tracking-tighter mt-0.5">{dia.numero}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector de Bloques Horarios */}
              <div className="space-y-4 mb-5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <FaClock className="text-[#24B6C1]" /> 2. Selecciona el horario
                </label>
                
                <div className="grid grid-cols-1 gap-3">
                  {/* Opción Bloque Mañana */}
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => { setBloqueHorario("manana"); setHoraSeleccionada(null); }}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                        bloqueHorario === "manana"
                          ? "border-[#24B6C1] bg-[#24B6C1]/5 shadow-sm"
                          : "border-gray-100 bg-gray-50/50 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${bloqueHorario === "manana" ? "bg-[#24B6C1] text-white" : "bg-gray-100 text-gray-500"}`}>
                          <FaSun size={13} />
                        </div>
                        <div>
                          <div className="text-xs md:text-sm font-bold text-gray-800">Bloque Mañana</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">09:00 a 13:00 hrs</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${bloqueHorario === "manana" ? "border-[#24B6C1]" : "border-gray-300"}`}>
                        {bloqueHorario === "manana" && <div className="w-1.5 h-1.5 bg-[#24B6C1] rounded-full" />}
                      </div>
                    </button>

                    {/* Horas para el Bloque Mañana */}
                    {bloqueHorario === "manana" && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100 animate-fadeIn">
                        {rangoManana.map((hora) => (
                          <button
                            key={hora}
                            type="button"
                            onClick={() => setHoraSeleccionada(hora)}
                            className={`py-1.5 text-[11px] font-bold rounded-lg text-center border transition-all ${
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
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                        bloqueHorario === "tarde"
                          ? "border-[#24B6C1] bg-[#24B6C1]/5 shadow-sm"
                          : "border-gray-100 bg-gray-50/50 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${bloqueHorario === "tarde" ? "bg-[#24B6C1] text-white" : "bg-gray-100 text-gray-500"}`}>
                          <FaMoon size={13} />
                        </div>
                        <div>
                          <div className="text-xs md:text-sm font-bold text-gray-800">Bloque Tarde</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">14:30 a 18:00 hrs</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${bloqueHorario === "tarde" ? "border-[#24B6C1]" : "border-gray-300"}`}>
                        {bloqueHorario === "tarde" && <div className="w-1.5 h-1.5 bg-[#24B6C1] rounded-full" />}
                      </div>
                    </button>

                    {/* Horas para el Bloque Tarde */}
                    {bloqueHorario === "tarde" && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100 animate-fadeIn">
                        {rangoTarde.map((hora) => (
                          <button
                            key={hora}
                            type="button"
                            onClick={() => setHoraSeleccionada(hora)}
                            className={`py-1.5 text-[11px] font-bold rounded-lg text-center border transition-all ${
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

              {/* COMPONENTE VISUAL DE AGENDAMIENTO ADJUNTO */}
              {visitaAgendada && (
                <div className="bg-[#24B6C1] border border-[#24B6C1]/30 p-4 rounded-2xl text-xs text-white space-y-2 mb-4 animate-fadeIn">
                  <span className="font-bold block">✓ Agendamiento cargado:</span>
                  <p>{visitaAgendada.fechaFormateada} a las {visitaAgendada.hora} hrs.</p>
                  <button 
                    type="button"
                    onClick={() => setVisitaAgendada(null)}
                    className="text-[10px] text-red-400 font-bold underline hover:text-red-300 block"
                  >
                    Quitar agendamiento
                  </button>
                </div>
              )}

              {/* Botón de Agregar Agendamiento */}
              <button 
                type="button"
                onClick={() => {
                  if (!diaSeleccionado || !bloqueHorario || !horaSeleccionada) {
                    alert("Por favor, selecciona un día, un bloque y la hora exacta de tu visita antes de agregarla.");
                    return;
                  }
                  setVisitaAgendada({
                    fechaId: diaSeleccionado.id,
                    fechaFormateada: diaSeleccionado.fechaCompleta,
                    hora: horaSeleccionada
                  });
                  alert(`¡Visita agregada correctamente al formulario!\nAhora completa tus datos de contacto abajo para finalizar.`);
                }}
                className="w-full py-3.5 bg-[#24B6C1] hover:bg-[#1da0ab] text-white rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-[#24B6C1]/20 active:scale-[0.98] transition-all duration-300 mb-4"
              >
                ➕ Agregar Agendamiento
              </button>

            </div>

            {/* Formulario de Contacto Modular */}
            <ContactForm 
              className="..."
              propiedadId={String(property.codigo)}
              comunaId={property.ubicacion?.comuna_id || 0}
              objetivoLlamada={property.precios?.venta?.valor ? 1 : 2}
              tipoPropiedadNombre={property.titulo || ""}
              onSubmitSuccess={handleContactSubmit}
            />
          </div>
        </div>

      </div>

      {/* MODAL LIGHTBOX FULL-SCREEN */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 shadow-xl">
          <button 
            onClick={() => setIsLightboxOpen(false)} 
            className="absolute right-4 top-4 text-white/70 hover:text-white p-2.5 bg-white/10 rounded-full transition backdrop-blur-md z-20"
          >
            <FaTimes size={20} />
          </button>

          <div className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center px-2">
            <img 
              src={imagenes[activeImage]} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg select-none shadow-2xl" 
              alt={`Zoom imagen ${activeImage + 1}`} 
            />

            {imagenes.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute left-4 md:-left-20 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/40 hover:bg-black/60 rounded-full transition group z-10"
                >
                  <FaChevronLeft size={20} className="md:size-[26px] group-hover:scale-110 transition-transform"/>
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute right-4 md:-right-20 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/40 hover:bg-black/60 rounded-full transition group z-10"
                >
                  <FaChevronRight size={20} className="md:size-[26px] group-hover:scale-110 transition-transform"/>
                </button>
              </>
            )}
          </div>
          
          <div className="text-white/60 mt-4 text-xs font-bold tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
            {activeImage + 1} / {imagenes.length}
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertyDetail;