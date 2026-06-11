import React from 'react';

// Importación de imágenes
import fondoComercial from '../assets/comercial.jpeg'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const Comercial = () => {
  return (
    // 🌟 SE AGREGÓ 'font-[Outfit]' AQUÍ PARA QUE TODO EL COMPONENTE LA HEREDE
    <main 
      className="w-full min-h-screen bg-cover bg-center bg-fixed font-[Outfit]"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        {/* Imagen de fondo principal */}
        <img 
          src={fondoComercial} 
          alt="Fondo Comercial" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        
        {/* Gradiente oscuro inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        
        {/* CONTENEDOR DEL TÍTULO POR PORCENTAJE */}
        <div 
          className="absolute z-20 w-auto"
          style={{ 
            left: '8%',    
            bottom: '38%', 
          }}
        >
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg">
            COMERCIAL
          </h1>
        </div>
      </section>

      {/* SECCIÓN TEXTO INTRODUCTORIO */}
      <section className="container mx-auto px-6 py-16 md:py-10 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          Estrategia Comercial Inmobiliaria
        </h2>
        <p className="text-[#0091A4] text-xl font-semibold mb-10">
          Estudiamos dónde crece tu negocio antes de mostrarte solo un espacio.
        </p>
      </section>

      {/* SECCIÓN TARJETAS (LOCALES Y OFICINAS ACTUALIZADA) */}
      <section className="py-2 px-6 md:px-20 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto items-stretch">
            
            {/* Tarjeta LOCALES */}
            <div className="bg-white text-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between border border-gray-100">
              <div>
                {/* Header Gris Oscuro */}
                <div className="bg-[#404040] text-center text-white rounded-xl py-3 px-6 mb-6 font-bold tracking-wider uppercase text-sm shadow-sm">
                  Locales
                </div>
                {/* Texto Destacado */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-snug">
                  El local correcto no es el más barato. Es el que más vende.
                </h3>
                {/* Párrafo Informativo */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 font-normal">
                  Locales comerciales, casas comerciales y retail en el sector oriente de Santiago. 
                  Estudiamos flujo peatonal, perfil del barrio, competencia y proyección antes de 
                  recomendarte cualquier espacio — porque un local mal elegido no se corrige con marketing.
                </p>
              </div>
              {/* Botón CTA */}
              <button className="w-fit bg-[#0091A4] hover:bg-[#007a8a] text-white font-bold py-3 px-6 rounded-xl transition duration-300 active:scale-95 text-sm md:text-base shadow-md">
                Explorar locales comerciales
              </button>
            </div>

            {/* Tarjeta OFICINAS */}
            <div className="bg-white text-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between border border-gray-100">
              <div>
                {/* Header Gris Oscuro */}
                <div className="bg-[#404040] text-center text-white rounded-xl py-3 px-6 mb-6 font-bold tracking-wider uppercase text-sm shadow-sm">
                  Oficinas
                </div>
                {/* Texto Destacado */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-snug">
                  El mercado de oficinas en Santiago vive su mejor momento en 5 años. ¿Sabes cómo aprovecharlo?
                </h3>
                {/* Párrafo Informativo */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3 font-normal">
                  La vacancia de oficinas Clase A en Santiago cerró 2025 en 9,54% — la más baja de los 
                  últimos cinco años — y Las Condes lidera con solo un 5,59% de disponibilidad. El mercado 
                  se está apretando. Las mejores oficinas se están yendo rápido. Analizamos contigo la 
                  opción correcta antes de que desaparezca.
                </p>
                {/* Nota de la Fuente */}
                <span className="block text-[11px] text-gray-400 font-medium mb-6">
                  Fuente: CBRE Chile, Informe Mercado de Oficinas A+B, Q4 2025.
                </span>
              </div>
              {/* Botón CTA */}
              <button className="w-fit bg-[#0091A4] hover:bg-[#007a8a] text-white font-bold py-3 px-6 rounded-xl transition duration-300 active:scale-95 text-sm md:text-base shadow-md">
                Encontrar oficinas
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="py-16 px-6 md:px-20 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#0091A4] text-center text-white rounded-2xl p-10 md:p-14 flex flex-col items-center shadow-2xl transition-transform hover:scale-[1.01]">
            <h4 className="text-3xl md:text-4xl font-extrabold mb-4">Accede antes que el mercado</h4>
            <p className="text-lg md:text-xl font-medium max-w-4xl mb-10">
              Recibe oportunidades comerciales que no se publican abiertamente. Solo para inversionistas calificados.
            </p>
            <a href="#" className="bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-lg px-12 py-4 rounded-xl shadow-md transition duration-300 active:scale-95">
              Quiero acceder
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Comercial;