import React from 'react';

// Importación de imágenes
import heroNosotros from '../assets/nosotros.png'; 
import fondoMarmol from '../assets/Marmol.jpg'; 
import preguntaIzquierdaImage from "../assets/hero6.jpg"; 

// Importación de fotos del equipo
import jackImage from '../assets/equipo/Jack_Alaluf2.png';
import alejandraImage from '../assets/equipo/Ale_Alaluf.png';
import leonorImage from '../assets/equipo/Leonor-Alvo.png';
import natalieImage from '../assets/equipo/Natalie-Alaluf2.png';
import danielImage from '../assets/equipo/sebastian_Casals.png';

const Nosotros = () => {
  // Array de pilares (mantenido igual)
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

  // 🌟 Se agregó la propiedad "email" a cada miembro del equipo
  const teamMembers = [
    { name: "Jack Alaluf", title: "Director Ejecutivo", image: jackImage, email: "jack@alaluf.com" },
    { name: "Leonor Alvo", title: "Gerente Industrial", image: leonorImage, email: "lalvo@alaluf.com" },
    { name: "Alejandra Alaluf", title: "Gerente General", image: alejandraImage, email: "alejandra@alaluf.com" },    
    { name: "Natalie Alaluf", title: "Coordinadora Comercial e Industrial", image: natalieImage, email: "natalie@alaluf.com" },
    { name: "Sebastian Casals", title: "Gerente Comercial", image: danielImage, email: "scasals@alaluf.com" },
  ];

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center font-outfit bg-fixed" 
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
      <section className="container mx-auto px-6 pt-16 pb-2 md:pt-12 md:pb-2 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:!text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md uppercase tracking-wider">
          ¿Por qué elegirnos?
        </h2>
        <p className="text-[#0091A4] text-2xl md:text-base lg:text-2xl font-bold">
          45 años de criterio, con la inteligencia de hoy.
        </p>
      </section>
    
      {/* DETALLE EQUIPO CON FONDO DE MÁRMOL */}
      <section className="pt-2 pb-6 px-6 md:px-12 relative z-10 text-white">
        <div className="container mx-auto max-w-7xl">
          
          <div className="text-center text-lg md:text-xl leading-relaxed max-w-6xl mx-auto mb-20 text-gray-100 font-medium drop-shadow-sm space-y-6">
            <p>
              Alaluf nació como una empresa familiar y sigue siéndolo. En todo este tiempo construimos lo que ningún actor nuevo puede comprar: el conocimiento profundo del mercado inmobiliario chileno, como asimismo, relaciones de años con personas y grandes grupos corporativos siempre con una visión de largo plazo y la responsabilidad de quien sabe que Hemos vivido abiertos al cambio y a la innovación.
            </p>
            <p>
              Hemos visto llegar y partir tendencias, aparecer nuevos actores y desaparecer otros. Nosotros seguimos aquí — porque conocemos el mercado en profundidad y hemos cerrado las operaciones más complejas de Chile con éxito. Detrás de cada operación hay personas que conocen su área con profundidad y entienden que su rol no es mostrarte propiedades — sino acompañarte a tomar la mejor decisión. Somos una familia que entiende lo que significa construir algo propio. Y eso, con la inteligencia de hoy, lo hacemos mejor que nunca.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-7xl mx-auto mb-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center w-[200px] transition-transform hover:scale-105 duration-300">
                
                {/* 🌟 CONTENEDOR DE IMAGEN CONVERTIDO A ENLACE (mailto) */}
                <a 
                  href={`mailto:${member.email}?subject=Contacto%20Sitio%20Web%20-%20Atención%20${member.name}`} 
                  className="relative mb-6 cursor-pointer group block"
                  title={`Enviar correo a ${member.name}`}
                >
                  {/* Se agregó group-hover para dar un pequeño brillo extra al pasar el cursor */}
                  <div className="absolute -inset-2 bg-[#0091A4]/20 rounded-full blur-sm transition-colors duration-300 group-hover:bg-[#0091A4]/40"></div>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="relative w-36 h-36 rounded-full object-cover border-2 border-[#0091A4]/30 shadow-xl"
                  />
                </a>

                <p className="text-xl font-bold mb-1 tracking-tight">{member.name}</p>
                <p className="text-xs text-[#0091A4] font-bold uppercase tracking-[0.2em]">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN CONTENEDORA PREGUNTAS */}
      <section className="container mx-auto px-6 pb-24 relative z-20 flex flex-col md:flex-row md:items-stretch gap-6 lg:block lg:min-h-[460px]">
        
        <div className="w-full h-64 md:h-auto md:w-1/2 lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[calc(100%-660px)] xl:w-[calc(100%-700px)] z-10 rounded-sm overflow-hidden shadow-xl">
          <img 
            src={preguntaIzquierdaImage} 
            alt="Asesoría Inmobiliaria Alaluf" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Limpié el font-[Outfit] suelto que tenías en este div para que herede correctamente el font-outfit de arriba */}
        <div className="bg-[#e9e9e9] p-8 md:p-10 lg:p-12 rounded-sm shadow-xl w-full md:w-1/2 lg:absolute lg:right-12 xl:right-32 lg:top-8 lg:w-[600px] xl:w-[630px] z-10">
          <h2 className="text-2xl md:text-[30px] lg:text-[36px] font-medium mb-4 text-gray-800 whitespace-nowrap">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-sm md:text-base lg:text-xl text-gray-600 leading-relaxed font-light mb-6">
            <span className="font-bold text-black">Lo primero es entenderte a ti:</span> tus objetivos, tu <br className="hidden lg:block"></br>situación y 
            asesorarte en el camino más inteligente para<br className="hidden lg:block"></br> 
            llegar donde quieres.
          </p>
          
          <a 
            href="mailto:contacto@alaluf.com?subject=Consulta%20desde%20Sitio%20Web%20-%20Nosotros" 
            className="text-[#24B6C1] inline-flex font-light text-lg lg:text-xl items-center gap-2 hover:gap-3 transition-all"
          >
            INICIAR LA CONVERSACIÓN
            <span className="text-xl">→</span>
          </a>
        </div>

      </section>

    </main>
  );
};

export default Nosotros;