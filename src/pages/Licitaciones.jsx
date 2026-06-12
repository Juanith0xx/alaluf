import React from 'react';

// Importación de imágenes
import fondoLicitaciones from '../assets/licitaciones.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const Licitaciones = () => {
  const comparativaLicitacion = [
    "Plazo definido",
    "Plan de marketing específico",
    "Precio mínimo establecido",
    "Maximización del precio"
  ];

  const comparativaVentaDirecta = [
    "Sin plazo fijo",
    "Plan de marketing general",
    "Ofertas desde precio hacia abajo",
    "Mayor flexibilidad en el proceso"
  ];

  return (
    // 🌟 Se incrementó el padding top para dar espacio desde el navbar fijo
    <main 
      className="w-full min-h-screen bg-cover bg-center bg-fixed font-[Outfit] pt-28 sm:pt-32 md:pt-40"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO */}
      <section className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden border-b border-white/10">
        {/* Imagen de fondo principal */}
        <img 
          src={fondoLicitaciones} 
          alt="Fondo Licitaciones" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        
        {/* Gradiente oscuro inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        
        {/* CONTENEDOR DEL TÍTULO */}
        <div 
          className="absolute z-20 w-[90%] sm:w-auto"
          style={{ 
            left: '8%',    
            bottom: '35%', 
          }}
        >
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg leading-none">
            LICITACIONES
          </h1>
        </div>
      </section>

      {/* SECCIÓN TEXTO INTRODUCTORIO */}
      <section className="container mx-auto px-6 py-12 md:py-20 max-w-7xl text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          Acceso a Oportunidades Exclusivas
        </h2>
        <p className="text-[#0091A4] text-lg md:text-xl font-semibold mb-8">
          Los mejores activos no se publican. Se consiguen.
        </p>
        <div className="space-y-5 text-gray-200 max-w-5xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg drop-shadow-sm px-2 sm:px-0 text-justify sm:text-center">
          <p className="font-light">
            Terrenos, edificios y activos de alto valor que no llegan al mercado abierto. En 45 años hemos
            estructurado y ganado las licitaciones más complejas de Chile — con el respaldo, la red y el criterio que
            cada operación exige.
          </p>
          <p className="font-light">
            La licitación no es solo una forma de vender — es la forma más inteligente de hacerlo. Es un proceso
            transparente, con plazo definido y un objetivo claro: maximizar el valor de tu activo. Puedes licitar
            cualquier tipo de propiedad y en 4 a 7 meses tienes el negocio cerrado.
          </p>
        </div>
      </section>

      {/* SECCIÓN COMPARATIVA */}
      <section className="py-4 px-4 sm:px-6 md:px-20 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white uppercase tracking-wider mb-8 md:mb-12 drop-shadow-md px-2 leading-snug">
            La diferencia entre una licitación versus venta directa:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto items-stretch">
            
            {/* 🌟 Tarjeta LICITACIÓN (Diseño sin márgenes cortantes) */}
            <div className="bg-white text-gray-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between border border-gray-100">
              <div>
                <div className="bg-[#404040] text-center text-white rounded-xl py-3 px-6 mb-6 font-bold tracking-wider uppercase text-sm shadow-sm">
                  LICITACIÓN
                </div>
                <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg list-disc list-inside marker:text-[#0091A4] font-medium ps-1">
                  {comparativaLicitacion.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </div>

            {/* 🌟 Tarjeta VENTA DIRECTA (Diseño sin márgenes cortantes) */}
            <div className="bg-white text-gray-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between border border-gray-100">
              <div>
                <div className="bg-[#404040] text-center text-white rounded-xl py-3 px-6 mb-6 font-bold tracking-wider uppercase text-sm shadow-sm">
                  VENTA DIRECTA
                </div>
                <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg list-disc list-inside marker:text-[#0091A4] font-medium ps-1">
                  {comparativaVentaDirecta.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-20 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#0091A4] text-center text-white rounded-2xl p-6 sm:p-10 md:p-14 flex flex-col items-center shadow-2xl transition-transform hover:scale-[1.01]">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 tracking-wide">Accede antes que el mercado</h4>
            <p className="text-base md:text-xl font-light max-w-4xl mb-8 text-cyan-50 px-2 leading-relaxed">
              Recibe oportunidades de licitación que no se publican abiertamente. Solo para inversionistas calificados.
            </p>
            <a href="#" className="w-full sm:w-fit text-center bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-base md:text-lg px-8 sm:px-12 py-3.5 md:py-4 rounded-xl shadow-md transition duration-300 active:scale-95">
              Quiero acceder
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Licitaciones;