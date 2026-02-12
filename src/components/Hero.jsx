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
      <div className="text-lg font-[Outfit]">Industrial</div>
        <span className="text-[#0091A4] font-bold">ESPACIOS</span> <br></br>
        <span className="text-white font-bold">INDUSTRIALES</span> <br></br> 
        QUE IMPULSAN TU <br>
        </br><span className="text-[#0091A4] font-bold"> OPERACION</span>
      </>
    ),
    descripcion:(
       <p className="font-[Outfit] text-lg text-white">
    Más de 40 años conectando empresas con bodegas, <br />
    ventros logísticos y terrenos estratégicos en Chile.
  </p>
    ),
  },
  {
    image: Comercial,
    titulo: (
      <>
      <div className="text-lg font-[Outfit]">Comercial</div>
        <span className="text-[#0091A4] font-bold">UBICACIONES</span> <span className="text-white font-bold">COMERCIALES</span>
        <br></br> QUE POTENCIAN TU <span className="text-[#0091A4] font-bold">NEGOCIO</span>
      </>
    ),  
    descripcion: (
       <p className="font-[Outfit] text-lg text-white">
    Asesoramos decisiones en oficinas, locales y <br />
    activos comerciales de alto impacto.
  </p>
    ),
  },
  {
    image: Recidencial,
    titulo: (
      <>
      <div className="text-lg font-[Outfit]">Residencial</div>
      <span className="text-[#0091A4] font-bold">ENCUENTRA</span> <br></br> <span className="text-white font-bold">EL LUGAR</span><br></br>
      DONDE QUIERES <span className="text-[#0091A4] font-bold">VIVIR</span>
      </>
    ),
    descripcion: (
       <p className="font-[Outfit] text-lg text-white">
    Experiencia y acompañamiento en la compra <br />
    y arriendo de casas y departamento.
  </p>
    ),
  },
  {
    image: Inversion,
    titulo: (
      <>
      <div className="text-lg font-[Outfit]">Terrenos</div>
      <span className="text-[#0091A4] font-bold ">INVERTIR</span> CON <br>
      </br>SEGURIDAD <br>
      </br>EMPIEZA CON UNA <br></br>
      BUENA <span className="text-[#0091A4] font-bold">ASESORÍA</span>
      </>
    ),
    descripcion: (
       <p className="font-[Outfit] text-lg text-white">
    Identificamos oportunidades de renta y  <br />
    desarrollo con análisis y respaldo profesional.
  </p>
    ),
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Cambio automático cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // Variantes para animación de texto
  const textVariants = {
    hidden: { x: -50, opacity: 0 },   // empieza desde la izquierda
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

      {/* Overlay de color oscuro para texto */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

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
        <p className="mb-6 font-light font-[Outfit] text-lg">{slides[current].descripcion}</p>
        <button className="px-6 py-2 border-[1px] border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300 font-[Outfit]">
          Ver Proyectos
        </button>
      </motion.div>

      {/* Indicadores laterales */}
      <div className="absolute left-38 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === current ? "bg-cyan-400" : "bg-white/50"}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
