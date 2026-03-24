import React from 'react';

// Importación de imágenes
import heroNosotros from '../assets/nosotros.png'; // Reemplazar con la ruta real de la imagen de las manos
import fondoMarmol from '../assets/Marmol.jpg'; 

const Nosotros = () => {
  const pilares = [
    {
      id: "01",
      title: "ORIGEN Y FORMA DE TRABAJO",
      content: "Alaluf nació como una empresa familiar y sigue siéndolo. Porque creemos que la mejor forma de cuidar el patrimonio de nuestros clientes es tratarlo exactamente como tratamos el nuestro: con criterio, con visión de largo plazo y con la responsabilidad de quien sabe que cada decisión importa."
    },
    {
      id: "02",
      title: "TRAYECTORIA Y EXPERTISE",
      content: "En 45 años hemos visto cómo el mercado inmobiliario chileno cambia de ciclo, cómo llegan y van las tendencias, cómo aparecen nuevos actores y desaparecen otros. Nosotros seguimos aquí. Porque conocemos el mercado en profundidad, hemos construido relaciones que duran décadas y hemos cerrado las operaciones más complejas del mercado con éxito."
    },
    {
      id: "03",
      title: "EQUIPO Y COMPROMISO",
      content: "Detrás de cada operación hay personas que conocen su área con profundidad y que entienden que su rol no es mostrarte propiedades — sino acompañarte a tomar la mejor decisión. Eso es lo que somos. Una familia que lleva 45 años haciendo bien lo que sabe hacer — y que no necesitó volverse franquicia para probarlo."
    }
  ];

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed" 
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO - NOSOTROS */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        <img 
          src={heroNosotros} 
          alt="Equipo Alaluf" 
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
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg">
            NOSOTROS
          </h1>
        </div>
      </section>

      {/* SECCIÓN INTRODUCCIÓN */}
      <section className="container mx-auto px-6 py-16 md:py-24 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:!text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md uppercase tracking-wider">
          POR QUÉ ELEGIRNOS
        </h2>
        <p className="text-[#0091A4] text-lg md:text-xl lg:text-2xl font-bold mb-10">
          45 años cuidando el patrimonio de otros como si fuera nuestro.
        </p>
      </section>

      {/* SECCIÓN 3 PILARES - CARDS CON CABECERA CYAN INTEGRADA */}
      <section className="pb-20 px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
            {pilares.map((pilar, index) => (
              <div 
                key={index} 
                className="bg-white text-gray-800 rounded-2xl flex flex-col shadow-2xl transition-transform hover:scale-[1.01] border border-white/20 w-full overflow-hidden" 
              >
                {/* Cabecera INTEGRADA en Color Cyan */}
                <div className="bg-[#0091A4] text-center text-white py-4 px-6 font-bold tracking-widest uppercase text-sm md:text-base">
                  {pilar.id} · {pilar.title}
                </div>
                
                {/* Cuerpo de la tarjeta */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col flex-grow">
                  <p className="text-base md:text-lg leading-relaxed text-left text-gray-700 font-medium">
                    {pilar.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER FINAL - EQUIPO */}
      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="bg-[#0091A4] text-white rounded-[2rem] p-10 md:p-14 text-center shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              El equipo detrás de cada decisión
            </h3>
            
            <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto font-medium leading-relaxed">
              En Alaluf, cada operación es acompañada por profesionales con experiencia, 
              criterio y conocimiento profundo del mercado. <br className="hidden md:block" />
              Más que intermediar, nuestro equipo asesora y resguarda cada decisión con la seriedad que implica.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Nosotros;