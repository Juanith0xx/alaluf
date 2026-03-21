import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
            ESPACIOS INDUSTRIALES,
          </span>
          <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
            QUE IMPULSAN TU OPERACION
          </span>
        </div>
      </>
    ),
    descripcion: (
   <p className="font-[Outfit] text-lg text-white mt-4 max-w-xl whitespace-nowrap">
        Bodegas, centros logísticos y terrenos industriales. El área donde más operaciones hemos cerrado, con los clientes más exigentes <br></br>del mercado chileno.
      </p>
    ),
  },
  {
    image: Comercial,
    titulo: (
      <>
        <div className="text-lg font-[Outfit] mb-2">Comercial</div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
            ANALIZAMOS,
          </span>
          <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
            DÓNDE CRECER MEJOR
          </span>
          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
            TU NEGOCIO.
          </span>
        </div>
      </>
    ),
    descripcion: (
   <p className="font-[Outfit] text-lg text-white mt-4 max-w-xl whitespace-nowrap">
        Más que locales, oficinas y edificios corporativos, analizamos y recomendamos las mejores decisiones comerciales para empresas. 
      </p>
    ),
  },
  {
    image: Recidencial,
    titulo: (
      <>
        <div className="text-lg font-[Outfit] mb-2">Comercial</div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
            LOS QUE VIVEN MEJOR,
            <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
           ELIGIERON BIEN.
          </span>
          </span>

         <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
  VIVIR{" "} {/* <-- El espacio en React se puede forzar con {" "} */}
  <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
    BIEN EMPIEZA{" "}
  </span> 
  <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
    POR INVERTIR BIEN.
  </span>       
</span>
        </div>
      </>
    ),
    descripcion: (
   <p className="font-[Outfit] text-lg text-white mt-4 max-w-xl whitespace-nowrap">
        Con casas y departamentos en el sector oriente, te acompañamos desde que decides buscar, hasta las llaves en la mano, con el <br></br>
criterio de quien sabe negociar y conoce cada barrio desde hace 45 años. 
      </p>
    ),
  },
  {
    image: Inversion,
    titulo: (
      <>
        <div className="text-lg font-[Outfit] mb-2">Terreno</div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
            ESTUDIAMOS EL SUELO,
          </span>
          <span className="text-[#0091A4] font-bold text-3xl md:text-5xl lg:text-6xl whitespace-nowrap uppercase">
            Y VEMOS EL POTENCIAL QUE OTROS NO VEN.
          </span>
        </div>
      </>
    ),
    descripcion: (
   <p className="font-[Outfit] text-lg text-white mt-4 max-w-xl whitespace-nowrap">
        Terrenos para desarrollo, industrial y proyectos, 45 años de criterio inmobiliario detrás de cada recomendación. 
      </p>
    ),
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Imágenes */}
      <AnimatePresence>
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
        className="absolute z-20 top-1/5 left-50 max-w-lg text-white"
        key={current}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-2xl mb-4 font-[Outfit]">{slides[current].titulo}</h1>
        <p className="mb-6 font-light font-[Outfit] text-lg">
          {slides[current].descripcion}
        </p>
        <button className="px-6 py-2 border-[1px] border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300 font-[Outfit]">
          Ver Proyectos
        </button>
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
