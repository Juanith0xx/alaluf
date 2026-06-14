import React from 'react';
import { Helmet } from 'react-helmet-async'; // <-- Importación para SEO añadida

// Importación de imágenes
import heroClubDeals from '../assets/clud_inversiones.png'; 
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

  // Datos Estructurados (Schema Markup) enfocados en Servicios de Inversión Inmobiliaria
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService", // Cambiamos a FinancialService para darle más peso a la "Inversión"
    "name": "Club Deals e Inversión Inmobiliaria - Alaluf",
    "description": "Accede a activos inmobiliarios de alto valor en Chile mediante Club Deals estructurados. Oportunidades pre-market y off-market para inversionistas.",
    "url": "https://alaluf.vercel.app/club_deals_inversiones", // ⚠️ CAMBIA ESTO por tu URL real
    //"image": "https://www.tudominio.cl/assets/clud_inversiones.png", // ⚠️ CAMBIA ESTO por tu URL absoluta
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CL"
    },
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Alaluf Inmobiliaria"
    }
  };

  return (
    <>
      <Helmet>
        {/* Título y Descripción Básica */}
        <title>Club Deals e Inversión Inmobiliaria | Alaluf Family Office</title>
        <meta name="description" content="Invierte en activos inmobiliarios de alto valor en Chile a través de nuestros Club Deals. Accede a oportunidades off-market en industrial, multifamily y retail." />
        <meta name="keywords" content="club deals inmobiliarios, inversión inmobiliaria Chile, oportunidades off-market, family office inmobiliario, inversión multifamily, activos de alto valor, Alaluf" />

        {/* URL Canónica */}
        <link rel="canonical" href="https://alaluf.vercel.app/club_deals_inversiones" />

        {/* Open Graph (Para LinkedIn, WhatsApp y otras redes) */}
        <meta property="og:title" content="Club Deals e Inversiones | Alaluf Inmobiliaria" />
        <meta property="og:description" content="Los grandes activos no se compran solos, se estructuran. Únete a nuestro grupo selecto de inversionistas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alaluf.vercel.app/club_deals_inversiones" />
        {/* <meta property="og:image" content="https://www.tudominio.cl/assets/clud_inversiones.png" /> */}

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Inversión Inmobiliaria Estratégica" />
        <meta name="twitter:description" content="Estructuramos, gestionamos y protegemos cada etapa de tu inversión inmobiliaria." />
        {/* <meta name="twitter:image" content="https://www.tudominio.cl/assets/clud_inversiones.png" /> */}

        {/* Inserción de Datos Estructurados JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main 
        className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed pt-28 sm:pt-32 md:pt-40" 
        style={{ backgroundImage: `url(${fondoMarmol})` }}
      >
        
        {/* SECCIÓN HERO - CLUB DEALS E INVERSIONES */}
        <section className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden border-b border-white/10">
          <img 
            src={heroClubDeals} 
            alt="Grupo de inversionistas estructurando un Club Deal Inmobiliario" // <-- Alt optimizado
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          
          <div 
            className="absolute z-20 w-[90%] sm:w-auto"
            style={{ 
              left: '8%',    
              bottom: '35%', 
            }}
          >
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase drop-shadow-lg leading-none">
              CLUB DEALS E INVERSIONES
            </h1>
          </div>
        </section>

        {/* SECCIÓN TEXTO INTRODUCTORIO */}
        <section className="container mx-auto px-4 sm:px-6 py-10 md:py-16 max-w-7xl text-center relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 drop-shadow-md">
            Club Deals e Inversionistas
          </h2>
          <p className="text-[#0091A4] text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-8 md:mb-10 px-2">
            Los grandes activos no se compran solos. Se estructuran.
          </p>
          
          <div className="space-y-6 text-white max-w-5xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-sm px-2 text-justify sm:text-center">
            <p>
              Un Club Deal inmobiliario permite acceder a activos de alto valor que individualmente están 
              fuera del alcance — dividiendo la inversión entre un grupo selecto de inversionistas, con Alaluf 
              estructurando, gestionando y protegiendo cada etapa del proceso.
            </p>
            <p className="italic text-gray-300 sm:pl-6 py-2 my-6 sm:my-8 border-l-0 sm:border-l-2 border-[#0091A4]">
              "El 86% de la inversión inmobiliaria en Chile en 2025 se concentra en activos industriales, 
              multifamily y retail" — los mismos segmentos donde Alaluf lleva 45 años operando.
            </p>
            <p className="text-xs text-gray-400 font-normal">
              Fuente: ACAFI · Reporte Inmobiliario 2025.
            </p>
          </div>
        </section>

        {/* SECCIÓN CÓMO FUNCIONA - CARDS ANCHAS */}
        <section className="py-8 md:py-12 px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white uppercase tracking-wider mb-8 md:mb-12 drop-shadow-md px-2 leading-snug">
              CÓMO FUNCIONA EN TRES PASOS:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full max-w-6xl mx-auto">
              {pasos.map((paso, index) => (
                <div 
                  key={index} 
                  className="bg-white text-gray-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between border border-gray-100 transition-transform hover:scale-[1.01] w-full" 
                >
                  <div>
                    <div className="bg-[#404040] text-center text-white rounded-xl py-3 px-4 mb-6 font-bold tracking-wider uppercase text-xs sm:text-sm shadow-sm">
                      {paso.id} · {paso.title}
                    </div>
                    
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-left text-gray-700 font-medium">
                      {paso.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BANNER CTA - CAJA CYAN */}
        <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mx-auto w-full max-w-5xl">
            <div className="bg-[#0091A4] text-white rounded-[2rem] p-6 sm:p-10 md:p-14 text-center shadow-2xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-snug">
                Sin criterio, la visión es especulación. Sin visión, el criterio es solo historia.
              </h3>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 opacity-95 max-w-4xl mx-auto font-medium px-2 leading-relaxed">
                Alaluf no reacciona al mercado — lo planifica. Estructuramos Club Deals con la estrategia de un 
                Family Office Inmobiliario: 45 años de criterio al servicio de tu próxima inversión.
              </p>

              <button className="w-full sm:w-fit bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-base md:text-xl px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl shadow-xl transition-all duration-300 active:scale-95">
                Quiero conocer las oportunidades
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ClubDealsInversiones;