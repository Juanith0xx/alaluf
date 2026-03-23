import React from 'react';

// Importación de imágenes
import heroResidencial from '../assets/residencial.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const Residencial = () => {
  const subservicios = [
    {
      title: "COMPRAR",
      description: "Analizamos la propiedad correcta para tu vida y tu patrimonio, porque la mejor decisión equilibra lo que sientes con lo que tiene sentido.",
      buttonText: "COMPRAR",
      buttonColor: "bg-[#0091A4]", 
    },
    {
      title: "ARRENDAR",
      description: "El lugar que buscas, en el barrio que ya conoces.",
      buttonText: "ARRENDAR",
      buttonColor: "bg-[#0091A4]",
    },
    {
      title: "VENDER",
      description: "Antes de poner el precio, analizamos el activo. Antes de buscar el comprador, definimos la estrategia.",
      buttonText: "VENDER", 
      buttonColor: "bg-[#0091A4]",
    },
  ];

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed" 
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO RESIDENCIAL */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        <img 
          src={heroResidencial} 
          alt="Vista residencial de lujo" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        <div 
          className="absolute z-20 w-auto"
          style={{ 
            left: '8%',    
            bottom: '38%', 
          }}
        >
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg">
            Residencial
          </h1>
        </div>
      </section>

      {/* SECCIÓN ASESORÍA RESIDENCIAL */}
      <section className="container mx-auto px-6 py-16 md:py-12 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md">
          Asesoría Residencial
        </h2>
        <p className="text-[#0091A4] text-lg md:text-2xl font-bold mb-10">
          Los que viven mejor, eligieron mejor.
        </p>
        <div className="space-y-6 text-white max-w-5xl mx-auto leading-relaxed text-base md:text-xl font-medium drop-shadow-sm">
          <p>
            El mercado residencial en Santiago creció un 34,4% en ventas en el último trimestre de 2025. El momento de
            moverse con criterio es ahora.
          </p>
          <p className="text-sm text-gray-400 font-normal">
            Fuente: NielsenIQ, Informe Inmobiliario Q4 2025.
          </p>
          <p className="text-[#0091A4] text-base md:text-xl font-bold">
            Buscamos el equilibrio perfecto entre la emoción de vivir y la inteligencia de invertir.
          </p>
        </div>
      </section>

      {/* SECCIÓN 3 SUBSERVICIOS - ESTILO LICITACIONES */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white uppercase tracking-wider mb-16 md:mb-24 drop-shadow-md">
            3 SUBSERVICIOS EN RESIDENCIAL:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 w-full">
            {subservicios.map((subservicio, index) => (
              <div 
                key={index} 
                className="bg-white text-gray-800 rounded-xl p-8 md:p-10 shadow-2xl flex flex-col border border-gray-100 transition-transform hover:scale-[1.01] w-full" 
              >
                {/* Cabecera TIPO BOTÓN (Copiado de Licitaciones) */}
                <div className="bg-[#3e3e3e] text-center text-white rounded-full py-3 px-6 -mx-4 -mt-4 mb-8 font-semibold tracking-wide uppercase shadow-md text-lg">
                  {subservicio.title}
                </div>
                
                {/* Cuerpo de la tarjeta */}
                <div className="flex flex-col flex-grow">
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed text-left flex-grow mb-10 text-gray-600 font-medium">
                    {subservicio.description}
                  </p>
                  
                  {/* Botón Cyan */}
                  <div className="text-left mt-auto">
                    <button 
                      className={`${subservicio.buttonColor} text-white hover:brightness-110 font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition duration-300 active:scale-95`}
                    >
                      {subservicio.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Residencial;