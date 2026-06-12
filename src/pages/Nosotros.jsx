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
    { name: "Jack Alaluf", title: "Director Ejecutivo", image: jackImage, email: "jack@alaluf.com" },
    { name: "Leonor Alvo", title: "Gerente Industrial", image: leonorImage, email: "lalvo@alaluf.com" },
    { name: "Alejandra Alaluf", title: "Gerente General", image: alejandraImage, email: "alejandra@alaluf.com" },    
    { name: "Natalie Alaluf", title: "Coordinadora Comercial e Industrial", image: natalieImage, email: "natalie@alaluf.com" },
    { name: "Sebastian Casals", title: "Gerente Comercial", image: danielImage, email: "scasals@alaluf.com" },
  ];

  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center font-[Outfit] bg-fixed pt-28 sm:pt-32 md:pt-40" 
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      
      {/* SECCIÓN HERO */}
      <section className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden border-b border-white/10">
        <img 
          src={heroNosotros} 
          alt="Equipo Alaluf" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        <div 
          className="absolute z-20 w-[90%] sm:w-auto" 
          style={{ left: '8%', bottom: '35%' }}
        >
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase drop-shadow-lg leading-none">
            NOSOTROS
          </h1>
        </div>
      </section>

      {/* SECCIÓN INTRODUCCIÓN */}
      <section className="container mx-auto px-4 sm:px-6 py-10 md:py-16 max-w-7xl text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-md uppercase tracking-wider">
          ¿Por qué elegirnos?
        </h2>
        <p className="text-[#0091A4] text-base sm:text-lg md:text-xl lg:text-2xl font-bold px-2">
          45 años de criterio, con la inteligencia de hoy.
        </p>
      </section>
    
      {/* DETALLE EQUIPO CON FONDO DE MÁRMOL */}
      <section className="pt-2 pb-10 px-4 sm:px-6 md:px-12 relative z-10 text-white">
        <div className="container mx-auto max-w-7xl">
          
          <div className="text-center text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20 text-gray-100 font-medium drop-shadow-sm space-y-5 px-2 text-justify sm:text-center">
            <p>
              Alaluf nació como una empresa familiar y sigue siéndolo. En todo este tiempo construimos lo que ningún actor nuevo puede comprar: el conocimiento profundo del mercado inmobiliario chileno, como asimismo, relaciones de años con personas y grandes grupos corporativos siempre con una visión de largo plazo y la responsabilidad de quien sabe que Hemos vivido abiertos al cambio y a la innovación.
            </p>
            <p>
              Hemos visto llegar y partir tendencias, aparecer nuevos actores y desaparecer otros. Nosotros seguimos aquí — porque conocemos el mercado en profundidad y hemos cerrado las operaciones más complejas de Chile con éxito. Detrás de cada operación hay personas que conocen su área con profundidad y entienden que su rol no es mostrarte propiedades — sino acompañarte a tomar la mejor decisión. Somos una familia que entiende lo que significa construir algo propio. Y eso, con la inteligencia de hoy, lo hacemos mejor que nunca.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-7xl mx-auto mb-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center w-[160px] sm:w-[200px] transition-transform hover:scale-105 duration-300 mb-4"
              >
                
                {/* CONTENEDOR DE IMAGEN CONVERTIDO A ENLACE (mailto) */}
                <a 
                  href={`mailto:${member.email}?subject=Contacto%20Sitio%20Web%20-%20Atención%20${member.name}`} 
                  className="relative mb-4 sm:mb-6 cursor-pointer group block"
                  title={`Enviar correo a ${member.name}`}
                >
                  <div className="absolute -inset-2 bg-[#0091A4]/20 rounded-full blur-sm transition-colors duration-300 group-hover:bg-[#0091A4]/40"></div>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-[#0091A4]/30 shadow-xl"
                  />
                </a>

                <p className="text-base sm:text-lg md:text-xl font-bold mb-1 tracking-tight">
                  {member.name}
                </p>
                <p className="text-[10px] sm:text-xs text-[#0091A4] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN CONTENEDORA PREGUNTAS */}
      <section className="container mx-auto px-4 sm:px-6 pb-16 md:pb-24 relative z-20 flex flex-col lg:block lg:min-h-[460px] gap-6">
        
        <div className="w-full h-64 sm:h-80 md:h-[350px] lg:h-auto lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[calc(100%-520px)] xl:w-[calc(100%-600px)] z-10 rounded-2xl overflow-hidden shadow-xl">
          <img 
            src={preguntaIzquierdaImage} 
            alt="Asesoría Inmobiliaria Alaluf" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-[#e9e9e9] p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-xl w-full lg:absolute lg:right-4 xl:right-16 lg:top-8 lg:w-[480px] xl:w-[550px] z-20 mt-2 lg:mt-0 text-center lg:text-start">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-medium mb-4 text-gray-800 tracking-tight">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed font-light mb-6">
            <span className="font-bold text-black block sm:inline">Lo primero es entenderte a ti:</span> tus objetivos, tu situación y asesorarte en el camino más inteligente para llegar donde quieres.
          </p>
          
          <a 
            href="mailto:contacto@alaluf.com?subject=Consulta%20desde%20Sitio%20Web%20-%20Nosotros" 
            className="text-[#24B6C1] inline-flex font-light text-base sm:text-lg lg:text-xl items-center gap-2 hover:gap-3 transition-all uppercase tracking-wider"
          >
            Iniciar la conversación
            <span className="text-xl">→</span>
          </a>
        </div>

      </section>

    </main>
  );
};

export default Nosotros;