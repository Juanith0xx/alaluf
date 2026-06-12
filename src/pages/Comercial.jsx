import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importación de imágenes
import fondoComercial from '../assets/comercial.jpeg'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const Comercial = () => {
  const navigate = useNavigate();
  
  // States for independent cards
  const [localesAccion, setLocalesAccion] = useState("Arrendar");
  const [oficinasAccion, setOficinasAccion] = useState("Arrendar");

  const handleNavegacion = (tipo, accion) => {
    const obj = accion === "Arrendar" ? 2 : 1;
    const tipo_prop = tipo === "Locales" ? "4A" : "3A";
    
    navigate(`/buscar?tipo_prop=${tipo_prop}&obj=${obj}`);
  };

  const ToggleSwitch = ({ activo, setActivo }) => (
    <div className="flex bg-[#F3F4F6] p-1.5 rounded-[14px] w-fit mb-6 border border-gray-100">
      <button
        onClick={() => setActivo("Arrendar")}
        className={`px-6 sm:px-8 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
          activo === "Arrendar" ? "bg-white text-[#0091A4] shadow-sm" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Arrendar
      </button>
      <button
        onClick={() => setActivo("Venta")}
        className={`px-6 sm:px-8 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
          activo === "Venta" ? "bg-white text-[#0091A4] shadow-sm" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Venta
      </button>
    </div>
  );

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center bg-fixed font-[Outfit] pt-28 sm:pt-32 md:pt-40"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO */}
      <section className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden border-b border-white/10">
        <img src={fondoComercial} alt="Fondo Comercial" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        <div className="absolute z-20 w-[90%] sm:w-auto" style={{ left: '8%', bottom: '35%' }}>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg leading-none">
            COMERCIAL
          </h1>
        </div>
      </section>

      {/* SECCIÓN TEXTO INTRODUCTORIO */}
      <section className="container mx-auto px-4 sm:px-6 py-10 md:py-16 max-w-7xl text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-md">
          Estrategia Comercial Inmobiliaria
        </h2>
        <p className="text-[#0091A4] text-base sm:text-lg md:text-xl font-semibold mb-8 max-w-3xl mx-auto px-2">
          Estudiamos dónde crece tu negocio antes de mostrarte solo un espacio.
        </p>
      </section>

      {/* SECCIÓN TARJETAS */}
      <section className="py-4 px-4 sm:px-6 md:px-20 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto items-stretch">
            
            {/* Tarjeta LOCALES */}
            <div className="bg-white text-gray-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between border border-gray-100">
              <div>
                <div className="bg-[#404040] text-center text-white rounded-xl py-3 px-6 mb-6 font-bold tracking-wider uppercase text-sm shadow-sm">Locales</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 leading-snug">
                  El local correcto no es el más barato. Es el que más vende.
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-normal">
                  Locales comerciales, casas comerciales y retail en el sector oriente de Santiago. 
                  Estudiamos flujo peatonal, perfil del barrio, competencia y proyección.
                </p>
                <ToggleSwitch activo={localesAccion} setActivo={setLocalesAccion} />
              </div>
              <button 
                onClick={() => handleNavegacion("Locales", localesAccion)}
                className="w-full sm:w-fit text-center bg-[#0091A4] hover:bg-[#007a8a] text-white font-bold py-3.5 px-6 rounded-xl transition duration-300 active:scale-95 text-sm md:text-base shadow-md mt-4"
              >
                Explorar locales en {localesAccion.toLowerCase()}
              </button>
            </div>

            {/* Tarjeta OFICINAS */}
            <div className="bg-white text-gray-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between border border-gray-100">
              <div>
                <div className="bg-[#404040] text-center text-white rounded-xl py-3 px-6 mb-6 font-bold tracking-wider uppercase text-sm shadow-sm">Oficinas</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 leading-snug">
                  El mercado de oficinas en Santiago vive su mejor momento. ¿Sabes cómo aprovecharlo?
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-3 font-normal">
                  La vacancia de oficinas Clase A en Santiago está en mínimos históricos. Analizamos contigo la 
                  opción correcta antes de que desaparezca del mercado.
                </p>
                <ToggleSwitch activo={oficinasAccion} setActivo={setOficinasAccion} />
              </div>
              <button 
                onClick={() => handleNavegacion("Oficinas", oficinasAccion)}
                className="w-full sm:w-fit text-center bg-[#0091A4] hover:bg-[#007a8a] text-white font-bold py-3.5 px-6 rounded-xl transition duration-300 active:scale-95 text-sm md:text-base shadow-md mt-4"
              >
                Encontrar oficinas en {oficinasAccion.toLowerCase()}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-20 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#0091A4] text-center text-white rounded-2xl p-6 sm:p-10 md:p-14 shadow-2xl">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-snug">Accede antes que el mercado</h4>
            <p className="text-sm sm:text-base md:text-xl font-medium max-w-4xl mb-8 mx-auto leading-relaxed">
              Recibe oportunidades comerciales que no se publican abiertamente.
            </p>
            <a href="#" className="w-full sm:w-fit inline-block bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-base md:text-lg px-8 sm:px-12 py-3.5 md:py-4 rounded-xl shadow-md transition duration-300 active:scale-95">
              Quiero acceder
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Comercial;