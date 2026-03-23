import React from 'react';

// Importación de imágenes
import heroAdmin from '../assets/admin_activos.png'; // Reemplazar con la ruta real de la imagen de las llaves
import fondoMarmol from '../assets/Marmol.jpg'; 

const AdministracionActivo = () => {
  const caracteristicas = [
    "REPORTE MENSUAL",
    "GESTIÓN SIN FRICCIÓN",
    "ARRENDATARIO CORRECTO"
  ];

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed" 
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO - ADMINISTRACIÓN DE ACTIVOS */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        <img 
          src={heroAdmin} 
          alt="Administración de Activos" 
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
            ADMINISTRACIÓN DE ACTIVOS
          </h1>
        </div>
      </section>

      {/* SECCIÓN CONTENIDO CENTRAL */}
      <section className="container mx-auto px-6 py-16 md:py-24 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Administración de Arriendos
        </h2>
        
        <p className="text-[#0091A4] text-lg md:text-xl lg:text-2xl font-bold mb-8 max-w-5xl mx-auto">
          Garantizamos que tu activo rente. Rentabilidad asegurada con tranquilidad incluida.
        </p>

        <div className="space-y-6 text-white max-w-4xl mx-auto leading-relaxed text-base md:text-lg lg:text-xl font-medium drop-shadow-sm">
          <p>
            Administramos tu propiedad como si fuera nuestra. Arrendatario correcto, <br></br>
            contrato blindado, cobros a tiempo y reporte mensual. Sin llamadas<br></br> 
            innecesarias, sin sorpresas, sin vacancia innecesaria.
          </p>
        </div>

        {/* ETIQUETAS DE CARACTERÍSTICAS (Pills Blancas) */}
        <div className="flex flex-wrap justify-center gap-5 mt-12 md:mt-16">
          {caracteristicas.map((item, index) => (
            <div 
              key={index}
              className="bg-white text-black font-bold px-14 py-3 rounded-xl shadow-lg text-sm md:text-base tracking-wide"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* BANNER CTA - CAJA CYAN */}
      <section className="pb-24 px-6 md:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="bg-[#0091A4] text-white rounded-[2rem] p-10 md:p-14 text-center shadow-2xl">
            <h3 className="!text-4xl md:text-4xl lg:text-5xl font-bold mb-6">
              Tu propiedad renta. Tú descansas.
            </h3>
            
            <p className="text-lg md:!text-lg lg:text-2xl mb-10 opacity-95 max-w-4xl mx-auto font-medium">
              Nos encargamos de todo: selección de arrendatario, contrato, cobros y reportes. 
              Sin vacancia, sin sorpresas, sin que tengas que intervenir.
            </p>

            <button className="bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-lg md:text-xl px-12 py-4 rounded-xl shadow-xl transition-all duration-300 active:scale-95">
              Administrar mi propiedad
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdministracionActivo;