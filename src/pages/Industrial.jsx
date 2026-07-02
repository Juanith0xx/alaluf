import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 

// Importación de imágenes
import fondoIndustrial from '../assets/industria.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const Industrial = () => {
  const navigate = useNavigate();
  
  // Estado para manejar la operación seleccionada ('arrendar' o 'comprar')
  const [operacion, setOperacion] = useState('arrendar');

  const handleVerPropiedades = () => {
    const objCodigo = operacion === 'comprar' ? '1' : '2';
    navigate(`/buscar?tipo_prop=7A&obj=${objCodigo}`);
  };

  // Datos Estructurados (Schema Markup) para mejorar cómo Google lee tu página
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Inteligencia Industrial",
    "description": "Especialistas en venta y arriendo de bodegas, galpones y centros logísticos analizados desde la operación.",
    "url": "https://alaluf.cl/industrial",
    //"image": "https://www.tudominio.cl/assets/industria.png", 
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CL" 
    } // <--- ¡AQUÍ ESTABA EL ERROR! Faltaba cerrar esta llave
  };

  return (
    <>
      <Helmet>
        {/* Título y Descripción Básica */}
        <title>Venta y Arriendo de Propiedades Industriales | Bodegas y Galpones</title>
        <meta name="description" content="Encuentra la propiedad industrial ideal. Especialistas en venta y arriendo de bodegas, galpones y centros logísticos para maximizar la rentabilidad de tu negocio." />
        <meta name="keywords" content="propiedades industriales, venta de bodegas, arriendo de galpones, centros logísticos, bienes raíces industriales, inversión inmobiliaria" />

        {/* URL Canónica (Obligatorio para buen SEO) */}
        <link rel="canonical" href="https://alaluf.cl/industrial" />

        {/* Open Graph (Para vistas previas en Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:title" content="Propiedades Industriales: Bodegas y Galpones" />
        <meta property="og:description" content="Analizamos accesos, flujos y normativa para que tu próxima bodega sea una ventaja competitiva." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alaluf.cl/industrial" />
        {/*<meta property="og:image" content="https://www.tudominio.cl/assets/industria.png" /> */}

        {/* Twitter Cards (Para X / Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Inteligencia Industrial | Arriendo y Venta" />
        <meta name="twitter:description" content="No busques bodegas. Busca la operación correcta. Encuentra el centro logístico que tu negocio necesita." />
        {/* <meta name="twitter:image" content="https://www.tudominio.cl/assets/industria.png" /> */}

        {/* Inserción de Datos Estructurados JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Se agregó 'pt-28 sm:pt-32 md:pt-40' para compensar el navbar fijo */}
      <main 
        className="w-full min-h-screen bg-cover bg-center bg-fixed font-[Outfit] pt-28 sm:pt-32 md:pt-40"
        style={{ backgroundImage: `url(${fondoMarmol})` }}
      >
        
        {/* SECCIÓN HERO */}
        <section className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden border-b border-white/10">
          <img 
            src={fondoIndustrial} 
            alt="Bodega industrial para venta y arriendo" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
          
          <div 
            className="absolute z-20 w-[90%] sm:w-auto"
            style={{ left: '8%', bottom: '35%' }}
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
    </>
  );
};

export default Industrial;