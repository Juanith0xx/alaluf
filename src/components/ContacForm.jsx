import React, { useState, useEffect } from 'react';
import fondoMarmol from '../assets/Marmol.jpg';

const ContactForm = ({ 
  className = "", 
  propiedadId = "0",         
  comunaId = 0,              
  objetivoLlamada = 2,       // 1 = Venta (Comprar), 2 = Arriendo
  tipoPropiedadNombre = "",  
  onSubmitSuccess 
}) => {

  const mapearTipoPropiedad = (tipo) => {
    if (!tipo) return "1"; 
    const t = tipo.toLowerCase();
    
    if ((t.includes("casa") && !t.includes("comercial")) || t.includes("departamento")) return "1";
    if (t.includes("oficina")) return "3";
    if (t.includes("local") || t.includes("comercial") || t.includes("hotel")) return "4";
    if (t.includes("galpon") || t.includes("bodega") || t.includes("industrial") && !t.includes("terreno")) return "7";
    if (t.includes("terreno")) return "6";
    
    return "1"; 
  };

  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    email: "",
    telefono: "",
    mensaje: "",
    id_tipo_propiedad: mapearTipoPropiedad(tipoPropiedadNombre) 
  });
  
  const [objetivoActivo, setObjetivoActivo] = useState(objetivoLlamada);
  const [rutError, setRutError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const esFichaPropiedad = propiedadId !== "0" && propiedadId !== 0 && propiedadId !== "";

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      id_tipo_propiedad: mapearTipoPropiedad(tipoPropiedadNombre)
    }));
    setObjetivoActivo(objetivoLlamada);
  }, [tipoPropiedadNombre, objetivoLlamada]);

  const validarRutChileno = (rutCompleto) => {
    const rutLimpio = rutCompleto.replace(/[^0-9kK]/g, "").toUpperCase();
    if (rutLimpio.length < 2) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvFinal = "";
    if (dvEsperado === 11) dvFinal = "0";
    else if (dvEsperado === 10) dvFinal = "K";
    else dvFinal = dvEsperado.toString();

    return dvFinal === dv;
  };

  const handleRutChange = (e) => {
    let value = e.target.value.replace(/[^0-9kK]/g, ""); 
    if (value.length > 9) return;

    if (value.length > 1) {
      const dv = value.slice(-1);
      const cuerpo = value.slice(0, -1);
      const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      value = `${cuerpoFormateado}-${dv}`;
    }

    setFormData({ ...formData, rut: value });

    const caracteresLimpios = value.replace(/[^0-9kK]/g, "");
    if (caracteresLimpios.length >= 8) {
      setRutError(validarRutChileno(value) ? "" : "El RUT ingresado no es válido.");
    } else {
      setRutError(""); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarRutChileno(formData.rut)) {
      setRutError("Por favor, ingresa un RUT válido antes de continuar.");
      return;
    }

    if (!formData.email && !formData.telefono) {
      alert("Debes ingresar al menos un correo electrónico o un teléfono.");
      return;
    }

    setIsSubmitting(true);

    try {
      const rutSanitizado = formData.rut.replace(/\./g, "");
      const payload = {
        razon_social: formData.nombre,
        rut: rutSanitizado,
        email: formData.email,
        fono: formData.telefono,
        requerimiento: formData.mensaje || (esFichaPropiedad ? "Consulta por propiedad específica" : "Contacto desde Página Web"),
        id_prop_pw: String(propiedadId),
        fk_comuna: Number(comunaId),
        id_tipo_propiedad: Number(formData.id_tipo_propiedad),
        id_objetivo_llamada: Number(objetivoActivo),
        agendamiento: false
      };

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_URL}/api/indicadores/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        alert("¡Solicitud enviada con éxito! Un asesor se contactará contigo.");
        setFormData({ 
          nombre: "", rut: "", email: "", telefono: "", mensaje: "", 
          id_tipo_propiedad: mapearTipoPropiedad(tipoPropiedadNombre) 
        });
        if (onSubmitSuccess) onSubmitSuccess(formData);
      } else {
        alert(`Hubo un problema al procesar el envío: ${result.message}`);
      }
    } catch (error) {
      console.error("Error enviando el formulario:", error);
      alert("Error de conexión. Por favor, vuelve a intentarlo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🌟 GUARDAMOS LA CAJA DEL FORMULARIO EN UNA CONSTANTE
  // Si no es ficha de propiedad, le añadimos "max-w-3xl mx-auto" para que no se estire.
  const formularioContenido = (
    <div className={`bg-white text-gray-800 rounded-[24px] md:rounded-[40px] p-5 sm:p-8 md:p-10 shadow-xl border border-gray-100 w-full ${!esFichaPropiedad ? 'max-w-3xl mx-auto' : ''} ${className}`}>
      
      <div className="mb-6 md:mb-8 text-center md:text-start">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 md:mb-3 font-[Outfit] text-[#1A1A1A] tracking-tight">
          {esFichaPropiedad ? "Me interesa esta propiedad" : "Lo primero es entenderte."}
        </h2>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg font-normal font-[Outfit] leading-relaxed">
          {esFichaPropiedad 
            ? "Déjanos tus datos y un asesor te contactará para entregarte más información." 
            : "Completa este formulario y te ayudaremos a encontrar tu próxima inversión."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 font-[Outfit]">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 ml-1">Nombre completo *</label>
            <input 
              type="text" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              placeholder="Ej. Juan Pérez" 
              className="w-full bg-gray-50/50 border border-gray-200 text-gray-800 text-base sm:text-sm px-4 py-3 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0091A4]/30 focus:border-[#0091A4] transition-all duration-200 placeholder-gray-400" 
              required 
            />
          </div>

          <div className="space-y-1.5 relative">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 ml-1">Rut *</label>
            <input 
              type="text" 
              value={formData.rut} 
              onChange={handleRutChange} 
              placeholder="12.345.678-K" 
              className={`w-full bg-gray-50/50 border text-gray-800 text-base sm:text-sm px-4 py-3 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 placeholder-gray-400 ${rutError ? "border-red-500 focus:ring-red-500/30" : "border-gray-200 focus:ring-[#0091A4]/30 focus:border-[#0091A4]"}`} 
              required 
            />
            {rutError && <p className="text-red-500 text-xs font-medium mt-1 ml-1 absolute -bottom-5">{rutError}</p>}
          </div>

          <div className="space-y-1.5 mt-2 md:mt-0">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 ml-1">Correo electrónico *</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="tu@email.com" 
              className="w-full bg-gray-50/50 border border-gray-200 text-gray-800 text-base sm:text-sm px-4 py-3 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0091A4]/30 focus:border-[#0091A4] transition-all duration-200 placeholder-gray-400" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 ml-1">Teléfono</label>
            <input 
              type="text" 
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
              placeholder="+56 9 1234 5678" 
              className="w-full bg-gray-50/50 border border-gray-200 text-gray-800 text-base sm:text-sm px-4 py-3 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0091A4]/30 focus:border-[#0091A4] transition-all duration-200 placeholder-gray-400" 
            />
          </div>

          <div className="md:col-span-2 space-y-1.5 md:mt-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 ml-1">¿Qué estás buscando?</label>
            <select 
              name="id_tipo_propiedad" 
              value={formData.id_tipo_propiedad} 
              onChange={handleChange} 
              disabled={esFichaPropiedad} 
              className={`w-full border text-base sm:text-sm px-4 py-3 md:py-2.5 rounded-xl focus:outline-none transition-all duration-200 ${esFichaPropiedad ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed opacity-80' : 'bg-gray-50/50 border-gray-200 text-gray-800 cursor-pointer focus:ring-2 focus:ring-[#0091A4]/30 focus:border-[#0091A4]'}`}
            >
              <option value="1">Residencial</option>
              <option value="3">Oficina</option>
              <option value="4">Retail</option>
              <option value="7">Industrial</option>
              <option value="6">Terreno para Proyecto</option>
              <option value="8">Administración de Arriendos</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-1.5 md:mt-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 ml-1">Hablemos de lo que necesitas</label>
            <textarea 
              name="mensaje" 
              value={formData.mensaje} 
              onChange={handleChange} 
              rows="4" 
              placeholder={esFichaPropiedad ? "Quiero agendar una visita..." : "Cuéntanos qué tienes en mente..."} 
              className="w-full bg-gray-50/50 border border-gray-200 text-gray-800 text-base sm:text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0091A4]/30 focus:border-[#0091A4] transition-all duration-200 placeholder-gray-400 resize-none" 
            />
          </div>
        </div>

        <div className="pt-4 sm:pt-6">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={`w-full md:w-auto md:min-w-[240px] text-white px-8 py-3.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mx-auto active:scale-95 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#0091A4] hover:bg-[#007A8A] shadow-md shadow-[#0091A4]/20 hover:shadow-lg hover:shadow-[#0091A4]/30 hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? "Enviando..." : "Continuar"}
          </button>
        </div>

      </form>
    </div>
  );

  // 🌟 RENDERIZADO CONDICIONAL
  // Si estamos en la ficha de la propiedad, devolvemos SOLO la caja blanca (ancho 100%).
  if (esFichaPropiedad) {
    return formularioContenido;
  }

  // Si estamos en la página de Contacto, devolvemos la caja envuelta en la pantalla completa de mármol.
  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-8 md:pb-12 px-4 sm:px-6"
      style={{ 
        backgroundImage: `url(${fondoMarmol})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {formularioContenido}
    </div>
  );
};

export default ContactForm;