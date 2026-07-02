import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- Importación añadida

// Importación de imágenes
import fondoterreno from '../assets/terreno_proyecto.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const TerrenoProyecto = () => {
  const navigate = useNavigate();
  
  // Estado para manejar la operación seleccionada ('arrendar' o 'comprar')
  const [operacion, setOperacion] = useState('arrendar');

  const handleVerPropiedades = () => {
    // Mapeamos el código de objetivo (obj=1 Comprar/Venta, obj=2 Arrendar)
    const objCodigo = operacion === 'comprar' ? '1' : '2';
    
    // Se cambia '7A' por '6A' para que coincida con el ID de "Terreno Proyectos" de tu dataset original
    navigate(`/buscar?tipo_prop=6A&obj=${objCodigo}`);
  };

  // Datos Estructurados (Schema Markup) adaptados para Terrenos
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Inteligencia en Terrenos",
    "description": "Asesoría especializada en venta y arriendo de terrenos para proyectos inmobiliarios. Analizamos normativas, CIP y constructibilidad.",
    "url": "https://alaluf.cl/terrenos", // ⚠️ CAMBIA ESTO por tu URL real
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CL" 
    }
  };

  return (
    <>
      <Helmet>
        {/* Título y Descripción Básica */}
        <title>Venta y Arriendo de Terrenos para Proyectos | Desarrollo Inmobiliario</title>
        <meta name="description" content="Encuentra terrenos con alto potencial de desarrollo. Analizamos normativas, constructibilidad y plusvalía para la compra o arriendo de terrenos para tu proyecto." />
        <meta name="keywords" content="terrenos para proyectos, venta de terrenos, arriendo de terrenos, desarrollo inmobiliario, constructibilidad, normativas urbanísticas, CIP, inversión inmobiliaria" />

        {/* URL Canónica */}
        <link rel="canonical" href="https://alaluf.cl/terrenos_proyectos" />

        {/* Open Graph (Para vistas previas en Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:title" content="Terrenos para Proyectos: Potencial de Desarrollo" />
        <meta property="og:description" content="No busques solo metros cuadrados. Analizamos normativas y constructibilidad para que tu terreno sea la base de un gran proyecto." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alaluf.cl/terrenos_proyectos" />
        {/* <meta property="og:image" content="https://www.tudominio.cl/assets/terreno_proyecto.png" /> /*}

        {/* Twitter Cards (Para X / Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Inteligencia en Terrenos | Arriendo y Venta" />
        <meta name="twitter:description" content="Te ayudamos a ver el potencial y las restricciones urbanísticas de un terreno antes de invertir." />
        <meta name="twitter:image" content="https://alaluf.cl/terrenos_proyectos" />

        {/* Inserción de Datos Estructurados JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* SE APLICÓ 'pt-28 sm:pt-32 md:pt-40' PARA COMPENSAR LA BARRA DE NAVEGACIÓN FIJA */}
      <main 
        className="w-full min-h-screen bg-cover bg-center bg-fixed font-[Outfit] pt-28 sm:pt-32 md:pt-40"
        style={{ backgroundImage: `url(${fondoMarmol})` }}
      >
        
        {/* SECCIÓN HERO */}
        <section className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden border-b border-white/10">
          {/* Imagen de fondo principal */}
          <img 
            src={fondoterreno} 
            alt="Terrenos disponibles para proyectos inmobiliarios y desarrollo" // <-- Alt optimizado
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
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase drop-shadow-lg leading-none">
              TERRENOS PARA PROYECTOS
            </h1>
          </div>
        </section>

        {/* SECCIÓN TEXTO INTRODUCTORIO */}
        <section className="container mx-auto px-4 sm:px-6 py-12 md:py-20 max-w-7xl text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
            Inteligencia en Terrenos
          </h2>
          <p className="text-[#0091A4] text-sm sm:text-base md:text-xl font-semibold mb-10 max-w-5xl mx-auto leading-relaxed px-2 text-justify sm:text-center">
            Un terreno no vale por lo que es hoy, sino por lo que puede llegar a ser. Te ayudamos a ver su potencial y sus restricciones urbanísticas, porque ni lo más grande ni lo más barato define la verdadera oportunidad para tu proyecto.
          </p>
        </section>

        {/* BANNER CTA */}
        <section className="py-12 md:py-16 px-4 sm:px-6 md:px-20">
          <div className="container mx-auto max-w-7xl mb-4">
            <div className="bg-[#0091A4] text-center text-white rounded-2xl p-6 sm:p-10 md:p-14 flex flex-col items-center shadow-2xl transition-transform hover:scale-[1.01]">
              <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 leading-snug">
                No busques solo metros cuadrados. Busca potencial de desarrollo.
              </h4>
              <p className="text-sm sm:text-base md:text-xl font-medium max-w-4xl mb-8 leading-relaxed px-2">
                Normativas, CIP, constructibilidad, plusvalía. Lo analizamos todo para que tu terreno no sea solo tierra, sino la base de un gran proyecto.
              </p>
              
              {/* SELECTOR DE PESTAÑAS (COMPRAR / ARRENDAR) */}
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
                Ver terrenos para proyecto
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TerrenoProyecto;