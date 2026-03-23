import React from 'react';

// Importación de imágenes
import heroClubDeals from '../assets/clud_inversiones.png'; // Reemplazar por la ruta real
import fondoMarmol from '../assets/Marmol.jpg'; 

const ClubDealsInversiones = () => {
  const pasos = [
    {
      id: "01",
      title: "IDENTIFICAMOS EL ACTIVO",
      description: "Pre-market y off-market. Oportunidades que no llegan al mercado abierto."
    },
    {
      id: "02",
      title: "ESTRUCTURAMOS EL CLUB",
      description: "Grupo selecto de inversionistas. Vehículo legal, tributario y financiero definido."
    },
    {
      id: "03",
      title: "GESTIONAMOS Y REPORTAMOS",
      description: "Administración del activo, dashboard en tiempo real y reporte trimestral de rentabilidad."
    }
  ];

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed" 
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO - CLUB DEALS E INVERSIONES */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        <img 
          src={heroClubDeals} 
          alt="Club Deals e Inversiones" 
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
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg">
            CLUB DEALS E INVERSIONES
          </h1>
        </div>
      </section>

      {/* SECCIÓN TEXTO INTRODUCTORIO */}
      <section className="container mx-auto px-6 py-16 md:py-24 max-w-7xl text-center relative z-10">
        <h2 className="text-2xl md:!text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md">
          Club Deals e Inversionistas
        </h2>
        <p className="text-[#0091A4] text-lg md:text-xl lg:text-2xl font-bold mb-10">
          Los grandes activos no se compran solos. Se estructuran.
        </p>
        
        <div className="space-y-6 text-white max-w-5xl mx-auto leading-relaxed text-base md:text-lg lg:text-xl font-medium drop-shadow-sm">
          <p>
            Un Club Deal inmobiliario permite acceder a activos de alto valor que individualmente están<br></br> 
            fuera del alcance — dividiendo la inversión entre un grupo selecto de inversionistas, con Alaluf<br></br> 
            estructurando, gestionando y protegiendo cada etapa del proceso.
          </p>
          <p className="italic text-gray-300  pl-6 py-2 my-8">
            "El 86% de la inversión inmobiliaria en Chile en 2025 se concentra en activos industriales, 
            multifamily y retail" — los mismos segmentos donde Alaluf lleva 45 años operando.
          </p>
          <p className="text-xs text-gray-400 font-normal">
            Fuente: ACAFI · Reporte Inmobiliario 2025.
          </p>
        </div>
      </section>

      {/* SECCIÓN CÓMO FUNCIONA - CARDS ANCHAS */}
      <section className="py-12 md:py-4 px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white uppercase tracking-wider mb-16 md:mb-12 drop-shadow-md">
            CÓMO FUNCIONA EN TRES PASOS:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 w-full">
            {pasos.map((paso, index) => (
              <div 
                key={index} 
                className="bg-white text-gray-800 rounded-xl p-8 md:p-10 shadow-2xl flex flex-col border border-gray-100 transition-transform hover:scale-[1.01] w-full" 
              >
                {/* Cabecera Tipo Botón Gris (Píldora flotante) */}
                <div className="bg-[#3e3e3e] text-center text-white rounded-full py-3 px-6 -mx-4 -mt-4 mb-8 font-semibold tracking-wide uppercase shadow-md text-sm md:text-base">
                  {paso.id} · {paso.title}
                </div>
                
                <div className="flex flex-col flex-grow">
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed text-left text-gray-700 font-medium">
                    {paso.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA - CAJA CYAN */}
      <section className="py-18 px-6 md:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="bg-[#0091A4] text-white rounded-[2rem] p-10 md:p-14 text-center shadow-2xl">
            <h3 className="text-2xl md:!text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Sin criterio, la visión es especulación. Sin visión, el criterio es solo historia.
            </h3>
            
            <p className="text-lg md:text-xl mb-10 opacity-95 max-w-4xl mx-auto font-medium leading-relaxed">
              Alaluf no reacciona al mercado — lo planifica. Estructuramos Club Deals con la estrategia de un 
              Family Office Inmobiliario: 45 años de criterio al servicio de tu próxima inversión.
            </p>

            <button className="bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-lg md:text-xl px-12 py-4 rounded-xl shadow-xl transition-all duration-300 active:scale-95">
              Quiero conocer las oportunidades
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClubDealsInversiones;