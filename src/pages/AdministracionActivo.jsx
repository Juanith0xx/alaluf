import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Importación para navegar
import { Helmet } from 'react-helmet-async'; // <-- Importación para SEO

// Importación de imágenes
import heroAdmin from '../assets/admin_activos.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const AdministracionActivo = () => {
  const navigate = useNavigate(); // <-- Inicializamos el hook de navegación

  const caracteristicas = [
    "REPORTE MENSUAL",
    "GESTIÓN SIN FRICCIÓN",
    "ARRENDATARIO CORRECTO"
  ];

  // Datos Estructurados (Schema Markup) enfocados en Administración de Propiedades
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Administración de Arriendos y Activos",
    "description": "Administramos tu propiedad. Selección de arrendatario correcto, contrato blindado, cobros a tiempo y reporte mensual sin vacancia innecesaria.",
    "url": "https://alaluf.cl/administracion", // ⚠️ CAMBIA ESTO por tu URL real
    //"image": "https://www.tudominio.cl/assets/admin_activos.png", // ⚠️ CAMBIA ESTO
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CL"
    }
  };

  return (
    <>
      <Helmet>
        {/* Título y Descripción Básica */}
        <title>Administración de Arriendos y Propiedades | Gestión de Activos</title>
        <meta name="description" content="Garantizamos que tu activo rente. Nos encargamos de todo: arrendatario correcto, contrato, cobros y reportes mensuales. Tu propiedad renta, tú descansas." />
        <meta name="keywords" content="administración de arriendos, administración de propiedades, corredora de propiedades, gestión de activos inmobiliarios, rentabilidad, arrendamiento" />

        {/* URL Canónica */}
        <link rel="canonical" href="https://alaluf.cl/administracion" />

        {/* Open Graph */}
        <meta property="og:title" content="Administración de Propiedades: Tú descansas" />
        <meta property="og:description" content="Rentabilidad asegurada con tranquilidad incluida. Administramos tu propiedad sin fricción." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alaluf.cl/administracion" />
        {/* <meta property="og:image" content="https://www.tudominio.cl/assets/admin_activos.png" /> */}

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Administración de Arriendos | Gestión Integral" />
        <meta name="twitter:description" content="Nos encargamos de todo: selección de arrendatario, contrato, cobros y reportes." />
        {/* <meta name="twitter:image" content="https://www.tudominio.cl/assets/admin_activos.png" /> */}

        {/* Datos Estructurados */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Aplicada la tipografía Outfit y compensación superior para el menú fijo */}
      <main 
        className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed pt-28 sm:pt-32 md:pt-40" 
        style={{ backgroundImage: `url(${fondoMarmol})` }}
      >
        
        {/* SECCIÓN HERO - ADMINISTRACIÓN DE ACTIVOS */}
        <section className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden border-b border-white/10">
          <img 
            src={heroAdmin} 
            alt="Servicio de administración de arriendos y activos inmobiliarios" // <-- Alt optimizado
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          
          <div 
            className="absolute z-20 w-[90%] sm:w-auto"
            style={{ left: '8%', bottom: '35%' }}
          >
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase drop-shadow-lg leading-none">
              ADMINISTRACIÓN DE ACTIVOS
            </h1>
          </div>
        </section>

        {/* SECCIÓN CONTENIDO CENTRAL */}
        <section className="container mx-auto px-4 sm:px-6 py-10 md:py-16 max-w-7xl text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Administración de Arriendos
          </h2>
          
          <p className="text-[#0091A4] text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 md:mb-8 max-w-5xl mx-auto px-2">
            Garantizamos que tu activo rente. Rentabilidad asegurada con tranquilidad incluida.
          </p>

          <div className="space-y-6 text-white max-w-4xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-sm px-2 text-justify sm:text-center">
            <p>
              Administramos tu propiedad como si fuera nuestra. Arrendatario correcto, 
              contrato blindado, cobros a tiempo y reporte mensual. Sin llamadas 
              innecesarias, sin sorpresas y sin vacancia innecesaria.
            </p>
          </div>

          {/* ETIQUETAS DE CARACTERÍSTICAS (Pills Blancas) */}
          <div className="flex flex-wrap justify-center gap-4 mt-10 md:mt-14 px-2">
            {caracteristicas.map((item, index) => (
              <div 
                key={index}
                className="bg-white text-black font-bold px-8 sm:px-12 py-3 rounded-xl shadow-lg text-xs sm:text-sm md:text-base tracking-wide whitespace-nowrap"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* BANNER CTA - CAJA CYAN */}
        <section className="pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mx-auto w-full max-w-5xl">
            <div className="bg-[#0091A4] text-white rounded-[2rem] p-6 sm:p-10 md:p-14 text-center shadow-2xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Tu propiedad renta. Tú descansas.
              </h3>
              
              <p className="text-base sm:text-lg lg:text-2xl mb-8 sm:mb-10 opacity-95 max-w-4xl mx-auto font-medium px-2 leading-relaxed">
                Nos encargamos de todo: selección de arrendatario, contrato, cobros y reportes. 
                Sin vacancia, sin sorpresas, sin que tengas que intervenir.
              </p>

              {/* 🌟 BOTÓN CON NAVEGACIÓN A /vender */}
              <button 
                onClick={() => navigate('/vender')} 
                className="w-full sm:w-fit bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-base md:text-xl px-8 sm:px-12 py-3.5 md:py-4 rounded-xl shadow-xl transition-all duration-300 active:scale-95"
              >
                Administrar mi propiedad
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdministracionActivo;