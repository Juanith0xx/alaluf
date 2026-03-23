import React from 'react';

// Importación de imágenes
import fondoIndustrial from '../assets/industrial.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const Industrial = () => {
  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        {/* Imagen de fondo principal */}
        <img 
          src={fondoIndustrial} 
          alt="Fondo Industrial" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        
        {/* Gradiente oscuro inferior (Ajustado para legibilidad del título) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
        
        {/* Contenedor del Título posicionado por PORCENTAJE */}
        <div 
          className="absolute z-20 w-auto"
          style={{ 
            left: '8%',    // Ajusta este % para mover a la derecha/izquierda
            bottom: '38%',  // Ajusta este % para mover arriba/abajo
          }}
        >
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg">
            INDUSTRIAL
          </h1>
        </div>
      </section>

      {/* SECCIÓN TEXTO INTRODUCTORIO */}
      <section className="container mx-auto px-6 py-16 md:py-24 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          Inteligencia Industrial
        </h2>
        <p className="text-[#0091A4] text-xl font-semibold mb-10">
          439.000 m² de bodegas disponibles en Chile hoy. Saber cuál es el correcto para tu <br className="hidden md:block" /> operación es lo que nos diferencia. <span className='text-gray-500 text-lg font-normal'>(Fuente: CBRE Chile)</span>
        </p>
        <div className="space-y-6 text-white font-semibold max-w-5xl mx-auto leading-relaxed text-base md:text-xl drop-shadow-sm">
          <p>
            Galpones, bodegas y centros logísticos analizados desde la operación. Estudiamos accesos, flujos <br className="hidden md:block" />
            logísticos, normativa y rentabilidad antes de recomendarte cualquier activo, para que cada decisión <br className="hidden md:block" />
            sume a tu negocio.
          </p>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="py-16 px-6 md:px-20">
        <div className="container mx-auto max-w-7xl mb-4">
          <div className="bg-[#0091A4] text-center text-white rounded-2xl p-10 md:p-14 flex flex-col items-center shadow-2xl transition-transform hover:scale-[1.01]">
            <h4 className="text-3xl md:text-4xl font-extrabold mb-4">
              No busques bodegas. Busca la operación correcta.
            </h4>
            <p className="text-lg md:text-xl font-medium max-w-4xl mb-10 leading-relaxed">
              Analizamos accesos, flujos, normativa y rentabilidad para que tu próxima bodega no sea solo un espacio — sea una ventaja competitiva.
            </p>
            <a 
              href="#" 
              className="bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-lg px-12 py-4 rounded-xl shadow-md transition duration-300 active:scale-95"
            >
              Ver propiedades industriales
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Industrial;