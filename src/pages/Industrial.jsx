import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

// Importación de imágenes
import fondoIndustrial from '../assets/industria.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const Industrial = () => {
  const navigate = useNavigate();
  
  // Estado para manejar la operación seleccionada ('arrendar' o 'comprar')
  const [operacion, setOperacion] = useState('arrendar');

  const handleVerPropiedades = () => {
    // Mapeamos dinámicamente el código de objetivo según la pestaña activa
    // obj=1 para Comprar (Venta) y obj=2 para Arrendar
    const objCodigo = operacion === 'comprar' ? '1' : '2';
    navigate(`/buscar?tipo_prop=7A&obj=${objCodigo}`);
  };

  return (
    // Se agregó 'pt-28 sm:pt-32 md:pt-40' para compensar el navbar fijo
    <main 
      className="w-full min-h-screen bg-cover bg-center bg-fixed font-[Outfit] pt-28 sm:pt-32 md:pt-40"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO */}
      <section className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden border-b border-white/10">
        {/* Imagen de fondo principal */}
        <img 
          src={fondoIndustrial} 
          alt="Fondo Industrial" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        
        {/* Gradiente oscuro inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
        
        {/* Contenedor del Título */}
        <div 
          className="absolute z-20 w-[90%] sm:w-auto"
          style={{ 
            left: '8%',    
            bottom: '35%',  
          }}
        >
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg leading-none">
            INDUSTRIAL
          </h1>
        </div>
      </section>

      {/* SECCIÓN TEXTO INTRODUCTORIO */}
      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-20 max-w-7xl text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
          Inteligencia Industrial
        </h2>
        <p className="text-[#0091A4] text-sm sm:text-base md:text-xl font-semibold mb-8 max-w-4xl mx-auto leading-relaxed px-2">
          Entre todas las bodegas o galpones disponibles, encontrar la que tu operación necesita requiere criterio inmobiliario. Porque elegir bien, es la única rentabilidad segura para tu negocio.
        </p>
        <div className="space-y-4 text-white font-semibold max-w-5xl mx-auto leading-relaxed text-xs sm:text-base md:text-lg drop-shadow-sm px-2 text-justify sm:text-center">
          <p className="font-light">
            Galpones, bodegas y centros logísticos analizados desde la operación. Estudiamos accesos, flujos logísticos, normativa y rentabilidad antes de recomendarte cualquier activo, para que cada decisión sume a tu negocio.
          </p>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-20 relative z-10">
        <div className="container mx-auto max-w-7xl mb-4">
          <div className="bg-[#0091A4] text-center text-white rounded-2xl p-6 sm:p-10 md:p-14 flex flex-col items-center shadow-2xl transition-transform hover:scale-[1.01]">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-snug">
              No busques bodegas. Busca la operación correcta.
            </h4>
            <p className="text-sm sm:text-lg md:text-xl font-medium max-w-4xl mb-8 leading-relaxed px-2">
              Analizamos accesos, flujos, normativa y rentabilidad para que tu próxima bodega no sea solo un espacio — sea una ventaja competitiva.
            </p>
            
            {/* Selector de Pestañas (Comprar / Arrendar) */}
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl flex items-center mb-8 border border-white/10 w-full max-w-[280px]">
              <button
                type="button"
                onClick={() => setOperacion('comprar')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                  operacion === 'comprar'
                    ? "bg-white text-[#0091A4] shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                Comprar
              </button>
              <button
                type="button"
                onClick={() => setOperacion('arrendar')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                  operacion === 'arrendar'
                    ? "bg-white text-[#0091A4] shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                Arrendar
              </button>
            </div>
            
            {/* Botón Principal de Acción */}
            <button 
              type="button"
              onClick={handleVerPropiedades}
              className="w-full sm:w-fit bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-base sm:text-lg px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl shadow-md transition duration-300 active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              Ver propiedades industriales
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Industrial;