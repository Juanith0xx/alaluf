import React, { useState } from 'react';

const ContactForm = ({ className = "", onSubmitSuccess }) => {
  // 1. ESTADOS PARA TODOS LOS CAMPOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const [rutError, setRutError] = useState("");

  // 2. ALGORITMO MÓDULO 11 (VALIDACIÓN DE RUT REAL)
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

  // 3. CONTROLADOR Y FORMATEADOR DEL RUT
  const handleRutChange = (e) => {
    let value = e.target.value.replace(/[^0-9kK]/g, ""); // Solo permite números y K
    if (value.length > 9) return;

    if (value.length > 1) {
      const dv = value.slice(-1);
      const cuerpo = value.slice(0, -1);
      const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      value = `${cuerpoFormateado}-${dv}`;
    }

    setFormData({ ...formData, rut: value });

    // Validar en tiempo real si el RUT ya tiene el largo mínimo esperado
    const caracteresLimpios = value.replace(/[^0-9kK]/g, "");
    if (caracteresLimpios.length >= 8) {
      if (validarRutChileno(value)) {
        setRutError(""); 
      } else {
        setRutError("El RUT ingresado no es válido.");
      }
    } else {
      setRutError(""); 
    }
  };

  // 4. MANEJO DE CAMBIOS GENERALES
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 5. ENVÍO DEL FORMULARIO
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarRutChileno(formData.rut)) {
      setRutError("Por favor, ingresa un RUT real antes de continuar.");
      return;
    }

    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    } else {
      console.log("Datos enviados:", formData);
      alert("Formulario enviado con éxito.");
    }
  };

  return (
    <div className={`bg-white text-gray-800 rounded-[80px] p-12 shadow-2xl ${className}`}>
      
      {/* 🌟 NUEVO TEXTO DE INICIO INCORPORADO */}
      <h2 className="text-2xl md:text-3xl font-medium mb-2 text-start font-[Outfit] text-gray-900">
        ¿No encuentras lo que buscas?
      </h2>
      <p className="text-gray-500 text-sm md:text-base font-medium mb-10 text-start font-[Outfit] leading-relaxed">
        Completa este formulario y te ayudaremos a encontrar tu próxima inversión.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 font-[Outfit]">
        <div className="grid md:grid-cols-2 gap-4">
          
          {/* Nombre completo */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Nombre completo *</label>
            <input 
              type="text" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre" 
              className="w-full bg-white border border-gray-200 px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2 rounded-md" 
              required 
            />
          </div>

          {/* Rut */}
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-gray-700">Rut *</label>
            <input
              type="text"
              value={formData.rut}
              onChange={handleRutChange}
              placeholder="12.345.678-K"
              className={`w-full bg-white border px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 mt-2 rounded-md transition-colors ${
                rutError 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-200 focus:ring-[#24B6C1]"
              }`}
              required
            />
            {rutError && (
              <p className="text-red-500 text-xs font-semibold mt-1 pl-2 absolute">
                {rutError}
              </p>
            )}
          </div>

          {/* Correo electrónico */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Correo electrónico *</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com" 
              className="w-full bg-white border border-gray-200 px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2 rounded-md" 
              required 
            />
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Teléfono</label>
            <input 
              type="text" 
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+56 9 1234 5678" 
              className="w-full bg-white border border-gray-200 px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2 rounded-md" 
            />
          </div>

          {/* Textarea */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-gray-700">Hablemos de lo que necesitas.</label>
            <textarea 
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows="5" 
              placeholder="Cuéntanos qué tienes en mente..." 
              className="w-full bg-white border border-gray-200 px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2 rounded-md resize-none" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="group bg-[#158F9B] hover:bg-[#127C86] text-white px-20 py-2.5 rounded-lg text-xl font-light transition-all duration-300 flex items-center justify-center gap-2 mx-auto active:scale-95"
        >
          Continuar
        </button>
      </form>
    </div>
  );
};

export default ContactForm;