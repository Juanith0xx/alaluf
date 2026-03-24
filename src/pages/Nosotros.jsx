import React from 'react';

// Importación de imágenes
import heroNosotros from '../assets/nosotros.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 

// Importación de fotos del equipo
import jackImage from '../assets/equipo/Jack_Alaluf2.png';
import alejandraImage from '../assets/equipo/Ale_Alaluf.png';
import leonorImage from '../assets/equipo/Leonor-Alvo.png';
import natalieImage from '../assets/equipo/Natalie-Alaluf2.png';
import danielImage from '../assets/equipo/DanielT.png';

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

  const teamMembers = [
    { name: "Jack Alaluf", title: "Director Ejecutivo", image: jackImage },
    { name: "Alejandra Alaluf", title: "Gerente General", image: alejandraImage },
    { name: "Leonor Alvo", title: "Directora", image: leonorImage },
    { name: "Natalie Alaluf", title: "Gerente Industrial", image: natalieImage },
    { name: "Daniel Troncoso", title: "Director Ejecutivo", image: danielImage },
  ];

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed" 
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden border-b border-white/10">
        <img src={heroNosotros} alt="Equipo Alaluf" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute z-20 w-auto" style={{ left: '8%', bottom: '38%' }}>
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

      {/* SECCIÓN 3 PILARES */}
      <section className="pb-20 px-6 md:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
            {pilares.map((pilar, index) => (
              <div key={index} className="bg-white text-gray-800 rounded-2xl flex flex-col shadow-2xl transition-transform hover:scale-[1.01] border border-white/20 w-full overflow-hidden">
                <div className="bg-[#0091A4] text-center text-white py-4 px-6 font-bold tracking-widest uppercase text-sm md:text-base">
                  {pilar.id} · {pilar.title}
                </div>
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

      {/* BANNER EQUIPO (AZUL) */}
      <section className="py-8 px-6 md:px-12 relative z-10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="bg-[#0091A4] text-white rounded-[2rem] p-10 md:p-14 text-center shadow-2xl">
            <h3 className="!text-3xl md:text-4xl font-bold mb-6">El equipo detrás de cada decisión</h3>
            <p className="text-lg md:text-xl opacity-95 max-w-4xl mx-auto font-medium leading-relaxed">
              En Alaluf, cada operación es acompañada por profesionales con experiencia, criterio y conocimiento profundo del mercado.
            </p>
          </div>
        </div>
      </section>

      {/* DETALLE EQUIPO CON FONDO DE MÁRMOL (SIN BLOQUE BLANCO) */}
      <section className="py-20 px-6 md:px-12 relative z-10 text-white">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center text-lg md:text-xl leading-relaxed max-w-6xl mx-auto mb-20 text-gray-100 font-medium drop-shadow-sm">
            Alaluf es una empresa familiar especialista en intermediación inmobiliaria con más de 40 años de experiencia. Asesoramos a nuestros clientes en operaciones de Corretaje, Inversiones, Desarrollo de Proyectos, Tasaciones, Estudios, Procesos de Licitación y Administración de Activos.
          </p>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center w-[200px] transition-transform hover:scale-105 duration-300">
                <div className="relative mb-6">
                  {/* Círculo decorativo cian detrás de la foto */}
                  <div className="absolute -inset-2 bg-[#0091A4]/20 rounded-full blur-sm"></div>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="relative w-36 h-36 rounded-full object-cover border-2 border-[#0091A4]/30 shadow-xl"
                  />
                </div>
                <p className="text-xl font-bold mb-1 tracking-tight">{member.name}</p>
                <p className="text-xs text-[#0091A4] font-bold uppercase tracking-[0.2em]">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Nosotros;