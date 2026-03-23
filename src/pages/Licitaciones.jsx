import React from 'react';

// Importación de imágenes
import fondoLicitaciones from '../assets/licitaciones.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

const Licitaciones = () => {
  const comparativaLicitacion = [
    "Plazo definido",
    "Plan de marketing específico",
    "Precio mínimo establecido",
    "Máxima competencia entre compradores"
  ];

  const comparativaVentaDirecta = [
    "Sin plazo fijo",
    "Plan de marketing general",
    "Ofertas desde precio hacia abajo",
    "Mayor flexibilidad en el proceso"
  ];

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        {/* Imagen de fondo principal */}
        <img 
          src={fondoLicitaciones} 
          alt="Fondo Licitaciones" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        
        {/* Gradiente oscuro inferior (Ajustado para legibilidad del título) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        
        {/* CONTENEDOR DEL TÍTULO POR PORCENTAJE */}
        <div 
          className="absolute z-20 w-auto"
          style={{ 
            left: '8%',    // Mueve horizontalmente (Aumenta para ir a la derecha)
            bottom: '38%', // Mueve verticalmente (Aumenta para ir hacia arriba)
          }}
        >
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg">
            LICITACIONES
          </h1>
        </div>
      </section>

      {/* SECCIÓN TEXTO INTRODUCTORIO */}
      <section className="container mx-auto px-6 py-16 md:py-24 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          Acceso a Oportunidades Exclusivas
        </h2>
        <p className="text-[#0091A4] text-xl font-semibold mb-10">
          Los mejores activos no se publican. Se consiguen.
        </p>
        <div className="space-y-6 text-gray-200 max-w-5xl mx-auto leading-relaxed text-base md:text-lg drop-shadow-sm">
          <p>
            Terrenos, edificios y activos de alto valor que no llegan al mercado abierto. En 45 años hemos
            estructurado y ganado las licitaciones más complejas de Chile — con el respaldo, la red y el criterio que
            cada operación exige.
          </p>
          <p>
            La licitación no es solo una forma de vender — es la forma más inteligente de hacerlo. Es un proceso
            transparente, con plazo definido y un objetivo claro: maximizar el valor de tu activo. Puedes licitar
            cualquier tipo de propiedad y en 4 a 7 meses tienes el negocio cerrado.
          </p>
        </div>
      </section>

      {/* SECCIÓN COMPARATIVA */}
      <section className="py-2 px-6 md:px-20">
        <div className="container mx-auto max-w-7xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white uppercase tracking-wider mb-12 drop-shadow-md">
            LA DIFERENCIA ENTRE UNA LICITACIÓN VERSUS VENTA DIRECTA:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Tarjeta LICITACIÓN */}
            <div className="bg-white text-gray-800 rounded-xl p-8 md:p-10 shadow-2xl flex flex-col border border-gray-100">
              <div className="bg-[#3e3e3e] text-center text-white rounded-full py-3 px-6 -mx-4 -mt-4 mb-8 font-semibold tracking-wide uppercase shadow-md">
                LICITACIÓN
              </div>
              <ul className="space-y-4 text-base md:text-lg list-disc list-inside marker:text-[#0091A4]">
                {comparativaLicitacion.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
            {/* Tarjeta VENTA DIRECTA */}
            <div className="bg-white text-gray-800 rounded-xl p-8 md:p-10 shadow-2xl flex flex-col border border-gray-100">
              <div className="bg-[#3e3e3e] text-center text-white rounded-full py-3 px-6 -mx-4 -mt-4 mb-8 font-semibold tracking-wide uppercase shadow-md">
                VENTA DIRECTA
              </div>
              <ul className="space-y-4 text-base md:text-lg list-disc list-inside marker:text-[#0091A4]">
                {comparativaVentaDirecta.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="py-16 px-6 md:px-20">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#0091A4] text-center text-white rounded-2xl p-10 md:p-14 flex flex-col items-center shadow-2xl transition-transform hover:scale-[1.01]">
            <h4 className="text-3xl md:text-4xl font-medium mb-4">Accede antes que el mercado</h4>
            <p className="text-lg md:text-xl font-medium max-w-4xl mb-10">
              Recibe oportunidades de licitación que no se publican abiertamente. Solo para inversionistas calificados.
            </p>
            <a href="#" className="bg-white text-[#0091A4] hover:bg-gray-100 font-bold text-lg px-12 py-4 rounded-xl shadow-md transition duration-300 active:scale-95">
              Quiero acceder
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Licitaciones;