import React from 'react';
import { Helmet } from 'react-helmet-async'; // <-- Importación para SEO añadida

// Importación de imágenes
import heroTasacion from '../assets/tasacion.png'; 
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

  // Datos Estructurados (Schema Markup) enfocados en el servicio de Tasación
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Tasación de Activos Inmobiliarios - Alaluf",
    "description": "Tasamos tu activo con criterio de mercado real: ubicación, plusvalía y comparables. Conoce el precio justo antes de vender, comprar o invertir.",
    "url": "https://alaluf.vercel.app//tasacion", // ⚠️ CAMBIA ESTO por tu URL real
    //"image": "https://www.tudominio.cl/assets/tasacion.png", // ⚠️ CAMBIA ESTO por tu URL absoluta
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CL"
    }
  };

  return (
    <>
      <Helmet>
        {/* Título y Descripción Básica */}
        <title>Tasación de Activos Inmobiliarios | Conoce el Valor Real</title>
        <meta name="description" content="Una tasación precisa es la base de cualquier decisión inteligente. Valoramos tu propiedad inmobiliaria con comparables reales y contexto de mercado." />
        <meta name="keywords" content="tasación de activos, tasación inmobiliaria, tasar propiedad, calcular valor de casa, tasar departamento, precio de mercado inmobiliario, tasadores" />

        {/* URL Canónica */}
        <link rel="canonical" href="https://alaluf.vercel.app/tasacion" />

        {/* Open Graph (Para redes sociales y WhatsApp) */}
        <meta property="og:title" content="Tasación de Activos: No decidas sin saber cuánto vale" />
        <meta property="og:description" content="Para que vendas, arriendes o inviertas desde una posición informada. Tasamos tu activo con criterio profesional." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alaluf.vercel.app/tasacion" />
        {/* <meta property="og:image" content="https://www.tudominio.cl/assets/tasacion.png" /> */}

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tasación Inmobiliaria Profesional" />
        <meta name="twitter:description" content="Conoce el precio justo antes de publicar, comprar o invertir. Ni un peso menos de lo que vale." />
        {/* <meta name="twitter:image" content="https://www.tudominio.cl/assets/tasacion.png" /> /*}

        {/* Inserción de Datos Estructurados JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main 
        className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed pt-28 sm:pt-32 md:pt-40" 
        style={{ backgroundImage: `url(${fondoMarmol})` }}
      >
        
        {/* SECCIÓN HERO - TASACIÓN DE ACTIVOS */}
        <section className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden border-b border-white/10">
          <img 
            src={heroTasacion} 
            alt="Servicio profesional de tasación de activos inmobiliarios" // <-- Alt optimizado
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
              TASACIÓN DE ACTIVOS
            </h1>
          </div>
        </section>

        {/* SECCIÓN TEXTO INTRODUCTORIO */}
        <section className="container mx-auto px-4 sm:px-6 py-10 md:py-16 max-w-7xl text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md">
            Tasación de Activos
          </h2>
          <p className="text-[#0091A4] text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-8 md:mb-10 px-2">
            Antes de decidir, necesitas saber cuánto vale realmente.
          </p>
          
          <div className="space-y-6 text-white max-w-5xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-sm px-2 text-justify sm:text-center">
            <p>
              Una tasación precisa no es un trámite, es la base de cualquier decisión inmobiliaria inteligente. 
              Valoramos tu activo con criterio de mercado real: ubicación, plusvalía, comparables reales y 
              contexto actual. Para que vendas, arriendes o inviertas desde una posición informada, no de intuición.
            </p>
            <p className="italic text-gray-300 sm:pl-6 py-2 my-6 sm:my-8 border-l-0 sm:border-l-2 border-[#0091A4]">
              “Con tasas hipotecarias en 4,3% — las más bajas en años — y el mercado reactivándose, 
              saber el valor real de tu activo no es un trámite. Es tu ventaja competitiva.”
            </p>
            <p className="text-xs text-gray-400 font-normal">
              Fuente: Banco Central de Chile, Informe Estadísticas Monetarias y Financieras, agosto 2025.
            </p>
          </div>
        </section>

        {/* SECCIÓN 3 RAZONES - CARDS ANCHAS */}
        <section className="py-8 md:py-12 px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white uppercase tracking-wider mb-8 md:mb-12 drop-shadow-md px-2 leading-snug">
              3 RAZONES PARA TASAR CON ALALUF:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full max-w-6xl mx-auto">
              {razones.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white text-gray-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between border border-gray-100 transition-transform hover:scale-[1.01] w-full" 
                >
                  <div>
                    {/* Cabecera Tipo Botón Gris reestructurada sin bordes cortantes */}
                    <div className="bg-[#404040] text-center text-white rounded-xl py-3 px-4 mb-6 font-bold tracking-wider uppercase text-sm sm:text-base shadow-sm">
                      {item.title}
                    </div>
                    
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-left text-gray-700 font-medium">
                      {item.description}
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
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-snug">
                No decidas sin saber cuánto vale
              </h3>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-2xl mb-8 sm:mb-10 opacity-95 max-w-4xl mx-auto font-medium px-2 leading-relaxed">
                Tasamos tu activo con comparables reales, contexto de mercado y criterio profesional. 
                Para que vendas, arriendes o inviertas con los números claros.
              </p>

              <button className="w-full sm:w-fit bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-base md:text-xl px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl shadow-xl transition-all duration-300 active:scale-95">
                Tasar mi activo
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TasacionActivos;