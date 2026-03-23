import React from 'react';

// Importación de imágenes
import heroTasacion from '../assets/tasacion.png'; // Reemplazar por la ruta real
import fondoMarmol from '../assets/Marmol.jpg'; 

const TasacionActivos = () => {
  const razones = [
    {
      title: "ANTES DE VENDER",
      description: "Conoce el precio justo antes de publicar. Ni un peso menos de lo que vale."
    },
    {
      title: "ANTES DE COMPRAR",
      description: "Verifica que lo que pagas tiene sentido. Criterio antes del compromiso."
    },
    {
      title: "ANTES DE INVERTIR",
      description: "Analiza la rentabilidad real del activo antes de decidir."
    }
  ];

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed" 
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO - TASACIÓN DE ACTIVOS */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        <img 
          src={heroTasacion} 
          alt="Tasación de Activos" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div 
          className="absolute z-20 w-auto"
          style={{ 
            left: '8%',    
            bottom: '38%', 
          }}
        >
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg">
            TASACIÓN DE ACTIVOS
          </h1>
        </div>
      </section>

      {/* SECCIÓN TEXTO INTRODUCTORIO */}
      <section className="container mx-auto px-6 py-16 md:py-24 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md">
          Tasación de Activos
        </h2>
        <p className="text-[#0091A4] text-lg md:text-xl lg:text-2xl font-bold mb-10">
          Antes de decidir, necesitas saber cuánto vale realmente.
        </p>
        
        <div className="space-y-6 text-white max-w-5xl mx-auto leading-relaxed text-base md:text-lg lg:text-xl font-medium drop-shadow-sm">
          <p>
            Una tasación precisa no es un trámite, es la base de cualquier decisión inmobiliaria inteligente.<br></br>
            Valoramos tu activo con criterio de mercado real: ubicación, plusvalía, comparables reales y <br></br>
            contexto actual. Para que vendas, arrendas o inviertas desde una posición informada, no de intuición.
          </p>
          <p className="italic text-gray-300 pl-6 py-2 my-8">
            “Con tasas hipotecarias en 4,3% — las más bajas en años — y el mercado reactivándose, 
            saber el valor real de tu activo no es un trámite. Es tu ventaja competitiva.”
          </p>
          <p className="text-xs text-gray-400 font-normal">
            Fuente: Banco Central de Chile, Informe Estadísticas Monetarias y Financieras, agosto 2025.
          </p>
        </div>
      </section>

      {/* SECCIÓN 3 RAZONES - CARDS ANCHAS (Estilo Licitaciones) */}
      <section className="py-12 md:py-2 px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white uppercase tracking-wider mb-16 md:mb-8 drop-shadow-md">
            3 RAZONES PARA TASAR CON ALALUF:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 w-full">
            {razones.map((item, index) => (
              <div 
                key={index} 
                className="bg-white text-gray-800 rounded-xl p-8 md:p-10 shadow-2xl flex flex-col border border-gray-100 transition-transform hover:scale-[1.01] w-full" 
              >
                {/* Cabecera Tipo Botón Gris */}
                <div className="bg-[#3e3e3e] text-center text-white rounded-full py-3 px-6 -mx-4 -mt-4 mb-8 font-semibold tracking-wide uppercase shadow-md text-lg">
                  {item.title}
                </div>
                
                <div className="flex flex-col flex-grow">
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed text-left text-gray-700 font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA - CAJA CYAN */}
      <section className="py-24 px-6 md:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="bg-[#0091A4] text-white rounded-[2rem] p-10 md:p-14 text-center shadow-2xl">
            <h3 className="text-3xl md:!text-3xl lg:text-5xl font-bold mb-6">
              No decidas sin saber cuánto vale
            </h3>
            
            <p className="text-lg md:!text-lg lg:text-2xl mb-10 opacity-95 max-w-4xl mx-auto font-medium">
              Tasamos tu activo con comparables reales, contexto de mercado y criterio profesional. 
              Para que vendas, arriendas o inviertas con los números claros.
            </p>

            <button className="bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-lg md:text-xl px-12 py-4 rounded-xl shadow-xl transition-all duration-300 active:scale-95">
              Tasar mi activo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TasacionActivos;