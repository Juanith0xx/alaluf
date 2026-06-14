import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- Importación añadida

// Importación de imágenes
import heroResidencial from '../assets/residencia.jpeg'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const Residencial = () => {
  const navigate = useNavigate();

  // ESTADOS PARA LOS SELECTORES DE LAS TARJETAS
  const [tipoComprar, setTipoComprar] = useState(1); 
  const [tipoArrendar, setTipoArrendar] = useState(2); 

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

  // MANEJADOR DE CLICS
  const handleSubservicioClick = (action) => {
    if (action === "COMPRAR") {
      navigate(`/buscar?tipo_prop=1A&obj=1`);
    } else if (action === "ARRENDAR") {
      navigate(`/buscar?tipo_prop=1A&obj=2`);
    } else if (action === "VENDER") {
      navigate("/#contacto");
    }
  };

  // Datos Estructurados (Schema Markup) adaptados para sector Residencial
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Asesoría Residencial",
    "description": "Expertos en compra, venta y arriendo de casas y departamentos en Santiago. Buscamos el equilibrio perfecto entre la emoción de vivir y la inteligencia de invertir.",
    "url": "https://alaluf.vercel.app/residencial", 
    //"image": "https://www.tudominio.cl/assets/residencia.jpeg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santiago",
      "addressRegion": "Región Metropolitana",
      "addressCountry": "CL"
    }
  };

  return (
    <>
      <Helmet>
        {/* Título y Descripción Básica */}
        <title>Venta y Arriendo de Casas y Departamentos | Asesoría Residencial</title>
        <meta name="description" content="Descubre las mejores opciones para comprar, arrendar o vender casas y departamentos en Santiago. Asesoría residencial experta para tu vida y patrimonio." />
        <meta name="keywords" content="venta de casas, arriendo de departamentos, comprar propiedad Santiago, vender casa, corredor de propiedades residencial, bienes raíces, inmobiliaria" />

        {/* URL Canónica */}
        <link rel="canonical" href="https://alaluf.vercel.app/residencial" />

        {/* Open Graph (Para vistas previas en Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:title" content="Asesoría Residencial | Venta y Arriendo de Casas y Deptos" />
        <meta property="og:description" content="Buscamos el equilibrio perfecto entre la emoción de vivir y la inteligencia de invertir. Encuentra tu próxima propiedad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alaluf.vercel.app/residencial" />
        {/* <meta property="og:image" content="https://www.tudominio.cl/assets/residencia.jpeg" /> */}

        {/* Twitter Cards (Para X / Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Asesoría Residencial | Compra, Venta y Arriendo" />
        <meta name="twitter:description" content="Los que viven mejor, eligieron mejor. Asesoría experta en el mercado residencial de Santiago." />
        {/* <meta name="twitter:image" content="https://www.tudominio.cl/assets/residencia.jpeg" /> */}

        {/* Inserción de Datos Estructurados JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main 
        className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed pt-28 sm:pt-32 md:pt-40" 
        style={{ backgroundImage: `url(${fondoMarmol})` }}
      >
        
        {/* SECCIÓN HERO RESIDENCIAL */}
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
          <img 
            src={heroResidencial} 
            alt="Casas y departamentos exclusivos en venta y arriendo en Santiago" // <-- Alt optimizado
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

        {/* SECCIÓN 3 SUBSERVICIOS */}
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
                  <div className="bg-[#3e3e3e] text-center text-white rounded-full py-3 px-6 -mx-4 -mt-4 mb-8 font-semibold tracking-wide uppercase shadow-md text-lg">
                    {subservicio.title}
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-left flex-grow mb-8 text-gray-600 font-medium">
                      {subservicio.description}
                    </p>
                    
                    {/* SELECTOR VISUAL INTEGRADO */}
                    {subservicio.title === "COMPRAR" && (
                      <div className="flex bg-gray-100/80 p-1.5 rounded-xl mb-6 shadow-inner border border-gray-200">
                        <button
                          onClick={() => setTipoComprar(1)}
                          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${tipoComprar === 1 ? "bg-white text-[#0091A4] shadow-md" : "text-gray-500 hover:text-gray-700"}`}
                        >
                          Casas
                        </button>
                        <button
                          onClick={() => setTipoComprar(2)}
                          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${tipoComprar === 2 ? "bg-white text-[#0091A4] shadow-md" : "text-gray-500 hover:text-gray-700"}`}
                        >
                          Departamentos
                        </button>
                      </div>
                    )}

                    {subservicio.title === "ARRENDAR" && (
                      <div className="flex bg-gray-100/80 p-1.5 rounded-xl mb-6 shadow-inner border border-gray-200">
                        <button
                          onClick={() => setTipoArrendar(1)}
                          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${tipoArrendar === 1 ? "bg-white text-[#0091A4] shadow-md" : "text-gray-500 hover:text-gray-700"}`}
                        >
                          Casas
                        </button>
                        <button
                          onClick={() => setTipoArrendar(2)}
                          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${tipoArrendar === 2 ? "bg-white text-[#0091A4] shadow-md" : "text-gray-500 hover:text-gray-700"}`}
                        >
                          Departamentos
                        </button>
                      </div>
                    )}
                    
                    {/* Espaciador para la tarjeta de Vender para que mantenga la misma altura */}
                    {subservicio.title === "VENDER" && <div className="h-[52px] mb-6"></div>}
                    
                    <div className="text-left mt-auto">
                      <button 
                        onClick={() => handleSubservicioClick(subservicio.title)}
                        className={`${subservicio.buttonColor} text-white hover:brightness-110 font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition duration-300 active:scale-95 w-full md:w-auto`}
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
    </>
  );
};

export default Residencial;