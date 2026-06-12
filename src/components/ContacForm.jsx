import React, { useState, useEffect } from 'react';

const ContactForm = ({ 
  className = "", 
  propiedadId = "0",         
  comunaId = 0,              
  objetivoLlamada = 2,       // 1 = Venta (Comprar), 2 = Arriendo
  tipoPropiedadNombre = "",  
  onSubmitSuccess 
}) => {

  console.log("PROPS RECIBIDAS EN EL FORMULARIO:", { propiedadId, objetivoLlamada, tipoPropiedadNombre });

  // 🌟 FUNCIÓN DE MAPEO AUTOMÁTICO DE TIPO DE PROPIEDAD
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

  // 🌟 ESTADOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    email: "",
    telefono: "",
    mensaje: "",
    id_tipo_propiedad: mapearTipoPropiedad(tipoPropiedadNombre) 
  });
  
  // 🌟 NUEVO ESTADO: Controla visual y lógicamente si es Venta o Arriendo
  const [objetivoActivo, setObjetivoActivo] = useState(objetivoLlamada);

  const [rutError, setRutError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const esFichaPropiedad = propiedadId !== "0" && propiedadId !== 0 && propiedadId !== "";

  // Sincroniza los estados si la propiedad cambia en la vista padre
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      id_tipo_propiedad: mapearTipoPropiedad(tipoPropiedadNombre)
    }));
    setObjetivoActivo(objetivoLlamada);
  }, [tipoPropiedadNombre, objetivoLlamada]);

  // VALIDACIÓN DE RUT
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

  // ENVÍO AL BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarRutChileno(formData.rut)) {
      setRutError("Por favor, ingresa un RUT real antes de continuar.");
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

        // 🌟 Usamos el estado del botón seleccionado (1 = Venta, 2 = Arriendo)
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
        if (onSubmitSuccess) onSubmitSuccess();
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

  return (
    <div className={`bg-white text-gray-800 rounded-[40px] p-12 shadow-2xl ${className}`}>
      
      <h2 className="text-2xl md:text-3xl font-medium mb-2 text-start font-[Outfit] text-gray-900">
        {esFichaPropiedad ? "Me interesa esta propiedad" : "¿No encuentras lo que buscas?"}
      </h2>
      <p className="text-gray-500 text-sm md:text-base font-medium mb-8 text-start font-[Outfit] leading-relaxed">
        {esFichaPropiedad 
          ? "Déjanos tus datos y un asesor especializado te contactará para entregarte más información." 
          : "Completa este formulario y te ayudaremos a encontrar tu próxima inversión."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 font-[Outfit]">
        
        {/* 🌟 BOTONES DE SELECCIÓN DE OPERACIÓN (COMPRAR / ARRENDAR) */}
        <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200 mb-2">
          <button
            type="button"
            onClick={() => setObjetivoActivo(1)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
              objetivoActivo === 1 || objetivoActivo === "1"
                ? "bg-white text-[#0091A4] shadow-md"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            }`}
          >
            Comprar (Venta)
          </button>
          <button
            type="button"
            onClick={() => setObjetivoActivo(2)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
              objetivoActivo === 2 || objetivoActivo === "2"
                ? "bg-white text-[#0091A4] shadow-md"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            }`}
          >
            Arrendar
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Nombre completo *</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" className="w-full bg-white border border-gray-200 px-6 py-2 focus:ring-[#24B6C1] mt-2 rounded-md" required />
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-gray-700">Rut *</label>
            <input type="text" value={formData.rut} onChange={handleRutChange} placeholder="12.345.678-K" className={`w-full bg-white border px-6 py-2 mt-2 rounded-md ${rutError ? "border-red-500" : "border-gray-200"}`} required />
            {rutError && <p className="text-red-500 text-xs font-semibold mt-1 pl-2 absolute">{rutError}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Correo electrónico *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" className="w-full bg-white border border-gray-200 px-6 py-2 focus:ring-[#24B6C1] mt-2 rounded-md" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Teléfono</label>
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="+56 9 1234 5678" className="w-full bg-white border border-gray-200 px-6 py-2 focus:ring-[#24B6C1] mt-2 rounded-md" />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-gray-700">Tipo de Propiedad de Interés</label>
            <select 
              name="id_tipo_propiedad" 
              value={formData.id_tipo_propiedad} 
              onChange={handleChange} 
              disabled={esFichaPropiedad} 
              className={`w-full bg-white border border-gray-200 px-5 py-2.5 text-gray-700 focus:ring-[#24B6C1] mt-2 rounded-md ${esFichaPropiedad ? 'bg-gray-100 cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
            >
              <option value="1">Residencial</option>
              <option value="3">Oficina</option>
              <option value="4">Retail</option>
              <option value="7">Industrial</option>
              <option value="6">Terreno para Proyecto</option>
              <option value="8">Administración de Arriendos</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-gray-700">Hablemos de lo que necesitas.</label>
            <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} rows="5" placeholder={esFichaPropiedad ? "Quiero agendar una visita o recibir más detalles..." : "Cuéntanos qué tienes en mente..."} className="w-full bg-white border border-gray-200 px-4 py-4 focus:ring-[#24B6C1] mt-2 rounded-md resize-none" />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className={`group ${isSubmitting ? 'bg-gray-400' : 'bg-[#158F9B] hover:bg-[#127C86]'} text-white px-20 py-2.5 rounded-lg text-xl font-light transition-all duration-300 flex items-center justify-center gap-2 mx-auto active:scale-95`}>
          {isSubmitting ? "Enviando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;