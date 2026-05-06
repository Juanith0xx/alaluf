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
           <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
            TU OPERACIÓN 
          </span>
          <span className="text-white text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
           CRECE CUANDO
          </span>
          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
           ENCUENTRA
          </span>
          <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
            EL LUGAR CORRECTO
          </span>
        </div>
      </>
    ),
    descripcion: (
      <div className="font-[Outfit]">
      <p className="font-[Outfit] text-lg text-white mt-4 max-w-xl whitespace-nowrap">
        Bodegas, centros logísticos y terrenos industriales en todo Chile. 45 años eligiendo el mejor lugar para las operaciones más <br></br>
        exigentes. Analizamos tu operación, tus volúmenes y tu proyección para recomendarte el espacio que reduce costos, mejora <br></br>
        tiempos y hace crecer tu negocio.
      </p>
      <div className="flex flex-row items-center gap-x-8 mt-8"></div>
      <a 
          href="/tu-ruta-de-busqueda" 
          className="text-[#0091A4] font-bold text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-nowrap"
        >
          QUIERO ENCONTRAR
        </a>
      </div>  
    ),
    
  },
  {
    image: Comercial,
    titulo: (
      <>
        <div className="text-lg font-[Outfit] mb-2">Comercial</div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
            TU NEGOCIO <span className="text-white text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
            RINDE MÁS</span></span> 

          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
            CUANDO LA UBICACIÓN 
          </span>
          <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
            TRABAJA PARA TI.
          </span>
        </div>
      </>
    ),
    descripcion: (
      <div className="font-[Outfit]">
   <p className="font-[Outfit] text-lg text-white mt-4 max-w-xl whitespace-nowrap">
        Ofrecemos oficinas, locales comerciales, retail y strip centers, cada uno con potencial para ser una ventaja competitiva. Analizamos <br></br>
        tu negocio y cliente para que cada metro cuadrado contribuya a tu rentabilidad. 
      </p>
      <div className="flex flex-row items-center gap-x-8 mt-8">
          <a 
            href="/ruta-local" 
            className="text-[#0091A4] font-bold text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-nowrap"
          >
            Quiero encontrar mi local 
          </a>

          <a 
            href="/ruta-oficina" 
            className="text-[#0091A4] font-bold text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-nowrap"
          >
            Quiero encontrar mi oficina
          </a>
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
          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
           EL LUGAR QUE ELIGES
           </span>
            <span className="text-white text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
           DEFINE LO QUE QUIERES
           </span>
            <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
           VIVIR.
            </span>
        </div>
      </>
    ),
    descripcion: (
      <div className="font-[Outfit]">
   <p className="font-[Outfit] text-lg text-white mt-4 max-w-xl whitespace-nowrap">
        Casas y departamentos en el sector oriente de Santiago para comprar, arrendar o vender. Te acompañamos en todo el proceso,<br></br> 
        con el criterio de quien conoce cada barrio desde hace 45 años y la inteligencia para que tomes siempre la mejor decisión.
      </p>
      <div className="flex flex-row items-center gap-x-8 mt-8">
          <a 
            href="/ruta-local" 
            className="text-[#0091A4] font-bold text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-nowrap"
          >
            QUIERO COMPRAR   
          </a>

          <a 
            href="/ruta-oficina" 
            className="text-[#0091A4] font-bold text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-nowrap"
          >
            QUIERO ARRENDAR  
          </a>
           <a 
            href="/ruta-oficina" 
            className="text-[#0091A4] font-bold text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-nowrap"
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
          <span className="text-[#0091A4]  font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
            ESTUDIAMOS <span className="text-white text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
            EL SUELO,</span>
            </span>
          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
            Y VEMOS EL <span className="text-[#0091A4] text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
           POTENCIAL,</span>
          </span>
          <span className="text-white text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
            QUE OTROS NO VEN.
          </span>
        </div>
      </>
    ),
    descripcion: (
      <div className="font-[Outfit]">
   <p className="font-[Outfit] text-lg text-white mt-4 max-w-xl whitespace-nowrap">
        Terrenos para desarrollo residencial, industrial y proyectos de inversión en todo Chile. Analizamos normativa, plusvalía y viabilidad real <br></br> 
        — porque el potencial no está en la superficie. Está en estudiarlo. 
      </p>
      <div className="flex flex-row items-center gap-x-8 mt-8"></div>
      <a 
          href="/tu-ruta-de-busqueda" 
          className="text-[#0091A4] font-bold text-base uppercase tracking-wider hover:text-[#24B6C1] transition-all whitespace-nowrap"
        >
          QUIERO EVALUAR UN TERRENO
        </a>
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
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* SearchBar integrada en la parte superior */}
      <div className="absolute top-10 left-0 w-full z-40">
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
          className="absolute w-full h-full object-cover"
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

      {/* Texto sobre hero con animación */}
      <motion.div
        className="absolute z-20 top-1/3 left-50 max-w-lg text-white"
        key={current}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-2xl mb-4 font-[Outfit]">{slides[current].titulo}</h1>
        <div className="mb-6 font-light font-[Outfit] text-lg">
          {slides[current].descripcion}
        </div>
      </motion.div>

      {/* Indicadores laterales */}
      <div className="absolute left-38 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3">
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
    </div>
  );
};

export default Hero;