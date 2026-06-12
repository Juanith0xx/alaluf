import React, { useState } from 'react';

import bg from "../assets/Marmol.jpg";
import imgThree from "../assets/ciudad.jpg";
import imgTwo from "../assets/Volcan.jpg";
import mapImage from "../assets/mapa.jpg";
import imgc from "../assets/chile.png";

import logoFalabella from "../assets/logos/falabella.png";
import logoCencosud from "../assets/logos/cencosud.png";
import logoSmu from "../assets/logos/smu.png";
import logoRipley from "../assets/logos/ripley.png";
import logoSodimac from "../assets/logos/sodimac.png";
import logoParqueArauco from "../assets/logos/parque.png";

const ExperienceSection = () => {
  const [rut, setRut] = useState("");
  const [rutError, setRutError] = useState("");
  
  const [formData, setFormData] = useState({
    razon_social: "",
    email: "",
    fono: "",
    requerimiento: "",
    id_tipo_propiedad: "1" 
  });

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

    setRut(value);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rut) {
      setRutError("El RUT es obligatorio*");
      return;
    }

    if (!validarRutChileno(rut)) {
      setRutError("Por favor, ingresa un RUT real antes de continuar.");
      return;
    }

    if (!formData.email && !formData.fono) {
      alert("Debes ingresar al menos un correo electrónico o un teléfono de contacto.");
      return;
    }

    try {
      const rutSanitizado = rut.replace(/\./g, "");

      const payload = {
        razon_social: formData.razon_social,
        rut: rutSanitizado,
        email: formData.email,
        fono: formData.fono,
        requerimiento: formData.requerimiento,
        id_tipo_propiedad: Number(formData.id_tipo_propiedad) 
      };

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_URL}/api/indicadores/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        alert("¡Tu requerimiento ha sido enviado con éxito! Un asesor se contactará contigo.");
        setRut("");
        setFormData({ razon_social: "", email: "", fono: "", requerimiento: "", id_tipo_propiedad: "1" });
      } else {
        alert(`Hubo un problema al procesar el envío: ${result.message}`);
      }

    } catch (error) {
      console.error("Error enviando el formulario:", error);
      alert("Error de conexión. Por favor, vuelve a intentarlo más tarde.");
    }
  };

  return (
    <section className="w-full text-white overflow-hidden font-[Outfit]">

      {/* BLOQUE 1 — EXPERIENCIA */}
      <div className="relative py-16 md:py-28 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Se ajustó md:flex-row a lg:flex-row para que en tablet mantenga orden apilado si es necesario */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
            <div className="flex-shrink-0 leading-none">
              <h1 className="font-extrabold flex -space-x-1" style={{ fontSize: "clamp(120px, 25vw, 550px)", lineHeight: "0.85" }}>
                <span style={{ backgroundImage: `url(${imgc})`, backgroundSize: "cover", backgroundPosition: "center", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>4</span>
                <span style={{ backgroundImage: `url(${imgc})`, backgroundSize: "cover", backgroundPosition: "center", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>5</span>
              </h1>
            </div>
            {/* mt-10 en móvil, respetando tu mt-41 en desktop mediante lg:mt-41 */}
            <div className="text-center lg:text-left mt-10 lg:mt-41">
              <p className="text-xs md:text-sm tracking-[0.15em] lg:tracking-[0.25em] text-[#24B6C1] font-bold">
                AÑOS JUNTO A LAS EMPRESAS MÁS <br className="hidden md:block" />IMPORTANTES DE CHILE.
              </p>
              <p className="text-xs md:text-sm text-white mt-2">
                Las empresas más importantes de Chile confían en<br className="hidden md:block" /> nuestro criterio.
              </p>
            </div>
          </div>

          {/* CLIENTES */}
          <div className="mt-16 md:mt-24 text-center">
            <h3 className="text-2xl md:text-[36px] font-medium tracking-widest">
              NUESTROS <span className="text-[#24B6C1]">CLIENTES</span>
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mt-10 md:mt-16 px-4">
              {[
                { name: "Grupo Falabella", logo: logoFalabella },
                { name: "Cencosud", logo: logoCencosud },
                { name: "SMU", logo: logoSmu },
                { name: "Ripley", logo: logoRipley },
                { name: "Sodimac", logo: logoSodimac },
                { name: "Parque Arauco", logo: logoParqueArauco }
              ].map((cliente, i) => (
                <div key={i} className="w-24 md:w-32 lg:w-40 h-12 md:h-20 flex items-center justify-center opacity-60 hover:opacity-100 transition duration-300 cursor-pointer p-2" title={cliente.name}>
                  <img src={cliente.logo} alt={`Logo de ${cliente.name}`} className="max-w-full max-h-full object-contain filter brightness-0 invert" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE 2 — COBERTURA */}
      <div className="bg-[#0f0f0f] py-16 md:py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-[36px] mb-16 md:mb-32 tracking-widest font-medium">
            ESTAMOS <span className="text-[#24B6C1]">EN TODO CHILE</span>
          </h2>

          {/* Grilla principal: apilada en móvil/tablet, 2 columnas en desktop (lg:) y se respeta tu -mr-30 original */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:-mr-30 gap-16 lg:gap-0 items-start">
            
            {/* IZQUIERDA — Imagen + Regiones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-1 items-start">
              <div className="flex justify-center sm:justify-start">
                {/* Se preserva tu -mt-28 en desktop (lg:-mt-28) */}
                <img src={mapImage} alt="Mapa de cobertura en Chile" className="w-[80%] sm:w-[75%] lg:w-[68%] object-cover rounded-3xl shadow-2xl lg:-mt-28" />
              </div>
              {/* Se preserva tu -ml-14 en desktop (lg:-ml-14) */}
              <div className="text-white/60 space-y-4 lg:-ml-14 text-center sm:text-left px-4 sm:px-0">
                <p className="font-semibold text-white mb-4 md:mb-6">Zonas de cobertura</p>
                {["Santiago Centro", "Las Condes", "Vitacura", "Quilicura", "Lampa", "Pudahuel", "Colina", "Región de Valparaíso", "Concepción", "La Serena"].map((zona, i) => (
                  <p key={i} className="text-sm hover:text-white transition">{zona}</p>
                ))}
              </div>
            </div>

            {/* 🌟 DERECHA — Formulario */}
            {/* Se preserva tu -mt-23 y -ml-34 exclusivos de desktop mediante prefijo lg: */}
            <div id="contacto" className="bg-white text-gray-800 rounded-[40px] md:rounded-[60px] lg:rounded-[80px] p-6 sm:p-12 shadow-2xl lg:-mt-23 lg:-ml-34 scroll-mt-32 relative z-10">
              <h2 className="text-2xl md:text-3xl font-medium mb-8 md:mb-10 text-center sm:text-start font-[Outfit]">
                Lo primero es entenderte.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 font-[Outfit]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Nombre / Razon Social */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Nombre completo *</label>
                    <input 
                      type="text" 
                      name="razon_social"
                      value={formData.razon_social}
                      onChange={handleInputChange}
                      placeholder="Tu nombre" 
                      className="w-full bg-white border border-gray-200 px-5 md:px-6 py-3 md:py-2 rounded-md lg:rounded-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2" 
                      required 
                    />
                  </div>

                  {/* Campo Rut */}
                  <div className="space-y-2 relative">
                    <label className="text-sm font-semibold">Rut *</label>
                    <input
                      type="text"
                      value={rut}
                      onChange={handleRutChange}
                      placeholder="12.345.678-K"
                      className={`w-full bg-white border px-5 md:px-6 py-3 md:py-2 rounded-md lg:rounded-none placeholder-gray-400 focus:outline-none focus:ring-2 mt-2 transition-colors ${
                        rutError 
                          ? "border-red-500 focus:ring-red-500" 
                          : "border-gray-200 focus:ring-[#24B6C1]"
                      }`}
                    />
                    {rutError && (
                      <p className="text-red-500 text-xs font-semibold mt-1 text-end pl-2">
                        {rutError}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Correo electrónico *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com" 
                      className="w-full bg-white border border-gray-200 px-5 md:px-6 py-3 md:py-2 rounded-md lg:rounded-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2" 
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Teléfono</label>
                    <input 
                      type="text" 
                      name="fono"
                      value={formData.fono}
                      onChange={handleInputChange}
                      placeholder="+56 9 1234 5678" 
                      className="w-full bg-white border border-gray-200 px-5 md:px-6 py-3 md:py-2 rounded-md lg:rounded-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2" 
                    />
                  </div>

                  {/* SELECTOR */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold">¿Qué estás buscando?</label>
                    <select
                      name="id_tipo_propiedad"
                      value={formData.id_tipo_propiedad}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 px-4 md:px-5 py-3.5 md:py-2.5 rounded-md lg:rounded-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2 cursor-pointer"
                    >
                      <option value="1">Residencial</option>
                      <option value="3">Oficina</option>
                      <option value="4">Retail</option>
                      <option value="7">Industrial</option>
                      <option value="6">Terreno para Proyecto</option>
                      <option value="8">Administración de Arriendos</option>
                    </select>
                  </div>

                  {/* Requerimiento / Textarea */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold">Hablemos de lo que necesitas.</label>
                    <textarea 
                      rows="4" 
                      name="requerimiento"
                      value={formData.requerimiento}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos qué tienes en mente..." 
                      className="w-full bg-white border border-gray-200 px-4 md:px-4 py-4 rounded-md lg:rounded-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2" 
                    />
                  </div>
                </div>

                {/* Botón responsivo: width completo en móvil, fijo en escritorio */}
                <button type="submit" className="w-full lg:w-auto group bg-[#158F9B] hover:bg-[#127C86] text-white px-10 lg:px-20 py-3 lg:py-2.5 rounded-lg text-lg lg:text-xl font-light transition-all duration-300 flex items-center justify-center gap-2 mx-auto lg:mx-auto">
                  Continuar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;