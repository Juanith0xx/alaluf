import React, { useState } from 'react';

import bg from "../assets/Marmol.jpg"
import imgThree from "../assets/ciudad.jpg"
import imgTwo from "../assets/Volcan.jpg"
import mapImage from "../assets/mapa.jpg"
import imgc from "../assets/chile.png"

import logoFalabella from "../assets/logos/falabella.png"
import logoCencosud from "../assets/logos/cencosud.png"
import logoSmu from "../assets/logos/smu.png"
import logoRipley from "../assets/logos/ripley.png"
import logoSodimac from "../assets/logos/sodimac.png"
import logoParqueArauco from "../assets/logos/parque.png"

const ExperienceSection = () => {
  // ESTADOS PARA EL RUT Y SU VALIDACIÓN
  const [rut, setRut] = useState("");
  const [rutError, setRutError] = useState("");

  // 1. ALGORITMO MÓDULO 11 (VALIDACIÓN REAL)
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

  // 2. FORMATEADOR AUTOMÁTICO CORREGIDO 🌟
  const handleRutChange = (e) => {
    let value = e.target.value.replace(/[^0-9kK]/g, ""); // Solo permite números y K
    
    if (value.length > 9) return; // Límite máximo de caracteres limpios (ej: 12345678K)

    // Formatear dinámicamente con puntos y guión
    if (value.length > 1) {
      const dv = value.slice(-1);
      const cuerpo = value.slice(0, -1);
      
      // Aplicar puntos al cuerpo matemáticamente
      const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      value = `${cuerpoFormateado}-${dv}`; // 🌟 Corregido el typo aquí
    }

    setRut(value);

    // Validar en tiempo real si el usuario ya escribió el RUT básico completo
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

  // 3. VALIDACIÓN AL ENVIAR EL FORMULARIO
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!rut) {
      setRutError("El RUT es obligatorio*");
      return;
    }

    if (!validarRutChileno(rut)) {
      setRutError("Por favor, ingresa un RUT real antes de continuar.");
      return;
    }

    alert("Formulario enviado con éxito, RUT verificado.");
  };

  return (
    <section className="w-full text-white overflow-hidden font-[Outfit]">

      {/* BLOQUE 1 — EXPERIENCIA */}
      <div className="relative py-28 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex-shrink-0 leading-none">
              <h1 className="font-extrabold flex -space-x-1" style={{ fontSize: "clamp(160px, 25vw, 550px)", lineHeight: "0.85" }}>
                <span style={{ backgroundImage: `url(${imgc})`, backgroundSize: "cover", backgroundPosition: "center", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>4</span>
                <span style={{ backgroundImage: `url(${imgc})`, backgroundSize: "cover", backgroundPosition: "center", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>5</span>
              </h1>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm tracking-[0.25em] text-[#24B6C1] font-bold mt-41">
                AÑOS JUNTO A LAS EMPRESAS MÁS <br />IMPORTANTES DE CHILE.
              </p>
              <p className="text-xs md:text-sm text-white mt-2">
                Las empresas más importantes de Chile confían en<br />nuestro criterio.
              </p>
            </div>
          </div>

          {/* CLIENTES */}
          <div className="mt-24 text-center">
            <h3 className="text-[36px] font-medium tracking-widest">
              NUESTROS <span className="text-[#24B6C1]">CLIENTES</span>
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-12 mt-16 px-4">
              {[
                { name: "Grupo Falabella", logo: logoFalabella },
                { name: "Cencosud", logo: logoCencosud },
                { name: "SMU", logo: logoSmu },
                { name: "Ripley", logo: logoRipley },
                { name: "Sodimac", logo: logoSodimac },
                { name: "Parque Arauco", logo: logoParqueArauco }
              ].map((cliente, i) => (
                <div key={i} className="w-40 h-20 flex items-center justify-center opacity-60 hover:opacity-100 transition duration-300 cursor-pointer p-2" title={cliente.name}>
                  <img src={cliente.logo} alt={`Logo de ${cliente.name}`} className="max-w-full max-h-full object-contain filter brightness-0 invert" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE 2 — COBERTURA */}
      <div className="bg-[#0f0f0f] py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[36px] mb-32 tracking-widest font-medium">
            ESTAMOS <span className="text-[#24B6C1]">EN TODO CHILE</span>
          </h2>

          <div className="md:col-span-1 grid md:grid-cols-2 -mr-30 items-start">
            {/* IZQUIERDA — Imagen + Regiones */}
            <div className="grid md:grid-cols-2 gap-1 items-start">
              <div>
                <img src={mapImage} alt="Mapa de cobertura en Chile" className="w-[68%] object-cover rounded-3xl shadow-2xl -mt-28" />
              </div>
              <div className="text-white/60 space-y-4 -ml-14">
                <p className="font-semibold text-white mb-6">Zonas de cobertura</p>
                {["Santiago Centro", "Las Condes", "Vitacura", "Quilicura", "Lampa", "Pudahuel", "Colina", "Región de Valparaíso", "Concepción", "La Serena"].map((zona, i) => (
                  <p key={i} className="text-sm hover:text-white transition">{zona}</p>
                ))}
              </div>
            </div>

            {/* DERECHA — Formulario */}
            <div className="bg-white text-gray-800 rounded-[80px] p-12 shadow-2xl -mt-23 -ml-34">
              <h2 className="text-2xl md:text-3xl font-medium mb-10 text-start font-[Outfit]">
                Lo primero es entenderte.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8 font-[Outfit]">
                <div className="grid md:grid-cols-2 gap-4">
                  
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Nombre completo *</label>
                    <input type="text" placeholder="Tu nombre" className="w-full bg-white border border-gray-200 px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2" required />
                  </div>

                  {/* Campo Rut Corregido y Funcional */}
                  <div className="space-y-2 relative">
                    <label className="text-sm font-semibold">Rut *</label>
                    <input
                      type="text"
                      value={rut}
                      onChange={handleRutChange}
                      placeholder="12.345.678-K"
                      className={`w-full bg-white border px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 mt-2 transition-colors ${
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
                    <input type="email" placeholder="tu@email.com" className="w-full bg-white border border-gray-200 px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2" required />
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Teléfono</label>
                    <input type="text" placeholder="+56 9 1234 5678" className="w-full bg-white border border-gray-200 px-6 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2" />
                  </div>

                  {/* Textarea */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold">Hablemos de lo que necesitas.</label>
                    <textarea rows="5" placeholder="Cuéntanos qué tienes en mente..." className="w-full bg-white border border-gray-200 px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24B6C1] mt-2" />
                  </div>
                </div>

                <button type="submit" className="group bg-[#158F9B] hover:bg-[#127C86] text-white px-20 py-2.5 rounded-lg text-xl font-light transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                  Continuar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection;