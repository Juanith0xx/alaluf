import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar"; // Importación del componente
import Industrial from "../assets/Industrial.jpg";
import Comercial from "../assets/Comercial.jpg";
import Recidencial from "../assets/Residencial.jpg";
import Inversion from "../assets/Inversion.jpg";

const slides = [
  {
    image: Industrial,
    titulo: (
      <>
        <div className="text-lg font-[Outfit] mb-2">Industrial</div>
        <div className="flex flex-col gap-1">
           <span className="text-[#0091A4] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08] uppercase">
            TU OPERACIÓN 
          </span>
          <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08]">
           CRECE CUANDO
          </span>
          <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08]">
           ENCUENTRA
          </span>
          <span className="text-[#0091A4] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08] uppercase">
            EL LUGAR CORRECTO
          </span>
        </div>
      </>
    ),
    descripcion: (
      <div className="font-[Outfit]">
      <p className="font-[Outfit] mt-4 max-w-xl whitespace-normal text-sm leading-relaxed text-white sm:text-base lg:text-lg xl:whitespace-nowrap">
        Bodegas, centros logísticos y terrenos industriales en todo Chile. 45 años eligiendo el mejor lugar para las operaciones más <br className="hidden xl:block"></br>
        exigentes. Analizamos tu operación, tus volúmenes y tu proyección para recomendarte el espacio que reduce costos, mejora <br className="hidden xl:block"></br>
        tiempos y hace crecer tu negocio.
      </p>
      <div className="mt-5 flex flex-col items-start gap-x-6 gap-y-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center xl:mt-8 xl:flex-nowrap xl:gap-x-8">
        <Link
        to="/buscar?tipo_prop=7&obj=1"
        className="text-[#0091A4] font-bold text-sm sm:text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-normal xl:whitespace-nowrap cursor-pointer"
        >
        QUIERO ENCONTRAR
      </Link>
      </div>
      </div>  
    ),
  },
  {
    image: Comercial,
    titulo: (
      <>
        <div className="text-lg font-[Outfit] mb-2">Comercial</div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08]">
            TU NEGOCIO <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08]">
            RINDE MÁS</span></span> 

          <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08] uppercase">
            CUANDO LA UBICACIÓN 
          </span>
          <span className="text-[#0091A4] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08] uppercase">
            TRABAJA PARA TI.
          </span>
        </div>
      </>
    ),
    descripcion: (
      <div className="font-[Outfit]">
      <p className="font-[Outfit] mt-4 max-w-xl whitespace-normal text-sm leading-relaxed text-white sm:text-base lg:text-lg xl:whitespace-nowrap">
        Ofrecemos oficinas, locales comerciales, retail y strip centers, cada uno con potencial para ser una ventaja competitiva. Analizamos <br className="hidden xl:block"></br>
        tu negocio y cliente para que cada metro cuadrado contribuya a tu rentabilidad. 
      </p>
      <div className="mt-5 flex flex-col items-start gap-x-6 gap-y-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center xl:mt-8 xl:flex-nowrap xl:gap-x-8">
          <Link
            to="/buscar?tipo_prop=4A&obj=1"
            className="text-[#0091A4] font-bold text-sm sm:text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-normal xl:whitespace-nowrap"
          >
            Quiero encontrar mi local 
          </Link>

          <Link
            to="/buscar?tipo_prop=3A&obj=1" 
            className="text-[#0091A4] font-bold text-sm sm:text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-normal xl:whitespace-nowrap"
          >
            Quiero encontrar mi oficina
          </Link>
        </div>
      </div>
    ),
  },
  {
    image: Recidencial,
    titulo: (
      <>
        <div className="text-lg font-[Outfit] mb-2">Residencial</div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08]">
           EL LUGAR QUE ELIGES
           </span>
            <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08]">
           DEFINE LO QUE QUIERES
           </span>
            <span className="text-[#0091A4] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08] uppercase">
           VIVIR.
            </span>
        </div>
      </>
    ),
    descripcion: (
      <div className="font-[Outfit]">
      <p className="font-[Outfit] mt-4 max-w-xl whitespace-normal text-sm leading-relaxed text-white sm:text-base lg:text-lg xl:whitespace-nowrap">
        Casas y departamentos en el sector oriente de Santiago para comprar, arrendar o vender. Te acompañamos en todo el proceso,<br className="hidden xl:block"></br> 
        con el criterio de quien conoce cada barrio desde hace 45 años y la inteligencia para que tomes siempre la mejor decisión.
      </p>
      <div className="mt-5 flex flex-col items-start gap-x-6 gap-y-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center xl:mt-8 xl:flex-nowrap xl:gap-x-8">
          <Link
            to="/buscar?tipo_prop=1A&obj=1" 
            className="text-[#0091A4] font-bold text-sm sm:text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-normal xl:whitespace-nowrap"
          >
            QUIERO COMPRAR   
          </Link>

          <Link
            to="/buscar?tipo_prop=1A&obj=2" 
            className="text-[#0091A4] font-bold text-sm sm:text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-normal xl:whitespace-nowrap"
          >
            QUIERO ARRENDAR  
          </Link>
          
           <a
            href="/vender" 
            className="text-[#0091A4] font-bold text-sm sm:text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-normal xl:whitespace-nowrap"
          >
             QUIERO VENDER
          </a>
        </div>
      </div>
    ),
  },
  {
    image: Inversion,
    titulo: (
      <>
        <div className="text-lg font-[Outfit] mb-2">Terreno</div>
        <div className="flex flex-col gap-1">
          <span className="text-[#0091A4] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08]">
            ESTUDIAMOS <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08]">
            EL SUELO,</span>
            </span>
          <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08] uppercase">
            Y VEMOS EL <span className="text-[#0091A4] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08]">
           POTENCIAL,</span>
          </span>
          <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-normal xl:whitespace-nowrap leading-[1.08] uppercase">
            QUE OTROS NO VEN.
          </span>
        </div>
      </>
    ),
    descripcion: (
      <div className="font-[Outfit]">
      <p className="font-[Outfit] mt-4 max-w-xl whitespace-normal text-sm leading-relaxed text-white sm:text-base lg:text-lg xl:whitespace-nowrap">
        Terrenos para desarrollo residencial, industrial y proyectos de inversión en todo Chile. Analizamos normativa, plusvalía y viabilidad real <br className="hidden xl:block"></br> 
        — porque el potencial no está en la superficie. Está en estudiarlo. 
      </p>
      <div className="mt-5 flex flex-col items-start gap-x-6 gap-y-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center xl:mt-8 xl:flex-nowrap xl:gap-x-8">
        <Link
          to="/buscar?tipo_prop=6A&obj=2" 
          className="text-[#0091A4] font-bold text-sm sm:text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-normal xl:whitespace-nowrap"
        >
          QUIERO EVALUAR UN TERRENO
        </Link>
      </div>
      </div>
    ),
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-[100svh] w-full overflow-x-hidden bg-black xl:h-screen xl:min-h-0 xl:overflow-hidden">
      
      {/* SearchBar integrada en la parte superior (baja en móviles) */}
      <div className="relative left-0 z-40 w-full pt-20 sm:pt-24 md:pt-16 lg:pt-14 xl:absolute xl:top-10 xl:pt-0">
        <SearchBar />
      </div>

      {/* Imágenes */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={slides[current].image}
          alt="Hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Overlay con gradiente de Figma */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(0deg, rgba(0,0,0,0.36), rgba(0,0,0,0.36)),
            linear-gradient(250.6deg, rgba(0,0,0,0) 40.02%, rgba(0,0,0,0.6) 56.94%)
          `,
        }}
      ></div>
      <div className="absolute inset-0 z-10 bg-black/20 xl:hidden"></div>

      {/* Texto en flujo para móvil/tablet y posición original en escritorio */}
      <motion.div
        className="relative z-20 mx-5 mt-8 max-w-[calc(100%_-_2.5rem)] pb-16 text-white sm:mx-8 sm:mt-10 sm:max-w-2xl md:mx-10 md:max-w-3xl lg:mx-16 lg:max-w-4xl xl:absolute xl:left-50 xl:top-1/3 xl:m-0 xl:max-w-lg xl:pb-0"
        key={current}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="mb-3 font-[Outfit] sm:mb-4">{slides[current].titulo}</h1>
        <div className="mb-6 font-[Outfit] text-base font-light sm:text-lg">
          {slides[current].descripcion}
        </div>
      </motion.div>

      {/* Indicadores laterales (Intactos para Desktop) */}
      <div className="absolute left-38 top-1/2 z-20 hidden -translate-y-1/2 transform flex-col gap-3 xl:flex">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-cyan-400" : "bg-white/50"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {/* Indicadores inferiores (Exclusivo para Móvil) */}
      <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 transform flex-row gap-3 rounded-full bg-black/20 p-2 backdrop-blur-sm xl:hidden">
           {/* {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === current ? "bg-cyan-400" : "bg-white/50"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))} */}
      </div>
    </div>
  );
};

export default Hero;